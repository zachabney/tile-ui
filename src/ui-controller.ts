import UIImage from './image/ui-image'
import Screen from './screen'
import { ScreenRenderer } from './screen-renderer'
import Tile from './tile'
import ImageSize from './image/image-size'
import ImageLoader from './image/image-loader'
import { ButtonComponent } from '.'

export default abstract class UIController<ImageType extends UIImage>
  implements ScreenRenderer<ImageType> {
  readonly imageLoader: ImageLoader<ImageType>

  constructor(imageLoader: ImageLoader<ImageType>) {
    this.imageLoader = imageLoader
  }

  currentScreen: Screen<ImageType> | null = null

  abstract renderImage(index: number, image: ImageType): void
  abstract clearImage(index: number): void

  abstract getControllerSize(): number
  abstract getTileImageSize(index: number): ImageSize

  async emitButtonPress(index: number) {
    const tile = this.getTile(index)
    if (tile && tile.component instanceof ButtonComponent) {
      tile.component.onPress()
    }
  }

  async emitButtonRelease(index: number) {
    const tile = this.getTile(index)
    if (tile && tile.component instanceof ButtonComponent) {
      tile.component.onRelease()
    }
  }

  async renderTile(tile: Tile<ImageType>) {
    const size = this.getTileImageSize(tile.index)
    const image = await tile.component.render(size)
    this.renderImage(tile.index, image)
  }

  async mountTile(tile: Tile<ImageType>) {
    await this.renderTile(tile)

    tile.component.registerStateChangeListener(newState => {
      this.renderTile(tile)
    })

    tile.component.onLoad()
  }

  unmountTile(tile: Tile<ImageType>, clearImage = true) {
    if (clearImage) {
      this.clearImage(tile.index)
    }

    tile.component.onDestroy()
  }

  getTile(index: number): Tile<ImageType> | undefined {
    if (!this.currentScreen) {
      return undefined
    }

    const tile = this.currentScreen.getTiles().find(tile => tile.index === index)

    return tile
  }

  async setScreen(screen: Screen<ImageType>) {
    await screen.preload(this)

    const newTiles = screen.getTiles()
    const oldTiles = this.currentScreen ? this.currentScreen.getTiles() : []

    const controllerSize = this.getControllerSize()
    for (let tileIndex = 0; tileIndex < controllerSize; tileIndex++) {
      const newTile = newTiles.find(tile => tile.index === tileIndex)
      const oldTile = oldTiles.find(tile => tile.index === tileIndex)

      if (newTile) {
        if (newTile === oldTile) {
          continue
        }

        if (oldTile) {
          this.unmountTile(oldTile, false)
        }

        await this.mountTile(newTile)
      } else if (oldTile) {
        this.unmountTile(oldTile)
      }
    }

    this.currentScreen = screen
  }
}

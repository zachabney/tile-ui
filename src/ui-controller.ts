import UIImage from './image/ui-image'
import UIScreen from './ui-screen'
import { ScreenRenderer } from './screen-renderer'
import Tile from './tile'
import ImageSize from './image/image-size'
import ButtonComponent from './components/button-component'
import ImageLoader from './image/image-loader'

export default abstract class UIController implements ScreenRenderer {
  imageLoader: ImageLoader
  currentScreen: UIScreen | null = null

  constructor(imageLoader: ImageLoader) {
    this.imageLoader = imageLoader
  }

  abstract renderImage(index: number, image: UIImage): void
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

  async renderTile(tile: Tile) {
    const size = this.getTileImageSize(tile.index)
    const image = await tile.component.render(size)
    this.renderImage(tile.index, image)
  }

  async mountTile(tile: Tile) {
    await this.renderTile(tile)

    tile.component.registerStateChangeListener(newState => {
      this.renderTile(tile)
    })

    tile.component.onLoad()
  }

  unmountTile(tile: Tile, clearImage = true) {
    if (clearImage) {
      this.clearImage(tile.index)
    }

    tile.component.onDestroy()
  }

  getTile(index: number): Tile | undefined {
    if (!this.currentScreen) {
      return undefined
    }

    const tile = this.currentScreen.getTiles().find(tile => tile.index === index)

    return tile
  }

  async setScreen(screen: UIScreen) {
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

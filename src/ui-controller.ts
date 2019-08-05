import UIImage from './image/ui-image'
import UIScreen from './ui-screen'
import Tile from './tile'
import ImageSize from './image/image-size'
import ImageLoader from './image/image-loader'

export default abstract class UIController {
  imageLoader: ImageLoader
  currentScreen: UIScreen | null = null

  constructor(imageLoader: ImageLoader) {
    this.imageLoader = imageLoader
  }

  protected emitButtonPress(index: number) {
    const tile = this.getTile(index)
    if (tile) {
      tile.component.onPress()
    }
  }

  protected emitButtonRelease(index: number) {
    const tile = this.getTile(index)
    if (tile) {
      tile.component.onRelease()
    }
  }

  protected abstract renderImage(index: number, image: UIImage): void
  protected abstract clearImage(index: number): void

  abstract getControllerSize(): number
  abstract getTileImageSize(index: number): ImageSize

  private renderTile(tile: Tile) {
    const image = tile.component.render()
    this.renderImage(tile.index, image)
  }

  private mountTile(tile: Tile) {
    this.renderTile(tile)

    tile.component.registerStateChangeListener(newState => {
      this.renderTile(tile)
    })

    tile.component.onLoad()
  }

  private unmountTile(tile: Tile, clearImage = true) {
    if (clearImage) {
      this.clearImage(tile.index)
    }

    tile.component.removeAllStateChangeListeners()
    tile.component.onDestroy()
  }

  private getTile(index: number): Tile | undefined {
    if (!this.currentScreen) {
      return undefined
    }

    const tile = this.currentScreen.getTiles().find(tile => tile.index === index)

    return tile
  }

  async setScreen(screen: UIScreen) {
    await screen.preload()

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

        this.mountTile(newTile)
      } else if (oldTile) {
        this.unmountTile(oldTile)
      }
    }

    this.currentScreen = screen
  }
}

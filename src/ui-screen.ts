import Tile from './tile'
import ImageLoader from './image/image-loader'
import UIController from './ui-controller'

export default abstract class UIScreen {
  readonly uiController: UIController
  get imageLoader(): ImageLoader {
    return this.uiController.imageLoader
  }

  constructor(uiController: UIController) {
    this.uiController = uiController
  }

  abstract getTiles(): Tile[]

  async preload() {
    // this has to be synchronously so caching works
    for (let tile of this.getTiles()) {
      const size = this.uiController.getTileImageSize(tile.index)
      await tile.component.preload(size)
    }
  }
}

import Tile from '../tile'
import ImageLoader from '../image/image-loader'
import UIController from '../ui-controller'

export default abstract class UIScreen {
  abstract readonly tiles: Tile[]

  readonly uiController: UIController
  get imageLoader(): ImageLoader {
    return this.uiController.imageLoader
  }

  constructor(uiController: UIController) {
    this.uiController = uiController
  }

  async preload() {
    // this has to be synchronously so caching works
    for (let tile of this.tiles) {
      const size = this.uiController.getTileImageSize(tile.index)
      await tile.component.preload(size)
    }
  }
}

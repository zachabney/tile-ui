import Tile from './tile'
import { ScreenRenderer } from './screen-renderer'
import ImageLoader from './image/image-loader'
import { UIController } from '.'

export default abstract class UIScreen {
  readonly uiController: UIController
  get imageLoader(): ImageLoader {
    return this.uiController.imageLoader
  }

  constructor(uiController: UIController) {
    this.uiController = uiController
  }

  abstract getTiles(): Tile[]

  async preload(renderer: ScreenRenderer): Promise<any> {
    const preloadPromises = this.getTiles().map(async tile => {
      const size = renderer.getTileImageSize(tile.index)
      return await tile.component.preload(size)
    })

    await Promise.all(preloadPromises)
  }
}

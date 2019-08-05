import Tile from './tile'
import { ScreenRenderer } from './screen-renderer'
import UIImage from './image/ui-image'
import UIController from './ui-controller'

export default abstract class Screen<ImageType extends UIImage> {
  readonly uiController: UIController<ImageType>

  constructor(uiController: UIController<ImageType>) {
    this.uiController = uiController
  }

  abstract getTiles(): Tile<ImageType>[]

  async preload(renderer: ScreenRenderer<ImageType>): Promise<any> {
    const preloadPromises = this.getTiles().map(async tile => {
      const size = renderer.getTileImageSize(tile.index)
      return await tile.component.preload(size)
    })

    await Promise.all(preloadPromises)
  }
}

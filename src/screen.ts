import Tile from './tile'
import { ScreenRenderer } from './screen-renderer'
import UIImage from './image/ui-image'

export default abstract class Screen<ImageType extends UIImage> {
  abstract getTiles(): Tile<ImageType>[]

  async preload(renderer: ScreenRenderer<ImageType>): Promise<any> {
    const preloadPromises = this.getTiles().map(async tile => {
      const size = renderer.getTileImageSize(tile.index)
      return await tile.button.preload(size)
    })

    await Promise.all(preloadPromises)
  }
}

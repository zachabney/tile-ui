import UIImage from './ui-image'
import ImageSize from './image-size'
import RGBColor from './rgb-color'

export default abstract class CachedImageLoader<ImageType extends UIImage> {
  private imageCache: { [key: string]: ImageType } = {}

  async get(path: string, size: ImageSize, background: RGBColor): Promise<ImageType> {
    const imageKey = CachedImageLoader.getImageKey(path, background)
    // use cache if its loaded
    if (imageKey in this.imageCache) {
      return this.imageCache[imageKey]
    }

    // load from external resource
    const image = await this.load(path, size, background)

    this.imageCache[imageKey] = image

    return image
  }

  protected abstract load(path: string, size: ImageSize, background: RGBColor): Promise<ImageType>

  private static getImageKey(path: string, background: RGBColor) {
    return `${path}:${background.r},${background.g},${background.b}`
  }
}

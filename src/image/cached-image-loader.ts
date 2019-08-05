import UIImage from './ui-image'
import ImageSize from './image-size'
import RGBColor from './rgb-color'
import ImageLoader from './image-loader'

const STATIC_COLOR = Symbol()

export default abstract class CachedImageLoader implements ImageLoader {
  private imageCache: { [key: string]: UIImage } = {}

  async get(path: string, size: ImageSize, background?: RGBColor): Promise<UIImage> {
    const imageKey = CachedImageLoader.getImageKey(path, size, background)
    // use cache if its loaded
    if (imageKey in this.imageCache) {
      return this.imageCache[imageKey]
    }

    // load from external resource
    const image = await this.load(path, size, background)
    this.imageCache[imageKey] = image
    return image
  }

  async solid(size: ImageSize, color: RGBColor): Promise<UIImage> {
    const imageKey = CachedImageLoader.getImageKey(STATIC_COLOR, size, color)
    // use cache if its loaded
    if (imageKey in this.imageCache) {
      return this.imageCache[imageKey]
    }

    // load from external resource
    const image = await this.createSolid(size, color)
    this.imageCache[imageKey] = image
    return image
  }

  protected abstract createSolid(size: ImageSize, color: RGBColor): Promise<UIImage>
  protected abstract load(path: string, size: ImageSize, background?: RGBColor): Promise<UIImage>

  private static getImageKey(symbol: string | symbol, size: ImageSize, background?: RGBColor) {
    const key = {
      symbol,
      size,
      background
    }

    return JSON.stringify(key)
  }
}

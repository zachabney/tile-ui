import ImageSize from './image-size'
import RGBColor from './rgb-color'
import UIImage from './ui-image'

export default interface ImageLoader<ImageType extends UIImage> {
  get(path: string, size: ImageSize, background: RGBColor): Promise<ImageType>
  solid(size: ImageSize, color: RGBColor): Promise<ImageType>
}

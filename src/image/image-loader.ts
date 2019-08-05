import ImageSize from './image-size'
import RGBColor from './rgb-color'
import UIImage from './ui-image'

export default interface ImageLoader {
  get(path: string, size: ImageSize, background?: RGBColor): Promise<UIImage>
  solid(size: ImageSize, color: RGBColor): Promise<UIImage>
}

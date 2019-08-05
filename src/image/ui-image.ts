import ImageSize from './image-size'
import RGBColor from './rgb-color'

export default interface UIImage {
  buffer: Buffer
  size: ImageSize
  backgroundColor?: RGBColor
}

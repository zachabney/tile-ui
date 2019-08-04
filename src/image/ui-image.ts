import ImageSize from './image-size'
import RGBColor from './rgb-color'

export default abstract class UIImage {
  readonly size: ImageSize
  readonly backgroundColor: RGBColor

  constructor(size: ImageSize, backgroundColor: RGBColor) {
    this.size = size
    this.backgroundColor = backgroundColor
  }
}

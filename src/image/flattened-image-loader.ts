import FSImageLoader from './fs-image-loader'
import RGBColor from './rgb-color'
import ImageSize from './image-size'

export default class FlattenedImageLoader extends FSImageLoader {
  private defaultBackgroundColor: RGBColor

  constructor(defaultBackgroundColor: RGBColor) {
    super()
    this.defaultBackgroundColor = defaultBackgroundColor
  }

  get(assetPath: string, size: ImageSize, background: RGBColor = this.defaultBackgroundColor) {
    return super.get(assetPath, size, background)
  }
}

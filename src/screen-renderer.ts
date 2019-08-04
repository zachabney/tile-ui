import UIImage from './image/ui-image'
import ImageSize from './image/image-size'

export interface ScreenRenderer<ImageType extends UIImage> {
  renderImage(index: number, image?: ImageType): void
  getTileImageSize(index: number): ImageSize
}

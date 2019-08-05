import UIImage from './image/ui-image'
import ImageSize from './image/image-size'

export interface ScreenRenderer {
  renderImage(index: number, image: UIImage): void
  getTileImageSize(index: number): ImageSize
}

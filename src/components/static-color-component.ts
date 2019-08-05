import UIImage from '../image/ui-image'
import Component from './component'
import ImageSize from '../image/image-size'
import RGBColor from '../image/rgb-color'
import UIController from '../ui-controller'

export default class StaticColorComponent<ImageType extends UIImage> extends Component<ImageType> {
  private readonly color: RGBColor
  private image!: ImageType

  constructor(uiController: UIController<ImageType>, color: RGBColor) {
    super(uiController)
    this.color = color
  }

  async preload(size: ImageSize) {
    this.image = await this.uiController.imageLoader.solid(size, this.color)
  }

  render(size: ImageSize): ImageType {
    return this.image
  }
}

import UIImage from '../image/ui-image'
import Component from './component'
import ImageSize from '../image/image-size'
import RGBColor from '../image/rgb-color'
import UIScreen from '../ui-screen'

export default class StaticColorComponent extends Component<UIImage> {
  private readonly color: RGBColor
  private image!: UIImage

  constructor(color: RGBColor, screen: UIScreen) {
    super(screen)
    this.color = color
  }

  async preload(size: ImageSize) {
    this.image = await this.imageLoader.solid(size, this.color)
  }

  render(size: ImageSize): UIImage {
    return this.image
  }
}

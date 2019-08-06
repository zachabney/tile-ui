import UIImage from '../image/ui-image'
import RGBColor from '../image/rgb-color'
import UIScreen from '../screens/ui-screen'
import ImageSize from '../image/image-size'
import Component from './component'

export default class StaticColorComponent extends Component {
  private readonly color: RGBColor
  private image!: UIImage

  constructor(color: RGBColor, screen: UIScreen) {
    super(screen)
    this.color = color
  }

  async preload(size: ImageSize) {
    this.image = await this.imageLoader.solid(size, this.color)
  }

  render(): UIImage {
    return this.image
  }
}

import UIImage from '../image/ui-image'
import RGBColor from '../image/rgb-color'
import UIScreen from '../screens/ui-screen'
import StaticImageComponent from './static-image-component'
import ImageSize from '../image/image-size'

export default class StaticColorComponent extends StaticImageComponent {
  private readonly color: RGBColor

  constructor(color: RGBColor, screen: UIScreen) {
    super(screen)
    this.color = color
  }

  async getImage(size: ImageSize): Promise<UIImage> {
    return await this.imageLoader.solid(size, this.color)
  }
}

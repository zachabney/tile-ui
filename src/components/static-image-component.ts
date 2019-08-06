import Component from './component'
import UIImage from '../image/ui-image'
import ImageSize from '../image/image-size'
import UIScreen from '../screens/ui-screen'
import RGBColor from '../image/rgb-color'

export default class StaticImageComponent<State = undefined> extends Component<State> {
  private image!: UIImage
  private imagePath: string
  private backgroundColor?: RGBColor

  constructor(screen: UIScreen, imagePath: string, backgroundColor?: RGBColor) {
    super(screen)
    this.imagePath = imagePath
    this.backgroundColor = backgroundColor
  }

  async preload(size: ImageSize) {
    this.image = await this.imageLoader.get(this.imagePath, size, this.backgroundColor)
  }

  render(): UIImage {
    return this.image
  }
}

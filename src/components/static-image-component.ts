import Component from './component'
import UIImage from '../image/ui-image'
import ImageSize from '../image/image-size'

export default abstract class StaticImageComponent<State = undefined> extends Component<State> {
  private image!: UIImage

  abstract getImage(size: ImageSize): Promise<UIImage>

  async preload(size: ImageSize) {
    this.image = await this.getImage(size)
  }

  render(): UIImage {
    return this.image
  }
}

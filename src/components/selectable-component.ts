import Component from './component'
import ImageSize from '../image/image-size'
import UIImage from '../image/ui-image'
import RGBColor from '../image/rgb-color'
import { UIScreen } from '..'

export default abstract class SelectableComponent<
  State extends { selected: boolean } = { selected: boolean }
> extends Component<State> {
  protected unselectedColor: RGBColor | undefined
  protected abstract selectedColor: RGBColor
  private unselectedImage!: UIImage
  private selectedImage!: UIImage

  constructor(screen: UIScreen, initialState: State) {
    super(screen, initialState)
  }

  protected abstract getImagePath(): string

  async preload(size: ImageSize) {
    const imagePath = this.getImagePath()

    this.unselectedImage = await this.imageLoader.get(imagePath, size, this.unselectedColor)
    this.selectedImage = await this.imageLoader.get(imagePath, size, this.selectedColor)
  }

  render() {
    if (this.state.selected) {
      return this.selectedImage
    }

    return this.unselectedImage
  }
}

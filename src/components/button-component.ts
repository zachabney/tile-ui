import Component from './component'
import UIImage from '../image/ui-image'

export default abstract class ButtonComponent<
  ImageType extends UIImage,
  StateType = {}
> extends Component<ImageType, StateType> {
  onPress() {}
  onRelease() {}
}

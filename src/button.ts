import Component from './component'
import UIImage from './image/ui-image'

export default abstract class Button<ImageType extends UIImage, StateType = {}> extends Component<
  ImageType,
  StateType
> {
  onPress() {}
  onRelease() {}
}

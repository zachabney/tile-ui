import Component from './component'

export default abstract class ButtonComponent<State = undefined> extends Component<State> {
  onPress() {}
  onRelease() {}
}

import UIImage from '../image/ui-image'
import ImageSize from '../image/image-size'
import UIScreen from '../screens/ui-screen'

export type StateChangeListener<State> = (newState: State) => any

export default abstract class Component<State = unknown> {
  readonly screen: UIScreen

  constructor(screen: UIScreen, initialState?: State) {
    this.screen = screen

    if (!initialState) {
      const unknown: unknown = undefined
      initialState = unknown as State
    }
    this._state = initialState
  }

  get imageLoader() {
    return this.screen.imageLoader
  }
  get uiController() {
    return this.screen.uiController
  }

  private stateChangeListeners: StateChangeListener<State>[] = []

  private _state: State
  protected get state() {
    return this._state
  }

  setState(getNewState: (prevState: State) => State) {
    const newState = getNewState(this.state)

    this._state = newState
    this.stateChangeListeners.forEach(listener => listener(newState))
  }

  registerStateChangeListener(listener: StateChangeListener<State>) {
    this.stateChangeListeners.push(listener)
  }

  removeAllStateChangeListeners() {
    this.stateChangeListeners = []
  }

  async preload(size: ImageSize): Promise<void> {}
  onLoad() {}
  onDestroy() {}
  abstract render(): UIImage

  onPress() {}
  onRelease() {}
}

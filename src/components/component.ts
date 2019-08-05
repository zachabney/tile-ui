import UIImage from '../image/ui-image'
import ImageSize from '../image/image-size'
import UIScreen from '../ui-screen'

export type StateChangeListener<State> = (newState: State) => any

export default abstract class Component<State = unknown> {
  readonly screen: UIScreen
  get imageLoader() {
    return this.screen.imageLoader
  }
  get uiController() {
    return this.screen.uiController
  }

  private stateChangeListeners: StateChangeListener<State>[] = []

  constructor(screen: UIScreen) {
    this.screen = screen
  }

  private _state: State = this.getInitialState()
  get state(): State {
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

  getInitialState(): State {
    const state: unknown = undefined
    return state as State
  }

  async preload(size: ImageSize): Promise<any> {}
  onLoad() {}
  onDestroy() {}
  abstract render(size: ImageSize): Promise<UIImage> | UIImage
}

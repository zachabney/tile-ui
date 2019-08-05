import UIImage from '../image/ui-image'
import ImageSize from '../image/image-size'
import UIController from '../ui-controller'

export type StateChangeListener<StateType> = (newState: StateType) => any

export default abstract class Component<ImageType extends UIImage, StateType = unknown> {
  readonly uiController: UIController<ImageType>

  constructor(uiController: UIController<ImageType>) {
    this.uiController = uiController
  }

  private stateChangeListeners: StateChangeListener<StateType>[] = []

  private _state: StateType = this.getInitialState()
  get state(): StateType {
    return this._state
  }

  setState(getNewState: (prevState: StateType) => StateType) {
    const newState = getNewState(this.state)

    this._state = newState
    this.stateChangeListeners.forEach(listener => listener(newState))
  }

  registerStateChangeListener(listener: StateChangeListener<StateType>) {
    this.stateChangeListeners.push(listener)
  }

  getInitialState(): StateType {
    const state: unknown = undefined
    return state as StateType
  }

  async preload(size: ImageSize): Promise<any> {}
  onLoad() {}
  onDestroy() {}
  abstract render(size: ImageSize): Promise<ImageType> | ImageType
}

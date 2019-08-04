import UIImage from './image/ui-image'
import ImageSize from './image/image-size'
import { EventEmitter } from 'events'

export type State<T> = T | undefined
export type StateChangeListener<StateType> = (newState: State<StateType>) => any

export default abstract class Component<ImageType extends UIImage, StateType = {}> {
  private stateChangeListeners: StateChangeListener<StateType>[] = []

  private _state: State<StateType> = this.getInitialState()
  get state(): State<StateType> {
    return this._state
  }

  getInitialState(): State<StateType> {
    return undefined
  }

  async preload(size: ImageSize): Promise<any> {}
  onLoad() {}
  onDestroy() {}
  abstract render(size: ImageSize): Promise<ImageType> | ImageType

  setState(newState: State<StateType>) {
    this._state = newState
    this.stateChangeListeners.forEach(listener => listener(newState))
  }

  registerStateChangeListener(listener: StateChangeListener<StateType>) {
    this.stateChangeListeners.push(listener)
  }
}

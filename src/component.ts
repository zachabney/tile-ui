import UIImage from './image/ui-image'
import ImageSize from './image/image-size'

export type State<T> = T | undefined

export default abstract class Component<ImageType extends UIImage, StateType = {}> {
  private _state: State<StateType> = this.getInitialState()
  get state(): State<StateType> {
    return this._state
  }

  getInitialState(): State<StateType> {
    return undefined
  }

  private _componentShouldUpdate = false
  get componentShouldUpdate() {
    return this._componentShouldUpdate
  }

  onComponentUpdate() {
    this._componentShouldUpdate = false
  }

  async preload(size: ImageSize): Promise<any> {}
  abstract render(size: ImageSize): Promise<ImageType> | ImageType

  setState(newState: State<StateType>) {
    this._state = newState
    this._componentShouldUpdate = true
  }
}

import ButtonComponent from './components/button-component'
import UIImage from './image/ui-image'
import Component from './components/component'

export default interface Tile<ImageType extends UIImage> {
  index: number
  component: Component<ImageType>
}

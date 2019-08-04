import Button from './button'
import UIImage from './image/ui-image'

export default interface Tile<ImageType extends UIImage> {
  index: number
  button: Button<ImageType>
}

import ImageSize from './image-size'

export default abstract class UIImage {
  readonly size: ImageSize

  constructor(size: ImageSize) {
    this.size = size
  }
}

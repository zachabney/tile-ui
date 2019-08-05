import { StreamDeck } from 'elgato-stream-deck'
import UIController from './ui-controller'
import UIImage from './image/ui-image'
import ImageSize from './image/image-size'
import ImageLoader from './image/image-loader'

export default class StreamDeckUIController extends UIController {
  private streamDeck: StreamDeck

  constructor(streamDeck: StreamDeck, imageLoader: ImageLoader) {
    super(imageLoader)

    this.streamDeck = streamDeck
    this.streamDeck.clearAllKeys()

    this.streamDeck.on('down', keyIndex => {
      this.emitButtonPress(keyIndex)
    })
    this.streamDeck.on('up', keyIndex => {
      this.emitButtonRelease(keyIndex)
    })
    this.streamDeck.on('error', error => {
      console.error(error)
    })
  }

  renderImage(index: number, image: UIImage) {
    this.streamDeck.fillImage(index, image.buffer)
  }

  clearImage(index: number) {
    this.streamDeck.clearKey(index)
  }

  getControllerSize() {
    return this.streamDeck.NUM_KEYS
  }

  getTileImageSize(index: number): ImageSize {
    return {
      width: this.streamDeck.ICON_SIZE,
      height: this.streamDeck.ICON_SIZE
    }
  }
}

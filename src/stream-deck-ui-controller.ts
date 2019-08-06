import { StreamDeck } from 'elgato-stream-deck'
import UIController from './ui-controller'
import ImageLoader from './image/image-loader'
import UIImage from './image/ui-image'
import ImageSize from './image/image-size'

const MAX_RENDER_RETRIES = 5

const withRetries = (method: () => void) => {
  for (let i = 0; i < MAX_RENDER_RETRIES; i++) {
    try {
      method()
      return
    } catch (e) {
      console.error('Retrying', e)
      continue
    }
  }
}

export default abstract class StreamDeckUIController extends UIController {
  protected streamDeck: StreamDeck

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
    withRetries(() => {
      this.streamDeck.fillImage(index, image.buffer)
    })
  }

  clearImage(index: number) {
    withRetries(() => {
      this.streamDeck.clearKey(index)
    })
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

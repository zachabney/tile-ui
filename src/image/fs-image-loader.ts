import sharp from 'sharp'
import path from 'path'
import CachedImageLoader from './cached-image-loader'
import RGBColor from './rgb-color'
import ImageSize from './image-size'
import UIImage from './ui-image'

export default class FSImageLoader extends CachedImageLoader {
  get(assetPath: string, size: ImageSize, background?: RGBColor) {
    return super.get(assetPath, size, background)
  }

  protected async createSolid(size: ImageSize, color: RGBColor): Promise<UIImage> {
    const buffer = await sharp({
      create: {
        width: size.width,
        height: size.height,
        channels: 3,
        background: color
      }
    })
      .raw()
      .toBuffer()

    const image: UIImage = {
      buffer,
      size,
      backgroundColor: color
    }

    return image
  }

  protected async load(
    assetPath: string,
    size: ImageSize,
    background?: RGBColor
  ): Promise<UIImage> {
    const buffer = await sharp(path.resolve(assetPath))
      .flatten({ background }) // remove alpha channel, filling with background color
      .resize(size.width, size.height) // scale up/down to correct size, cropping if needed
      .raw()
      .toBuffer()

    const image: UIImage = {
      buffer,
      size,
      backgroundColor: background
    }

    return image
  }
}

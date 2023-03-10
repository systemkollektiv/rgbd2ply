import path from 'node:path'

import log from '@magic/log'

import { getImage } from './getImage.js'
import { getDepthFromHue } from './getDepthFromHue.js'
import { getDepthFromGreyscale } from './getDepthFromGreyscale.js'

export const getImagePixels = async (options = {}) => {
  log.info('start reading image pixels')

  const image = await getImage(options)

  let currentWidth = 0
  let currentHeight = 0

  const { channels = 3 } = image

  const depthFn = options.bw ? getDepthFromGreyscale : getDepthFromHue

  for (let i = 0; i < image.data.length; i += channels) {
    currentWidth += 1
    if (currentWidth >= image.width) {
      currentWidth = 0
      currentHeight += 1
    }

    const r = image.data[i]
    const g = image.data[i + 1]
    const b = image.data[i + 2]

    const color = { r, g, b }
    if (channels === 4) {
      color.a = image.data[i + 3]
    }

    if (currentWidth >= image.width / 2) {
      image.colors.push(color)
    } else {
      const x = ((image.width - currentWidth) * options.pointOffsetXCm) / 10
      const y = ((image.height - currentHeight) * options.pointOffsetYCm) / 10
      const z = depthFn({ r, g, b }) * options.zMultiplier
      image.positions.push({ x, y, z })
    }
  }

  log.success('reading image pixels done, found', image.positions.length, 'pixels')

  return image
}

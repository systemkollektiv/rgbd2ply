import sharp from 'sharp'

import path from 'node:path'

import log from '@magic/log'

export const getImage = async (options = {}) => {
  log.info('reading image')

  const cwd = process.cwd()

  let { input } = options
  if (!input.startsWith(cwd) && path.isAbsolute(input)) {
    input = path.join(cwd, input)
  }

  const { data, info } = await sharp(input).raw().toBuffer({ resolveWithObject: true })

  const pixels = new Uint8ClampedArray(data.buffer)
  const { channels, height, width } = info

  log.success('reading image done')

  return {
    channels,
    data: pixels,
    height,
    width,
    colors: [],
    positions: [],
  }
}

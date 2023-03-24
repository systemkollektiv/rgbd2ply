import log from '@magic/log'

import { writePly, getImagePixels } from './lib/index.js'

export const rgbd2ply = async (args = {}) => {
  log.info('starting')

  const {
    input,
    output = 'ply.ply',
    pointOffsetXCm = 1,
    pointOffsetYCm = 1,
    zMultiplier = 1,
    bw = false,
  } = args

  const options = { input, output, pointOffsetXCm, pointOffsetYCm, zMultiplier, bw }

  const image = await getImagePixels(options)

  await writePly(image, options)

  log.success('finished')
}

export default rgbd2ply
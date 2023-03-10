import path from 'node:path'

import log from '@magic/log'
import fs from '@magic/fs'

export const writePly = async (image, options = {}) => {
  log.info('start writing ply file')

  const cwd = process.cwd()
  const output = options.output.startsWith(cwd)
    ? options.output
    : path.join(process.cwd(), options.output)

  const header = `
ply
format ascii 1.0
comment VCGLIB generated
element vertex ${image.colors.length}
property float x
property float y
property float z
property uchar red
property uchar green
property uchar blue
element face 0
property list uchar int vertex_indices
end_header\n`.trimStart()

  await fs.writeFile(output, header)

  let lines = []

  const len = image.positions.length

  const logEveryXLines = parseInt(len / 10)

  for (let i = 0; i < len; i++) {
    const { x, y, z } = image.positions[i]
    const { r, g, b } = image.colors[i]

    const line = `${x} ${y} ${z} ${r} ${g} ${b}\n`

    lines.push(line)

    if (lines.length > 1000 || i === len - 1) {
      await fs.appendFile(output, lines.join(''))
      lines = []
    }

    if (i % logEveryXLines === 0) {
      log.info('writing line', i, 'of', len)
    }
    if (i === len - 1) {
      log.info('writing line', i + 1, 'of', len)
    }
  }

  log.success('ply file successfully written', output)
}

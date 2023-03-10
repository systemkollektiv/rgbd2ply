#!/bin/env node

import cli from '@magic/cli'
import log from '@magic/log'

import { rgbd2ply } from './index.js'

const cliConfig = {
  options: [
    ['--help', '-help', 'help', '--h', '-h'],
    ['--input', '-i'],
    ['--output', '--out', '-o'],
    ['--point-offset-x-cm', '--point-offset-x', '--offset-x', '-x'],
    ['--point-offset-y-cm', '--point-offset-y', '--offset-y', '-y'],
    ['--z-multiplier', '--z-mult', '-z'],
    ['--bw'],
  ],
  default: {
    '--output': 'ply.ply',
    '--point-offset-x-cm': 1,
    '--point-offset-y-cm': 1,
    '--z-multiplier': 1,
  },
  single: [
    '--input',
    '--output',
    '--point-offset-x-cm',
    '--point-offset-y-cm',
    '--z-multiplier',
    '--bw',
  ],
  required: ['--input'],
  help: {
    name: 'rgbd2ply',
    header: 'reads an rgbd image and creates a ply file based on the data.',
    options: {
      '--input': 'the image input file',
      '--output': 'the file to write the data to',
      '--point-offset-x-cm': 'how many centimeters should each point be offset on the x axis',
      '--point-offset-y-cm': 'how many centimeters should each point be offset on the y axis',
      '--z-multiplier': 'multiplies the final depth value',
      '--bw': 'use a greyscale depth image',
    },
  },
  example: `
rgbd2ply -i image.jpg -o ply.ply -x 1.66 -y 1 -z 1
`,
}

const run = async () => {
  const res = cli(cliConfig)

  if (res.args.bw) {
    res.args.bg = true
  }

  await rgbd2ply(res.args)
}

run()

process
  .on('unhandledRejection', error => {
    log.error('unhandled rejection', error)
    process.exit()
  })
  .on('uncaughtException', error => {
    log.error('uncaught exception', error)
    process.exit()
  })

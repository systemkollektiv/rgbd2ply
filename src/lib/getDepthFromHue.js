import { rgb2hsl } from './rgb2hsl.js'

export const getDepthFromHue = ({ r, g, b }, options = {}) => {
  const { scale = 0.1 } = options

  const { h } = rgb2hsl({ r, g, b })

  return (h * scale).toFixed(3) / 1
}

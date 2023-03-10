export const getDepthFromGreyscale = ({ r, g, b }, options = {}) => {
  const { scale = 0.1, precision = 3 } = options

  const average = (r + g + b) / 3

  return (average * scale).toFixed(precision) / 1
}

export const rgb2hsl = ({ r, g, b }) => {
  r = r / 255
  g = g / 255
  b = b / 255

  const cMax = Math.max(r, g, b)
  const cMin = Math.min(r, g, b)

  const delta = cMax - cMin

  const l = (cMax + cMin) / 2

  let h = 0
  let s = 0

  if (delta == 0) {
    h = 0
  } else if (cMax == r) {
    h = 60 * (((g - b) / delta) % 6)
  } else if (cMax == g) {
    h = 60 * ((b - r) / delta + 2)
  } else {
    h = 60 * ((r - g) / delta + 4)
  }

  if (delta == 0) {
    s = 0
  } else {
    s = delta / (1 - Math.abs(2 * l - 1))
  }

  return {
    h,
    s,
    l,
  }
}

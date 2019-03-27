import Model from './model'

export function query(el?: string | HTMLCanvasElement): HTMLCanvasElement {
  if (!el) {
    return createCanvas()
  }
  if (typeof el === 'string') {
    const selected = document.querySelector(el)
    if (!selected || selected.tagName !== 'CANVAS') {
      return createCanvas()
    }
    return selected as HTMLCanvasElement
  } else {
    return el
  }
}

function createCanvas() {
  const canvas = document.createElement('canvas')
  document.body.appendChild(canvas)
  return canvas
}

export function randomBetween(start: number, end: number) {
  if (end < start) {
    ;[end, start] = [start, end]
  }
  const n = Math.random() * (end - start + 1)
  return Math.floor(n + start)
}

export function collide(a: Model, b: Model) {
  if (
    a.x + a.width <= b.x ||
    a.y + a.height <= b.y ||
    b.x + b.width <= a.x ||
    b.y + b.height <= a.y
  ) {
    return false
  }
  return true
}

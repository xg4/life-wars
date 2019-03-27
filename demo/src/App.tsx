import React, { useEffect, useRef } from 'react'
import Game from '../../src'

export default function() {
  const canvasEl = useRef(null)

  useEffect(() => {
    const game = new Game({ el: canvasEl.current, width: 500, height: 500 })
  })

  return (
    <>
      <canvas ref={canvasEl} style={{ border: '1px solid #000' }} />
    </>
  )
}

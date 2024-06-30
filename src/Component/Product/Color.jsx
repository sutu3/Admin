import React, { useState } from 'react'
import { HexColorPicker } from 'react-colorful'

const Color = () => {
      const [color, setColor] = useState('#fff');
  return (
    <div>
      <div style={{ backgroundColor: color, padding: '10px', marginTop: '10px' }}>
        Selected Color: {color}
      </div>
      <div></div>
      <HexColorPicker color={color} onChange={setColor} />
    </div>
  )
}

export default Color

import React from 'react'
import { HexColorPicker } from 'react-colorful'

const Color = () => {
      const [color, setColor] = useState('#fff');
  return (
    <div>
      <HexColorPicker color={color} onChange={setColor} />
      <div style={{ backgroundColor: color, padding: '10px', marginTop: '10px' }}>
        Selected Color: {color}
      </div>
    </div>
  )
}

export default Color

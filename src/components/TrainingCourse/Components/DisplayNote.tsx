import * as React from 'react'

interface DisplayNoteProps {
  trainingLineNote: string
  y: number
  x: number
}

const DisplayNote: React.FC<DisplayNoteProps> = ({
  trainingLineNote,
  x,
  y,
}) => {
  return (
    <div className="window">
      <div>
        <p>{trainingLineNote}</p>
      </div>
    </div>
  )
}

export default DisplayNote

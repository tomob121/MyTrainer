import React from 'react'

interface Props {
  message: string
  usingCancelDelete: () => void
  usingDeleteTrainign: () => void
}

const DialogConfirmation: React.FC<Props> = ({
  message,
  usingCancelDelete,
  usingDeleteTrainign,
}) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        backgroundColor: 'rgba(0,0,0,0.5)',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'white',
          padding: '7%',
        }}
      >
        <h3 style={{ color: '#111' }}>{message}</h3>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button
            onClick={() => usingDeleteTrainign()}
            style={{
              background: 'red',
              color: 'white',
              padding: '10%',
              marginRight: '4px',
              border: 'none',
              cursor: 'pointer',
              borderRadius: '5px',
            }}
          >
            Yes
          </button>
          <button
            onClick={() => usingCancelDelete()}
            style={{
              background: 'green',
              color: 'white',
              padding: '10%',
              marginLeft: '4px',
              border: 'none',
              cursor: 'pointer',
              borderRadius: '5px',
            }}
          >
            No
          </button>
        </div>
      </div>
    </div>
  )
}

export default DialogConfirmation

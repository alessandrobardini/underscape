import React, { MouseEventHandler } from 'react'
import Button from 'ui/Button'

import './Modal.scss'

type ModalProps = {
  children?: any
  closeModal: MouseEventHandler<HTMLButtonElement>
}

const Modal: React.FC<ModalProps> = ({ closeModal, children }) => {
  return <div className='Modal'>
    <div className='modal-main'>
      {children}
    </div>
    <div className='modal-footer'>
      <Button icon onClick={closeModal} iconLeft='fa fa-close' />
    </div>
  </div>
}

export default Modal
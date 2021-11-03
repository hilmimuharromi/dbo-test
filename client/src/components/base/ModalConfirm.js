import React from 'react'
import Modal from './Modal'
function ModalConfirm(props) {
    const {visible, setVisible, title, message, onConfirm} = props
    return (
        <Modal 
        show={visible}
        onHide={setVisible}
        title={title}
        footer={true}
        onConfirm={onConfirm}
        >
            <div>
                <p>{message}</p>
            </div>
            </Modal>
    )
}

export default ModalConfirm

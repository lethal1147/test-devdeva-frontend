import React, { useEffect } from 'react'

function Modal({
    isOpen,
    toggleModal,
    onBackgroundClick,
    children
}: ModalProps) {

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                toggleModal()
            }
        }
        if (isOpen) {
            document.addEventListener('keydown', handleEscape)
        } else {
            document.removeEventListener('keydown', handleEscape)
        }
        return () => {
            document.removeEventListener('keydown', handleEscape)
        }
    }, [isOpen, toggleModal])

    const handleContentClick = (e: React.MouseEvent<HTMLDivElement>): void => e.stopPropagation()

    return (
        <div
            onClick={onBackgroundClick}
            className="fixed inset-0 flex items-center justify-center bg-gray-900 z-50 bg-opacity-50">
            <div onClick={handleContentClick}>{children}</div>
        </div>
    )
}

export default Modal
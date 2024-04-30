// styles
import './DialogModal.css';

// icons
import { IoMdClose } from 'react-icons/io';

export default function DialogModal({
	children,
	isModalOpen,
	setIsModalOpen,
	modalTitle,
	modalConfirmText,
  modalConfirmAction,
	isPending,
	error
}) {
	const modalConfirmBtnClass =
		modalTitle === 'Account Deletion' ? 'deletion-confirm-btn' : '';
	return (
		<>
			{isModalOpen && (
				<div className='overlay'>
					<div className='dialog-modal-container'>
						<IoMdClose
							className='modal-close-icon serving-modal-close-icon'
							onClick={() => setIsModalOpen(false)}
						/>
						<h2
							className='dialog-modal-title'
							style={
								modalTitle === 'Account Deletion'
									? { color: 'rgba(200, 9, 9)' }
									: {}
							}>
							{modalTitle}
						</h2>
						<p className='dialog-modal-info'>{children}</p>
						<div className='dialog-modal-btns'>
							<button
								className='dialog-modal-close'
								onClick={() => setIsModalOpen(false)}>
								Close
							</button>
							<button
								className={`dialog-modal-confirm ${modalConfirmBtnClass}`}
								onClick={() => modalConfirmAction()}
							>
								{isPending ? 'Loading...' : (modalConfirmText && modalConfirmText) || 'Confirm'}
							</button>
						</div>
						{error && <p className="error">{error}</p>}
					</div>
				</div>
			)}
		</>
	);
}

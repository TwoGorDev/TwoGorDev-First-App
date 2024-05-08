// Styles
import './DangerZone.css'

// Utilities & Hooks
import { useState } from 'react';
import useDataApi from '../../hooks/useDataApi';
import useUserAuth from '../../hooks/useUserAuth';

// Components, Icons & Images
import DialogModal from '../dialogModal/DialogModal';

export default function DangerZone() {
  // External logic/state
  const {isPending, error: serverError, deleteData } = useDataApi();
  const { logout } = useUserAuth();

  // Local logic/state
  const [isDeleteAccModalOpen, setIsDeleteAccModalOpen] = useState(false);

  // Delete account functionality
	const deleteAccount = async () => {
		const res = await deleteData('/users');

		if (res) {
			logout();
		}
	};

  return (
    <div className='danger-zone'>
      <h3 className='acc-settings-subtitle acc-delete-title'>
        Delete account
      </h3>
      
      <button
        onClick={() => setIsDeleteAccModalOpen(true)}
        className='acc-change-data-btn settings-logout-btn acc-delete-btn'
        disabled={isPending}
      >
        Delete account
      </button>

      <DialogModal
        modalTitle='Account Deletion'
        isModalOpen={isDeleteAccModalOpen}
        setIsModalOpen={setIsDeleteAccModalOpen}
        modalConfirmText='Delete my account'
        modalConfirmAction={deleteAccount}
        isPending={isPending}
        error={serverError}
      >
        This process is irreversible. Are you sure you want to delete your
        account?
      </DialogModal>
    </div>
  )
}
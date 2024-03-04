import Modal from '../components/modal';
import FormPage from '../lib/form';
import Button from '../components/button';
import '../App.css';
import { useState } from 'react';

import { useAuth } from '../context/authContext';

function DeletePage({ data, handleCancelBtn, handleDeleteLink, setDataObj }) {
  const { token } = useAuth();

  async function handleDelete(e) {
    e.preventDefault();
    await handleDeleteLink(data, token);
  }
  return (
    <Modal>
      <FormPage>
        <form className="login-form form-modal">
          <p className="delete-qst">
            are you sure you want to delete this link
          </p>
          <span className="delete-btn-wrapper">
            <button
              className={'shorten-btn yes-btn'}
              onClick={(e) => handleDelete(e)}>
              Yes
            </button>
            <button
              className={'shorten-btn no-btn'}
              onClick={() => handleCancelBtn()}>
              No
            </button>
          </span>
        </form>
      </FormPage>
    </Modal>
  );
}
export default DeletePage;

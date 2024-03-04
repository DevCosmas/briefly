import Modal from '../components/modal';
import FormPage from '../lib/form';
import Button from '../components/button';
import '../App.css';
import { useState } from 'react';
import { useAuth } from '../context/authContext';

function EditPage({ data, handleCancelBtn, loader, handleSetDomainName }) {
  const [domainName, setDomainName] = useState('');

  console.log(data);

  async function handleEdit(e) {
    e.preventDefault();
    await handleSetDomainName(domainName);
  }
  return (
    <Modal>
      <FormPage>
        <form
          className="login-form form-modal"
          onSubmit={(e) => handleEdit(e)}>
          <input
            type="text"
            placeholder="New Custom Name"
            className="form-input modal-input"
            onChange={(e) => setDomainName(e.target.value)}
          />

          {domainName.length > 1 && (
            <Button className={'shorten-btn disp-block'}>
              {loader ? 'processing...' : 'Save changes'}
            </Button>
          )}
          <button
            className={'shorten-btn cancel-btn'}
            onClick={() => handleCancelBtn()}>
            Cancel
          </button>
        </form>
      </FormPage>
    </Modal>
  );
}
export default EditPage;

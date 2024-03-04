import Button from '../components/button';
import { Link, useNavigate } from 'react-router-dom';
import qrcodePic from '../qrcode-pic.png';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/authContext';
import EditPage from './modal.page';
import DeletePage from './delete.modal';
import axios from 'axios';
// import { CopyToClipboard } from 'react-copy-to-clipboard';
import data from '../data';

function HistoryBar({ data }) {
  const { isAuthenticated, user, token } = useAuth();
  const [dataObj, setDataObj] = useState(null);
  const [istoDelete, setIstoDelete] = useState(false);
  const [loader, setLoader] = useState(false);
  const [copied, setCopied] = useState(false);
  // console.log(isAuthenticated);
  const navigate = useNavigate();

  const handleSetDomainName = async (newName) => {
    try {
      const response = await axios.patch(
        `http://localhost:8000/updateUrl/${dataObj.shortUrl}`,
        {
          shortUrl: newName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(dataObj);
      setLoader(true);
      // if (!response.ok) throw new Error('Bad Internet Connection');
      if (response.status !== 'success') throw new Error(response.data.message);
      console.log(response.data);
      console.log(response);
    } catch (error) {
      console.log('Error:', error);
      setLoader(false);
    } finally {
      setLoader(false);
      // console.log(response.data);
    }
  };

  const handleDeleteLink = async (dataObj, token) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/deleteUrl/${dataObj._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(dataObj);
      setLoader(true);
      if (response.status !== 200) {
        throw new Error('Bad Internet Connection');
      }
      if (response.data.status !== 'success') {
        throw new Error(response.data.message);
      }
      console.log(response.data);
      console.log(response);

      setIstoDelete(false);
      setDataObj(null);
    } catch (error) {
      console.error('Error:', error);
      setLoader(false);
    }
  };

  const handleCancelBtn = () => {
    setDataObj(null);
  };
  const handleDeleteCancelBtn = () => {
    setIstoDelete(false);
    setDataObj(null);
  };

  function handleDeleteBtn(obj) {
    setIstoDelete(true);
    setDataObj(obj);
  }
  return (
    <div className="table-container">
      <p className="Hist-p">
        {data.length === 1
          ? `history (${data.length})`
          : `Histories (${data.length})`}
      </p>
      <table>
        <thead>
          <tr>
            <th>Short link</th>
            <th>Original Link</th>
            <th>Clicks</th>
            <th>Qr Code</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <p>No data To load 🤨</p>
          ) : (
            data.map((item) => (
              <tr
                key={item.newUrl}
                id={`${item.shortUrl}`}>
                <td className="td-icon">
                  {item.newUrl}
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="clip-copy">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
                      />
                    </svg>
                  </span>
                  {copied ? <p>Copied</p> : null}
                  {/* <CopyToClipboard
                    text={item.newUrl}
                    onCopy={() => setCopied(true)}>
                 
                  </CopyToClipboard> */}
                </td>
                <td className="long-content">{item.originalUrl}</td>
                <td>{item.visitationCount}</td>
                <td>
                  <span className="qrcode-container">
                    <img
                      src={qrcodePic}
                      className="qrcode-pic"
                      alt="a qrcode "
                    />
                  </span>
                </td>
                <td>
                  <span>
                    <button
                      className="btn-edit"
                      onClick={() => setDataObj(item)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="clip-copy">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                        />
                      </svg>
                    </button>

                    <button
                      onClick={() => handleDeleteBtn(item)}
                      className="btn-edit">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="clip-copy">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </button>
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {dataObj !== null && (
        <EditPage
          data={dataObj}
          handleSetDomainName={handleSetDomainName}
          handleCancelBtn={handleCancelBtn}
          loader={loader}
        />
      )}
      {istoDelete && (
        <DeletePage
          data={dataObj}
          handleDeleteLink={handleDeleteLink}
          handleCancelBtn={handleDeleteCancelBtn}
        />
      )}
    </div>
  );
}
export default HistoryBar;

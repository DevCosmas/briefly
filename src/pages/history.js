import Button from '../components/button';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/authContext';
import EditPage from './modal.page';
import DeletePage from './delete.modal';
import DownloadQRCode from '../components/qrcode';
import Axios from 'axios';
import ClipCopy from '../components/clip';
import { BASEURLDEV, BASEURLPROD } from '../utils/constant';

function HistoryBar({ data, loading }) {
  const { token, msg, setMsg, msgStatus, setMsgStatus } = useAuth();
  const [dataObj, setDataObj] = useState(null);
  const [istoDelete, setIstoDelete] = useState(false);
  const [loader, setLoader] = useState(false);

  const [activeIndex, setActiveIndex] = useState(null);
  const [active, setActive] = useState(true);
  const tokenFromLocalStorage = localStorage.getItem('token');
  // console.log(isAuthenticated);
  const navigate = useNavigate();

  const handleSetDomainName = async (newName) => {
    try {
      const response = await Axios.patch(
        `${BASEURLPROD}/updateUrl/${dataObj.shortUrl}`,
        {
          shortUrl: newName,
        },
        {
          headers: {
            Authorization: `Bearer ${tokenFromLocalStorage || token}`,
          },
        }
      );

      if (response.status !== 200) {
        setMsg(response.data.message);
        setMsgStatus('fail');
        setLoader(false);
        throw new Error(response.data.message);
      } else {
        const { message } = response.data;
        setLoader(false);
        setMsg(message);
        setMsgStatus('success');
        setDataObj(null);
      }
    } catch (error) {
      if (error.response && error.response.status === 500) {
        setMsg('Something went really wrong. Try again!');
        setMsgStatus('fail');
        setLoader(false);
      } else if (error.response && error.response.status === 429) {
        setMsg('Too many requests. Try again later!');
        setMsgStatus('fail');
        setLoader(false);
      } else if (error.response.data.message === 'jwt expired') {
        setMsg('');
        setMsgStatus('');
        navigate('/login');
      } else {
        setMsg(error.response.data.message);
        setMsgStatus('fail');
        setLoader(false);
      }
    } finally {
      setLoader(false);
    }
  };

  const handleDeleteLink = async (dataObj, token) => {
    try {
      const response = await Axios.delete(
        `${BASEURLPROD}/deleteUrl/${dataObj._id}`,
        {
          headers: {
            Authorization: `Bearer ${tokenFromLocalStorage || token}`,
          },
        }
      );

      setLoader(true);
      if (response.status !== 200) {
        setMsg(response.data.message);
        setMsgStatus('fail');
        setLoader(false);
        setIstoDelete(false);

        throw new Error(response.data.message);
      } else {
        const { message } = response.data;
        setLoader(false);
        setMsg(message);
        setMsgStatus('success');
        setDataObj(null);
        setIstoDelete(false);
      }
    } catch (error) {
      if (error.response && error.response.status === 500) {
        setMsg('Something went really wrong. Try again!');
        setMsgStatus('fail');
        setLoader(false);
      } else if (error.response && error.response.status === 429) {
        setMsg('Too many requests. Try again later!');
        setMsgStatus('fail');
        setLoader(false);
      } else if (error.response.data.message === 'jwt expired') {
        setMsg('');
        setMsgStatus('');
        navigate('/login');
      } else {
        setMsg(error.response.data.message);
        setMsgStatus('fail');
        setLoader(false);
      }
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

  const handleSetIndex = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  console.log(loading, 'Loading');

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
          {loading && <p className="fecthData-p">LOADING DATA</p>}
          {data.length === 0 || null ? (
            <p className="hist-loader">No data To load 🤨</p>
          ) : (
            data.map((item) => (
              <tr
                key={item.newUrl}
                id={`${item.shortUrl}`}>
                <td className=" newUrlTr">
                  {item.newUrl}

                  <ClipCopy text={item.newUrl}></ClipCopy>
                </td>
                <td className="long-content">{item.originalUrl}</td>
                <td>{item.visitationCount}</td>
                <td>
                  <span className="qrcode-container">
                    <DownloadQRCode qrCodeUrl={item.newUrl}></DownloadQRCode>
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

      {data.map((item, index) => (
        <div
          className="mobile-disp-db"
          key={item.shortUrl}
          onClick={() => handleSetIndex(index)}>
          <div
            className={`mobile-disp-newUrl ${
              activeIndex === index ? 'active-bar' : ''
            }`}>
            <p className="mobile-disp-newUrl-p">{item.newUrl}</p>
            <span className="conatiner">
              <ClipCopy text={item.newUrl}></ClipCopy>
            </span>
          </div>
          <div
            className={`mobile-disp-list ${
              activeIndex === index ? 'display-block' : ''
            }`}>
            <span className="mobile-disp-list-sp-el">
              <h3 className="mobile-disp-list-h3- ">Original Url</h3>
              <p className="mobile-disp-list-h3-el long-content">
                {item.originalUrl}
              </p>
            </span>
            <span className="mobile-disp-list-sp-el">
              <h3 className="mobile-disp-list-h3-el">Clicks</h3>
              <p className="mobile-disp-list-h3-el">{item.visitationCount}</p>
            </span>
            <span className="mobile-disp-list-sp-el">
              <h3 className="mobile-disp-list-h3-el">QrCode</h3>
              <DownloadQRCode
                className={'mobile-disp-list-img-el'}
                qrCodeUrl={item.newUrl}></DownloadQRCode>
            </span>
            <span className="mobile-disp-list-sp-el">
              <h3 className="mobile-disp-list-h3-el">Actions</h3>
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
                    className="clip-copy mobile-icon">
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
                    class="clip-copy mobile-icon">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
              </span>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
export default HistoryBar;

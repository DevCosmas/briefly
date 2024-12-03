import { FiScissors } from 'react-icons/fi';
import { IoCopyOutline } from 'react-icons/io5';
import { IoIosLink } from 'react-icons/io';
import { FaEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import { useState, useEffect } from 'react';
import EditModal from './edit.modal';
import DeleteModal from './delete.modal';
import axios from 'axios';
import Cookies from 'js-cookie';
import { BASEURLDEV } from '../utils/constant';
import { handleServerError } from '../lib/errorHandler';
import { toast } from 'react-toastify';
import { toastProp } from '../lib/toast_prop';
import Notification from './notification';

import { copyToClipboard } from '../lib/clip';

export default function HomeComponent() {
  const [tempUrl, setTempUrl] = useState({ state: false, value: null });
  const [originalUrl, setOriginalUrl] = useState('');
  const [loader, setLoader] = useState(false);

  async function createNewLink(e) {
    e.preventDefault();
    setLoader(true);
    try {
      const token = Cookies.get('token');
      const response = await axios.post(
        `${BASEURLDEV}/api/url/createUrl`,
        { originalUrl },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!response || response.status !== 201)
        throw new Error('Link is not created');
      setLoader(false);
      // console.log(response);
      setTempUrl({ state: true, value: response.data.newDoc.newUrl });
      toast.success('Shortened URL has been created successfully!', {
        ...toastProp,
      });
      setOriginalUrl('');
    } catch (error) {
      setLoader(false);
      console.log(error.response);
      if (error.response) {
        // The server responded with a status code outside the 2xx range
        handleServerError(error.response.status, error.response.data.message);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
        handleServerError(null, 'No response received from the server.');
      } else {
        // Something happened in setting up the request
        console.error('Error setting up request:', error.message);
        handleServerError(null, error.message);
      }
    } finally {
      setLoader(false);
    }
  }

  async function handleTempUrlCopy() {
    await copyToClipboard(tempUrl.value);
    setTimeout(() => setTempUrl({ ...tempUrl, state: false }), 3000);
  }

  return (
    <main className="py-11">
      <form
        onSubmit={(e) => createNewLink(e)}
        className="border w-full sm:w-1/2 mx-auto py-2 px-2 rounded-full flex gap-2 justify-between items-center">
        <input
          type="text"
          placeholder="Your Long Url"
          className="px-4 w-4/5 outline-none"
          onChange={(e) => setOriginalUrl(e.target.value)}
          value={originalUrl}
        />
        <button
          className={`${
            loader ? 'bg-blue-400' : 'bg-blue-700'
          } w-60 text-white text-center rounded-full px-2 py-2`}
          type="submit">
          <span className="flex items-center gap-4 justify-center">
            <p>{loader ? 'Shortening...' : 'Shorten'}</p>{' '}
            {loader ? '' : <FiScissors />}
          </span>
        </button>
      </form>
      {/* SHOW NEW CREATED SHORT LINK FOR COPY */}
      {tempUrl.state && (
        <TempUrlHolder
          clipCopy={handleTempUrlCopy}
          url={tempUrl.value}
        />
      )}

      {/* {tempUrl.state && (
        <div className="flex items-center justify-center">
          <ClipCopy text={tempUrl.value} />
        </div>
      )} */}

      {/* SHOW DATA FOR SHORTENDED URLs */}
      <UrlCardTable />
    </main>
  );
}

function TempUrlHolder({ url, clipCopy }) {
  return (
    <div className="flex mt-6 mb-11 justify-center sm:text-xl  gap-5 items-center w-4/5 sm:w-1/2 mx-auto">
      <p> {url}</p>
      <IoCopyOutline
        onClick={clipCopy}
        className="text-blue-600 hover:text-blue-800 cursor-pointer"
      />
    </div>
  );
}

function UrlCardTable() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClose, setIsClose] = useState(false);
  const [isSave, setIsSave] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleteClose, setIsDeleteClose] = useState(false);
  const [urls, setUrls] = useState([]);
  const [loader, setLoader] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState(null);

  // get jwt token for authentication
  const token = Cookies.get('token');

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setLoader(true);
        const response = await axios.get(`${BASEURLDEV}/api/url//findAll?`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          signal: controller.signal,
        });

        console.log(response);
        console.log(response.status);
        if (response.status !== 200) setLoader(false);
        const resData = response.data;
        const { data: dataFromApi } = resData;
        setUrls(dataFromApi);
      } catch (error) {
        setLoader(false);
        if (error.response) {
          // The server responded with a status code outside the 2xx range
          handleServerError(error.response.status, error.response.data.message);
        } else if (error.request) {
          // The request was made but no response was received
          console.error('No response received:', error.request);
          handleServerError(null, 'No response received from the server.');
        } else {
          // Something happened in setting up the request
          console.error('Error setting up request:', error.message);
          handleServerError(null, error.message);
        }
      } finally {
        setLoader(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [token]);

  function handleClose() {
    setIsClose(true);
    setIsSave(false);
    setIsOpen(false);
  }
  function handleIsOpen(url) {
    console.log(url);
    setSelectedUrl(url);
    setIsOpen(true);
    setIsClose(false);
    setIsSave(false);
  }

  function handleDeleteClose() {
    setIsDeleteClose(true);
    setIsSave(false);
    setIsDeleteOpen(false);
  }

  function handleIsDeleteOpen(url) {
    setSelectedUrl(url);
    setIsDeleteOpen(true);
    setIsDeleteClose(false);
    setIsSave(false);
  }

  async function onSave(requestBody) {
    // console.log(requestBody);

    try {
      const response = await axios.patch(
        `${BASEURLDEV}/api/url//updateUrl/${selectedUrl.shortUrl}`,
        { shortUrl: requestBody.name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      if (response.status === 200)
        toast.success('New custom name successful', { ...toastProp });
    } catch (error) {
      // console.log(error.response);
      handleServerError(error.response.status, error.response.data.message);
    }
  }

  async function onDelete() {
    console.log(selectedUrl);
    try {
      const response = await axios.delete(
        `${BASEURLDEV}/api/url/deleteUrl/${selectedUrl.shortUrl}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) setIsDeleteOpen(false);
      toast.success('Delete  successful', { ...toastProp });

      // console.log(response);
    } catch (error) {
      console.log(error.response);
      handleServerError(error.response.status, error.response.data.message);
    }
  }

  return (
    <div className="mt-11 w-full sm:w-11/12 mx-auto ">
      <div className="flex gap-2 text-2xl mt-11 font-bold mb-4 items-center">
        <h1>Your Links</h1>
        <IoIosLink className="text-blue-700 text-3xl" />
      </div>
      {!loader ||
        (urls.length === 0 && <div> No url available to display</div>)}
      {!loader && urls.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
          {urls.map((url) => (
            <div
              key={url._id}
              className="border rounded-lg p-4 shadow-md bg-white hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-center mb-3">
                <div>
                  <p className="text-blue-600 font-semibold truncate">
                    {url.newUrl}
                  </p>
                  <p className="text-gray-500 truncate">{url.longUrl}</p>
                </div>
              </div>
              <div className="flex justify-around mt-4">
                <IoCopyOutline
                  onClick={() => copyToClipboard(url.newUrl)}
                  className="text-blue-600 hover:text-blue-800 cursor-pointer text-2xl"
                />
                <button
                  onClick={() => handleIsOpen(url)}
                  className="text-slate-500 hover:text-slate-700 text-2xl">
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleIsDeleteOpen(url)}
                  className="text-red-500 hover:text-red-700 text-2xl">
                  <MdDeleteForever />
                </button>
              </div>
            </div>
          ))}
          <EditModal
            onClose={handleClose}
            isOpen={isOpen}
            onSave={onSave}
          />
          <DeleteModal
            isDeleteOpen={isDeleteOpen}
            onClose={handleDeleteClose}
            onDelete={onDelete}
            url={selectedUrl?.newUrl}
          />
        </div>
      )}
      <Notification />
    </div>
  );
}

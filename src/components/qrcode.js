import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import '../App.css';

const DownloadQRCode = ({ qrCodeUrl, className = '' }) => {
  const [urlImage, setUrlImage] = useState('');

  useEffect(() => {
    async function generateQrcode() {
      try {
        const dataUrl = await QRCode.toDataURL(qrCodeUrl);
        setUrlImage(dataUrl);
      } catch (error) {
        console.error('Error generating QR code:', error);
      }
    }

    generateQrcode();
  }, [qrCodeUrl]);

  return (
    <div>
      <img
        src={urlImage}
        alt="qrcode"
        className={`qrcode-pic ${className}`}
      />
      {urlImage && (
        <a
          href={urlImage}
          download="qrcode.png">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="qrcode-download-icon">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
            />
          </svg>
        </a>
      )}
    </div>
  );
};

export default DownloadQRCode;

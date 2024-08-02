'use client'

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const Html5QrcodeScript = dynamic(() => import('html5-qrcode'), {
  ssr: false,
  loading: () => <p>Loading QR Scanner...</p>
});

export default function Home() {
  const [scanResult, setScanResult] = useState('No result');
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    let html5QrCode;

    const initializeScanner = async () => {
      const Html5Qrcode = (await import('html5-qrcode')).Html5Qrcode;
      html5QrCode = new Html5Qrcode("qr-reader");
    };

    initializeScanner();

    return () => {
      if (html5QrCode) {
        html5QrCode.stop().catch(error => console.error('Failed to stop camera:', error));
      }
    };
  }, []);

  const startScanner = async () => {
    const Html5Qrcode = (await import('html5-qrcode')).Html5Qrcode;
    const html5QrCode = new Html5Qrcode("qr-reader");
    setIsScanning(true);

    try {
      await html5QrCode.start(
        { facingMode: "environment" }, //environment = rear camera
        {
          fps: 10, // this is the scan speed not camera fps, 10 feels fine
          qrbox: { width: 350, height: 350 }, // could be a bit smaller but for this its fine
        },
        (decodedText, decodedResult) => {
          window.alert(`Scanned: ${decodedText}`, decodedResult);
          setScanResult(decodedText);
          html5QrCode.stop();
          setIsScanning(false);
        },
        (errorMessage) => {
          console.log(`QR Code scanning error: ${errorMessage}`);
        }
      );
    } catch (err) {
      console.error(`Unable to start scanning, error: ${err}`);
      setIsScanning(false);
    }
  };
  
  // functions can be added here using the scanResult state and async for after scan
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-4">XXXX.edu QR Scanner</h1>
        <div id="qr-reader" className="w-full h-64 bg-gray-200 rounded-lg overflow-hidden" />
        <button 
          onClick={startScanner}
          disabled={isScanning}
          className={`mt-4 w-full font-bold py-2 px-4 rounded ${
            isScanning 
              ? 'bg-gray-400 text-gray-700 cursor-not-allowed' 
              : 'bg-blue-500 hover:bg-blue-700 text-white'
          }`}
        >
          {isScanning ? 'Scanning...' : 'Start Scanning'}
        </button>
        <p className="mt-4 text-center">
          {scanResult === 'No result' ? 'Waiting for scan...' : `Last scanned: ${scanResult}`}
        </p>
      </div>
    </main>
  );  
}
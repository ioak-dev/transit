import React, { useEffect, useState } from 'react';
import './style.scss';
// import QrReader from 'react-qr-scanner';
import { QrReader, } from 'react-qr-reader';

interface Props {
  handleChange: any;
  handleClose: any;
}

const QrScanner = (props: Props) => {
  const [state, setState] = useState<any>({});
  const [qrData, setQrData] = useState('');
  const [showQrReader, setShowQrReader] = useState(true);
  useEffect(() => { }, []);

  const handleQrResult = (event: any) => {
    console.log(event);
    setQrData(event);
  };

  const camStyle = {
    display: 'flex',
    justifycontent: 'center',
    marginTop: '-50px',
  };

  const previewStyle = {
    height: 300,
    width: 300,
    display: 'flex',
    justifycontent: 'center',
  };

  const handleScan = (data: any) => {
    if (data && data !== state.result) {
      setState({
        result: data,
      });
      props.handleChange(data);
    }
  };

  const handleError = (err: any) => {
    console.error(err);
  };

  const closeOverlay = () => {
    props.handleClose();
  };

  const handleChange = (event: any) => {
    const value = event.target.value.replace(/\D/g, '');
    console.log(value);
    setState({
      ...state,
      [event.currentTarget.name]: value,
    });
  };

  return (
    <div className="qr-scanner-overlay">
      {showQrReader && (
        <div style={camStyle}>
          {/* <QrReader
            delay={state.delay}
            style={previewStyle}
            facingMode="rear"
            onError={handleError}
            onScan={handleScan}
          /> */}
          <QrReader
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{ width: '300px', height: '300px' }}
          />
        </div>
      )}
      {showQrReader && (
        <button
          className="button default-button"
          onClick={() => setShowQrReader(false)}
        >
          Can&#39;t scan? Enter Code
        </button>
      )}
      {!showQrReader && (
        <>
          <input name="name" onInput={handleChange} value={state.name} />
          <button
            className="button primary-button"
            onClick={() => handleScan(state.name)}
          >
            Submit
          </button>
        </>
      )}
      <button className="button default-button" onClick={closeOverlay}>
        Close
      </button>
    </div>
  );
};

export default QrScanner;

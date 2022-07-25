import React, { useEffect, useState } from 'react';
import './style.scss';
import QrReader from 'react-qr-scanner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

interface Props {
  handleChange: any;
  handleClose: any;
}

const QrScanner = (props: Props) => {
  const [state, setState] = useState<any>({});
  const [qrData, setQrData] = useState('');
  const [showQrReader, setShowQrReader] = useState(true);
  useEffect(() => {}, []);

  const handleQrResult = (event: any) => {
    console.log(event);
    setQrData(event);
  };
  const previewStyle = {
    height: 240,
    width: 320,
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
        <QrReader
          delay={state.delay}
          style={previewStyle}
          onError={handleError}
          onScan={handleScan}
        />
      )}
      <button className="button default-button" onClick={closeOverlay}>
        Close
      </button>
      <button
        className="button primary-button"
        onClick={() => setShowQrReader(false)}
      >
        Enter Code
      </button>
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
    </div>
  );
};

export default QrScanner;

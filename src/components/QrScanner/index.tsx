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

  return (
    <div className="qr-scanner-overlay">
      <span onClick={closeOverlay}>
        <FontAwesomeIcon icon={faClose} />
      </span>
      <QrReader
        delay={state.delay}
        style={previewStyle}
        onError={handleError}
        onScan={handleScan}
      />
      {/* <p>{state.result}</p> */}
    </div>
  );
};

export default QrScanner;

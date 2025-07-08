import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const RFIDScanner = ({ onScan }: { onScan: (uid: string, itemName: string) => void }) => {
  const [rfid, setRfid] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const lastUidRef = useRef<string | null>(null);

  useEffect(() => {
    const fetchRFID = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:5002/rfid');
        const uid = res.data.rfid_tag;
        const item = res.data.rfid_status;

        if (uid && uid !== lastUidRef.current) {
          lastUidRef.current = uid;
          setRfid(uid);
          setStatus(item);
          onScan(uid, item);
        }
      } catch (err) {
        console.error('RFID fetch error:', err);
        setRfid(null);
        setStatus(null);
      }
    };

    const interval = setInterval(fetchRFID, 3000);
    return () => clearInterval(interval);
  }, [onScan]);

  return (
    <div style={{ background: '#fff', padding: 20, border: '1px solid #ccc', borderRadius: 10 }}>
      <h3>📡 RFID Scan Result</h3>
      {rfid ? (
        <p>
          Last scanned tag: <strong>{rfid}</strong> <br />
          Status: <strong>{status}</strong>
        </p>
      ) : (
        <p>No RFID tag scanned yet.</p>
      )}
    </div>
  );
};

export default RFIDScanner;

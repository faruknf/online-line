import React, { useEffect, useState } from 'react';
import LineItem from './LineItem';
import io from '../../services/socket';
import mapQueue from '../../services/queue';

export default function Line() {
  const [line, setLine] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const socket = io();
    socket.on('connect', () => {
      socket.on('ALL_LINE', (data) => {
        setLine(() => mapQueue(data));
      });
      socket.on('NEW_USER', (data) => {
        setLine((prev) => [data, ...prev]);
      });
      socket.on('DROP_USER', (data) => {
        setLine((prev) => prev.filter((i) => i !== data));
        setError(null);
      });
      socket.on('ERROR', (data) => {
        setError(data);
      });
    });
  }, []);

  return (
    <div className="line">
      {line.map((item) => {
        if (item) {
          return <LineItem key={Math.random()} userId={item?.slice(0, 6)} />;
        }
        return <></>;
      })}

      {error ? <div className="line__error">{error}</div> : <></>}
    </div>
  );
}

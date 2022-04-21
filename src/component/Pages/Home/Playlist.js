import React from 'react';
import './Playlist.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

const Playlist = ({ url, title, artist, album, onClick, children }) => {
  return (
    <table className="card">
      <tbody>
        <tr>
          <td className="card-wrap">
            <img className="image" src={url} alt={title} />
            <div className="card-information">
              <div className="head-information">
                <h1 className="text-h1">{title}</h1>
                <p className="Text">{artist}</p>
              </div>
              <p className="Text">{album}</p>
              <Button
                className="btn-select"
                size="sm"
                variant="outline-primary"
                onClick={onClick}
              >
                {children}  
              </Button>{' '}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Playlist;

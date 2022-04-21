import { Button } from 'react-bootstrap';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setToken } from '../../../reducer/reducer';
import './auth.css';

const CLIENT_ID = '33fd8c5db56e475dad870b2fda5e970b';
const REDIRECT_URI = 'https://gigih-spotify-8gxoteiwj-dinarfairus.vercel.app/';
const SCOPE = 'playlist-modify-private';

export default function Auth() {
  const dispatch = useDispatch();

  const auth = () => {
    const url = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}&response_type=token&show_dialog=true`;
    window.location = url;
  };

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem('token');

    if (!token && hash) {
      token = hash
        .substring(1)
        .split('&')
        .find((elem) => elem.startsWith('access_token'))
        .split('=')[1];

      window.location.hash = '';
      window.localStorage.setItem('token', token);
    }

    dispatch(setToken(token));
  });

  return (
    <div className="center-login">
      <Button variant="primary" onClick={auth}>
        Login
      </Button>
    </div>
  );
}

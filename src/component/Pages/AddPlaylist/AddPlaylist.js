import React from 'react'
import FormPlaylist from './FormPlaylist';
import { useEffect, useState } from "react";

function AddPlaylist() {

  const CLIENT_ID = "f6d537bb5a8e46a497dc65fd3f3d71d4"
  const REDIRECT_URI = "http://localhost:3000"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const SCOPE = 'playlist-modify-private'
  const RESPONSE_TYPE = "token"
  const [userAccessToken, setToken] = useState("")

  useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")

    if (!token && hash) {
      token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

      window.location.hash = ""
      window.localStorage.setItem("token", token)
    }

    setToken(token)

  }, [])

  return (
    <div>
      <header className="App-header">

        {userAccessToken ?
          <FormPlaylist/>
          : <div></div>
        }
        {!userAccessToken ?
          <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`}>Login
            to Spotify</a>
          : <div></div>}



      </header>
    </div>

  );

}

export default AddPlaylist
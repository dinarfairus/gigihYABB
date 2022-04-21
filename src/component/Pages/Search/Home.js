import React from 'react';
import './Search.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { setToken } from '../../../reducer/reducer';
import Playlist from '../Home/Playlist';

function Home() {

  const [search, setSearch] = useState('');
  const [isTrack, setTrack] = useState([]);
  const [selected, setSelected] = useState([]);
  const [combine, setCombine] = useState([]);

  const { token } = useSelector((state) => state.auth);

  const dispatch = useDispatch((state) => state.auth);

  const [user, setUser] = useState([]);

  const [playlist, setPlaylist] = useState([]);

  const [input, setInput] = useState({
    title: '',
    description: '',
  });

  // console.log(token);
  useEffect(() => {
    const getUser = async () => {
      const response = await fetch('https://api.spotify.com/v1/me', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => data);
      setUser(response);
    };
    getUser();
  }, [token]);

  // menginput playlist dari api
  const createPlaylist = (e) => {
    e.preventDefault();
    fetch(`https://api.spotify.com/v1/users/${user.id}/playlists`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        name: input.title,
        description: input.description,
        public: false,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setPlaylist(data);
        console.log(data);
      });
  };

  const searchAlbums = async (e) => {
    e.preventDefault();
    const { data } = await axios.get('https://api.spotify.com/v1/search', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: search,
        type: 'track',
      },
    });

    setTrack(data.tracks.items);
  };

  const handleSelect = (track) => {
    const index = selected.find((item) => item.id === track.id);
    if (index) {
      setSelected(selected.filter((item) => item.id !== track.id));
      console.log(selected);
    } else {
      setSelected([...selected, track]);
    }
  };

  useEffect(() => {
    const combine = isTrack.map((item) => ({
      ...item,
      isSelected: selected.find((t) => t.id === item.id),
    }));
    setCombine(combine);
  }, [selected, isTrack]);

  const itemList = () => {
    return combine.map((item) => (
      <Playlist
        key={item.id}
        url={item.album.images[0].url}
        title={item.name}
        artist={item.artists[0].name}
        album={item.album.name}
        onClick={() => handleSelect(item)}
      >

        {isTrack.isSelected ? 'Deselect' : 'Select'}

      </Playlist>
    ));
  };

  const logout = () => {
    dispatch(setToken(''));
    window.localStorage.removeItem('token');
  };

  const handlePlaylist = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };


  //console.log(selected);
  return (
    <div className="App">
      <header className="App-header">
        <h1>Spotify</h1>
        <div className="header">
          <Button className="btnLogout" variant="danger" onClick={logout}>
            Logout
          </Button>
        </div>

        {/* For Form Create Playlist */}
        <div className="container pt-5">
          <div className="row justify-content-sm-center pt-5">
            <div className="col-sm-6 shadow round pb-3">
              <h1 className="text-center pt-3 text-secondary">Create Playlist</h1>
              <form onSubmit={createPlaylist} >
                <div className="form-group">
                  <label className="col-form-label">Title:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    placeholder="write a title"
                    value={playlist.title}
                    onChange={handlePlaylist}
                    maxLength={10}
                  />
                </div>
                <div className="form-group">
                  <label className="col-form-label">Desciption:</label>
                  <textarea
                    type="text"
                    className="form-control"
                    placeholder="write a description"
                    value={playlist.description}
                    onChange={handlePlaylist}
                  />
                </div>
                <Button
                  className="btnSubmit"
                  as="input"
                  type="submit"
                  value="Submit"
                />{' '}
              </form>
            </div>
          </div>
        </div>

        {/* For Search Bar */}
        <div className="search">
          <Form style={{ width: '20rem' }} onSubmit={searchAlbums}>
            <Form.Control
              type="text"
              placeholder="Search Your Music"
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button
              className="btnSearch"
              as="input"
              type="submit"
              value="Search"
            />{' '}
          </Form>
        </div>

        {/* Track List */}
        <h1> Track List</h1>
        <div className="albums">
          {selected.map((item) => (
            <Playlist
              key={item.id}
              url={item.album.images[0].url}
              title={item.name}
              artist={item.artists[0].name}
              album={item.album.name}
            />
          ))}
        </div>

        {/* Render ItemList for Selected album  */}
        <div>
          {itemList()}
        </div>

      </header>
    </div>

  );
}

export default Home;

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


  console.log(selected);
  return (
    <div className="App">
      <header className="App-header">
        <h1>Spotify API</h1>
        <div className="header">
          <Button className="btnLogout" variant="danger" onClick={logout}>
            Logout
          </Button>
        </div>

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
        <div>{itemList()}</div>
      </header>
    </div>

  );
}

export default Home;

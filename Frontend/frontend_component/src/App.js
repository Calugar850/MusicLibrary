import React from 'react';
import './App.css';
import Home from './Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ArtistList from "./ArtistList";
import CreateUpdateArtist from "./CreateUpdateArtist";
import AlbumList from "./AlbumList";
import CreateUpdateAlbum from "./CreateUpdateAlbum";
import SongList from "./SongList";
import CreateUpdateSong from "./CreateUpdateSong";
import ArtistAlbums from "./ArtistAlbums";
import AlbumSongs from "./AlbumSongs";

function App() {
  return (
      <Router>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/artists" element={<ArtistList/>}/>
          <Route exact path="/artist/:id" element={<CreateUpdateArtist/>}/>
          <Route exact path="/artist/album/:artistId" element={<CreateUpdateAlbum/>}/>
          <Route exact path="/albums" element={<AlbumList/>}/>
          <Route exact path="/album/:id" element={<CreateUpdateAlbum/>}/>
          <Route exact path="/album/song/:albumId" element={<CreateUpdateSong/>}/>
          <Route exact path="/song/:id" element={<CreateUpdateSong/>}/>
          <Route exact path="/songs" element={<SongList/>}/>
          <Route exact path="/artist/albums/:artistId" element={<ArtistAlbums/>}/>
          <Route exact path="/album/songs/:albumId" element={<AlbumSongs/>}/>
        </Routes>
      </Router>
  );
}

export default App;

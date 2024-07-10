import React, { useEffect, useState } from 'react';
import { Button, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import {Link, useParams} from 'react-router-dom';
import {ReactSearchAutocomplete} from "react-search-autocomplete";

const AlbumSongs = () => {
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchString, setSearchString] = useState('');

    const { albumId } = useParams();

    useEffect(() => {
        setLoading(true);

        fetch(`https://localhost:44359/api/Song/getAllSongsForAlbum/?albumId=${albumId}`)
            .then(response => response.json())
            .then(data => {
                setSongs(data);
                setLoading(false);
            });

    }, []);

    const handleSearch = (string, results) => {
        setSearchString(string);
    }

    const handleClear = () => {
        setSearchString('');
    };


    if (loading) {
        return <p>Loading...</p>;
    }

    const filteredSongs = searchString.length > 0 ?
        songs.filter(song => song.title.toLowerCase().includes(searchString.toLowerCase())) :
        songs;

    const songsList = filteredSongs.map(song => {
        return <tr key={song.id}>
            <td style={{ whiteSpace: 'nowrap' }}>{song.title}</td>
            <td>{song.length}</td>
        </tr>;
    });

    return (
        <div>
            <AppNavbar />
            <Container fluid>
                <h3>Songs</h3>
                <ReactSearchAutocomplete
                    items={songs}
                    onSearch={handleSearch}
                    onClear={handleClear}
                    autoFocus
                    placeholder="Search Songs..."
                    fuseOptions={{ keys: ["title"] }} // Search in the 'title' key
                    resultStringKeyName="title" // Display 'title' in the dropdown
                />
                <Table className="mt-4">
                    <thead>
                    <tr>
                        <th width="20%">Title</th>
                        <th>Length</th>
                    </tr>
                    </thead>
                    <tbody>
                    {songsList}
                    </tbody>
                </Table>
                <Button color="secondary" tag={Link} to="/albums">Back</Button>
            </Container>
        </div>
    );
};

export default AlbumSongs;
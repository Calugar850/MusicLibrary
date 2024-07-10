import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link, useNavigate } from 'react-router-dom';
import {ReactSearchAutocomplete} from "react-search-autocomplete";
import Snackbar from "@mui/material/Snackbar";

const SongList = () => {
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchString, setSearchString] = useState('');
    const [message, setMessage] = useState('');
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        setLoading(true);

        fetch('https://localhost:44359/api/Song/getAllSongs')
            .then(response => response.json())
            .then(data => {
                setSongs(data);
                setLoading(false);
            });

    }, []);

    const remove = async (id) => {
        await fetch(`https://localhost:44359/api/Song/removeSong/?id=${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedSongs = [...songs].filter(i => i.id !== id);
            setSongs(updatedSongs);
            setOpen(true);
            setMessage("The song was deleted");
        }).catch(() =>{
            setMessage("Error on delete song")
        });
    };

    const handleSearch = (string, results) => {
        setSearchString(string);
    }

    const handleClear = () => {
        setSearchString('');
    };

    const handleCloseSnackbar = (event, reason) => {
        setOpen(false);
        setTimeout(() => {
        }, 1000);
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
            <td>
                <ButtonGroup>
                    <Button size="sm" color="warning" tag={Link} to={"/song/" + song.id}>Edit</Button>
                    <Button size="sm" color="danger" onClick={() => remove(song.id)}>Delete</Button>
                </ButtonGroup>
            </td>
        </tr>;
    });

    return (
        <div>
            <AppNavbar />
            <Container fluid>
                <div className="float-end">
                    <Button color="success" tag={Link} to="/song/new">Add Song</Button>
                </div>
                <h3>All Songs</h3>
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
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {songsList}
                    </tbody>
                </Table>
                <Button color="secondary" tag={Link} to="/">Back</Button>
                <Snackbar
                    open={open}
                    autoHideDuration={1000}
                    message={message}
                    onClose={handleCloseSnackbar}
                />
            </Container>
        </div>
    );
};

export default SongList;
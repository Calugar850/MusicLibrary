import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link, useNavigate } from 'react-router-dom';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import Snackbar from '@mui/material/Snackbar';

const AlbumList = () => {
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchString, setSearchString] = useState('');
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = useState('')

    let navigate = useNavigate();

    useEffect(() => {
        setLoading(true);

        fetch('https://localhost:44359/api/Album/getAllAlbums')
            .then(response => response.json())
            .then(data => {
                setAlbums(data);
                setLoading(false);
            });

    }, []);

    const remove = async (id) => {
        await fetch(`https://localhost:44359/api/Album/removeAlbum/?id=${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedAlbums = [...albums].filter(i => i.id !== id);
            setAlbums(updatedAlbums);
            setOpen(true);
            setMessage("The album was deleted");
        }).catch(() =>{
            setMessage("Error on delete album")
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

    const filteredAlbums = searchString.length > 0 ?
        albums.filter(album => album.title.toLowerCase().includes(searchString.toLowerCase())) :
        albums;

    const albumList = filteredAlbums.map(album => {
        return <tr key={album.id}>
            <td style={{whiteSpace: 'nowrap'}}>{album.title}</td>
            <td>{album.description}</td>
            <td>
                <ButtonGroup>
                    <Button size="sm" color="warning" tag={Link} to={"/album/" + album.id}>Edit</Button>
                    <Button size="sm" color="danger" onClick={() => remove(album.id)}>Delete</Button>
                    <Button size="sm" color="info" tag={Link} to={"/album/song/" + album.id}>Add Song</Button>
                    <Button size="sm" color="primary" tag={Link} to={"/album/songs/" + album.id}>See All Songs</Button>
                </ButtonGroup>
            </td>
        </tr>;
    });

    return (
        <div>
            <AppNavbar />
            <Container fluid>
                <div className="float-end">
                    <Button color="success" tag={Link} to="/album/new">Add Album</Button>
                </div>
                <h3>All Albums</h3>
                <ReactSearchAutocomplete
                    items={albums}
                    onSearch={handleSearch}
                    onClear={handleClear}
                    autoFocus
                    placeholder="Search Albums..."
                    fuseOptions={{ keys: ["title"] }} // Search in the 'title' key
                    resultStringKeyName="title" // Display 'title' in the dropdown
                />
                <Table className="mt-4">
                    <thead>
                    <tr>
                        <th width="20%">Title</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {albumList}
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

export default AlbumList;

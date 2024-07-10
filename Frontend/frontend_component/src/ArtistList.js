import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import {Link, useNavigate} from 'react-router-dom';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import Snackbar from "@mui/material/Snackbar";

const ArtistList = () => {
    const[artists, setArtists] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchString, setSearchString] = useState('');
    const [message, setMessage] = useState('');
    const [open, setOpen] = React.useState(false);

    let navigate = useNavigate();

    useEffect(() => {
        setLoading(true);

        fetch('https://localhost:44359/api/Artist/getAllArtists')
            .then(response => response.json())
            .then(data => {
                setArtists(data);
                setLoading(false);
            })

    }, []);

    const remove = async (id) => {
        await fetch(`https://localhost:44359/api/Artist/removeArtist/?id=${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedArtists = [...artists].filter(i => i.id !== id);
            setArtists(updatedArtists);
            setOpen(true);
            setMessage("The artist was deleted");
        }).catch(() =>{
            setMessage("Error on delete artist")
        });
    }

    const handleCloseSnackbar = (event, reason) => {
        setOpen(false);
        setTimeout(() => {
        }, 1000);
    };

    const handleSearch = (string, results) => {
        setSearchString(string);
    }

    const handleClear = () => {
        setSearchString('');
    };


    if(loading){
        return <p>Loading...</p>
    }

    const filteredArtists = searchString.length > 0 ?
        artists.filter(artist => artist.name.toLowerCase().includes(searchString.toLowerCase())) :
        artists;

    const artistsList = filteredArtists.map(group => {
        return <tr key={group.id}>
            <td style={{whiteSpace: 'nowrap'}}>{group.name}</td>
            <td>
                <ButtonGroup>
                    <Button size="sm" color="warning" tag={Link} to={"/artist/" + group.id}>Edit</Button>
                    <Button size="sm" color="danger" onClick={() => remove(group.id)}>Delete</Button>
                    <Button size="sm" color="info" tag={Link} to={"/artist/album/" + group.id}>Add Album</Button>
                    <Button size="sm" color="primary" tag={Link} to={"/artist/albums/" + group.id}>See All Albums</Button>
                </ButtonGroup>
            </td>
        </tr>
    });

    return (
        <div>
            <AppNavbar/>
            <Container fluid>
                <div className="float-end">
                    <Button color="success" tag={Link} to="/artist/new">Add Artist</Button>
                </div>
                <h3>Artists</h3>
                <ReactSearchAutocomplete
                    items={artists}
                    onSearch={handleSearch}
                    onClear={handleClear}
                    autoFocus
                    placeholder="Search Artists..."
                />
                <Table className="mt-4">
                    <thead>
                    <tr>
                        <th width="20%">Name</th>
                    </tr>
                    </thead>
                    <tbody>
                    {artistsList}
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

export default ArtistList;
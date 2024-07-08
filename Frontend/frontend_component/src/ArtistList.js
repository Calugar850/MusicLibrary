import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import {Link, useNavigate} from 'react-router-dom';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

const ArtistList = () => {
    const[artists, setArtists] = useState([]);
    const [loading, setLoading] = useState(false);

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
        });
    }

    if(loading){
        return <p>Loading...</p>
    }

    const artistsList = artists.map(group => {
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
            </Container>
        </div>
    );

};

export default ArtistList;
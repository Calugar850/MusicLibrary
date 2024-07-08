import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link, useNavigate } from 'react-router-dom';

const AlbumList = () => {
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(false);

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
        });
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    const albumList = albums.map(album => {
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
            </Container>
        </div>
    );
};

export default AlbumList;

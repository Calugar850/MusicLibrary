import React, { useEffect, useState } from 'react';
import { Button, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import {Link, useParams} from 'react-router-dom';

const AlbumList = () => {
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(false);

    const { artistId } = useParams();

    useEffect(() => {
        setLoading(true);
        console.log(artistId);

        fetch(`https://localhost:44359/api/Album/getAllAlbumsForArtist/?artistId=${artistId}`)
            .then(response => response.json())
            .then(data => {
                setAlbums(data);
                setLoading(false);
            });

    }, []);


    if (loading) {
        return <p>Loading...</p>;
    }

    const albumList = albums.map(album => {
        return <tr key={album.id}>
            <td style={{whiteSpace: 'nowrap'}}>{album.title}</td>
            <td>{album.description}</td>
        </tr>;
    });

    return (
        <div>
            <AppNavbar />
            <Container fluid>
                <h3>Albums</h3>
                <Table className="mt-4">
                    <thead>
                    <tr>
                        <th width="20%">Title</th>
                        <th>Description</th>
                    </tr>
                    </thead>
                    <tbody>
                    {albumList}
                    </tbody>
                </Table>
                <Button color="secondary" tag={Link} to="/artists">Back</Button>
            </Container>
        </div>
    );
};

export default AlbumList;

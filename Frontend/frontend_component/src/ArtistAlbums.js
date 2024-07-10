import React, { useEffect, useState } from 'react';
import { Button, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import {Link, useParams} from 'react-router-dom';
import {ReactSearchAutocomplete} from "react-search-autocomplete";

const AlbumList = () => {
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchString, setSearchString] = useState('');

    const { artistId } = useParams();

    useEffect(() => {
        setLoading(true);

        fetch(`https://localhost:44359/api/Album/getAllAlbumsForArtist/?artistId=${artistId}`)
            .then(response => response.json())
            .then(data => {
                setAlbums(data);
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

    const filteredAlbums = searchString.length > 0 ?
        albums.filter(album => album.title.toLowerCase().includes(searchString.toLowerCase())) :
        albums;

    const albumList = filteredAlbums.map(album => {
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

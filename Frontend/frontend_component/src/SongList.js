import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link, useNavigate } from 'react-router-dom';

const SongList = () => {
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(false);

    let navigate = useNavigate();

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
        });
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    const songsList = songs.map(song => {
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
            </Container>
        </div>
    );
};

export default SongList;
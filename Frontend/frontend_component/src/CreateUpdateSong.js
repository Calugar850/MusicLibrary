import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

const CreateUpdateSong = () => {
    const initialFormState = {
        title: '',
        length: '',
        albumId: '',
    };

    const [song, setSong] = useState(initialFormState);
    const navigate = useNavigate();
    const { id } = useParams();
    const { albumId } = useParams();

    useEffect(() => {
        if (id !== 'new' && albumId === undefined) {
            fetch(`https://localhost:44359/api/Song/getSongById/?id=${id}`)
                .then(response => response.json())
                .then(data => setSong(data));
        }
    }, [id, setSong]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setSong({ ...song, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(albumId) {
            song.albumId = albumId;
        }
        await fetch('https://localhost:44359/api/Song/' + (song.id ? 'updateSong' : 'createSong'), {
            method: (song.id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(song)
        });
        setSong(initialFormState);
        navigate('/songs');
    };

    const title = <h2>{song.id ? 'Edit Song' : 'Add Song'}</h2>;

    return (
        <div>
            <AppNavbar />
            <Container>
                {title}
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="title">Title</Label>
                        <Input type="text" name="title" id="title" value={song.title || ''}
                               onChange={handleChange} autoComplete="title" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="length">Length</Label>
                        <Input type="text" name="length" id="length" value={song.length || ''}
                               onChange={handleChange} autoComplete="length" />
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>{' '}
                        <Button color="secondary" tag={Link} to="/songs">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    );
};

export default CreateUpdateSong;

import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

const CreateUpdateAlbum = () => {
    const initialFormState = {
        title: '',
        description: '',
        artistid: '',
    };

    const [album, setAlbum] = useState(initialFormState);
    const navigate = useNavigate();
    const { id,  } = useParams();
    const { artistId } = useParams();

    useEffect(() => {
        if (id !== 'new' && artistId === undefined) {
            fetch(`https://localhost:44359/api/Album/getAlbumById/?id=${id}`)
                .then(response => response.json())
                .then(data => setAlbum(data));
        }
    }, [id, setAlbum]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setAlbum({ ...album, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(artistId) {
            album.artistid = artistId;
        }else{
            album.artistid = null;
        }
        await fetch('https://localhost:44359/api/Album/' + (album.id ? 'updateAlbum' : 'createAlbum'), {
            method: (album.id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(album)
        });
        setAlbum(initialFormState);
        artistId ? navigate('/albums') : navigate('artists/');
    };

    const title = <h2>{album.id ? 'Edit Album' : 'Add Album'}</h2>;

    return (
        <div>
            <AppNavbar />
            <Container>
                {title}
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="title">Title</Label>
                        <Input type="text" name="title" id="title" value={album.title || ''}
                               onChange={handleChange} autoComplete="title" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="description">Description</Label>
                        <Input type="text" name="description" id="description" value={album.description || ''}
                               onChange={handleChange} autoComplete="description" />
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>
                        <Button color="secondary" tag={Link} to="/albums">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    );
};

export default CreateUpdateAlbum;

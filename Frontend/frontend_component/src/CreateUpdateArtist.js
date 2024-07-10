import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';
import Snackbar from "@mui/material/Snackbar";

const CreateUpdateArtist = () => {
    const initialFormState = {
        name: '',
    };

    const[artist, setGroup] = useState(initialFormState);
    const navigate = useNavigate();
    const { id } = useParams();
    const [message, setMessage] = useState('');
    const [open, setOpen] = React.useState(false);

    useEffect(() =>{
        if(id !== 'new'){
            fetch(`https://localhost:44359/api/Artist/getArtistById/?id=${id}`)
                .then(response => response.json())
                .then(data => setGroup(data));
        }
    }, [id, setGroup]);

    const handleChange = (event) => {
        const { name, value } = event.target

        setGroup({ ...artist, [name]: value })
    }

    const handleCloseSnackbar = (event, reason) => {
        setOpen(false);
        setTimeout(() => {
        }, 1000);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await fetch('https://localhost:44359/api/Artist/' + (artist.id ?  'updateArtist' : 'createArtist'), {

            method: (artist.id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(artist)
        }).then(() => {
            setOpen(true);
        }).catch(() => {
            setMessage("Unexpected error!");
        });
        setGroup(initialFormState);
        navigate('/artists');
    }

    const title = <h2>{artist.id ? 'Edit Artist' : 'Add Artist'}</h2>;

    return (<div>
            <AppNavbar/>
            <Container>
                {title}
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input type="text" name="name" id="name" value={artist.name || ''}
                               onChange={handleChange} autoComplete="Name"/>
                    </FormGroup>

                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>{' '}
                        <Button color="secondary" tag={Link} to="/artists">Cancel</Button>
                    </FormGroup>
                </Form>
                <Snackbar
                    open={open}
                    autoHideDuration={1000}
                    message={message}
                    onClose={handleCloseSnackbar}
                />
            </Container>
        </div>
    )

};

export default CreateUpdateArtist;
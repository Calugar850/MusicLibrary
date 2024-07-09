import React from 'react';
import './App.css';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';

const Home = () => {
    return (
        <div>
            <AppNavbar/>
            <Container fluid>
                <Button color="link"><Link to="/artists">See All Artists</Link></Button>
                <Button color="link"><Link to="/albums">See All Albums</Link></Button>
                <Button color="link"><Link to="/songs">See All Songs</Link></Button>
            </Container>
        </div>
    );
}

export default Home;
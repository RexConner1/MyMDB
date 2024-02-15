import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Navbar, NavDropdown, Nav } from 'react-bootstrap';

class Navigation extends Component {
    render() {
        const media = this.props.media
        const properties = this.props.properties

        const updateMedia = (e) => {
            e.preventDefault()
            this.props.setMedia(e.target.innerHTML === properties.movie.displayWord ? properties.movie : properties.show)
            // this.props.history.replace('/path-to-redirect');
        }

        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="/">myMDB</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <NavDropdown title={media.displayWord} id="collasible-nav-dropdown">
                            <NavDropdown.Item onClick={(e) => updateMedia(e)}>{properties.movie.displayWord}</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={(e) => updateMedia(e)}>{properties.show.displayWord}</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <Nav.Link><Link to={media.searchWord}>Search</Link></Nav.Link>
                        <Nav.Link><Link to={media.haveWord + media.searchWord}>My Collection</Link></Nav.Link>
                        <Nav.Link><Link to={media.wantWord + media.searchWord}>Wish List</Link></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default Navigation;
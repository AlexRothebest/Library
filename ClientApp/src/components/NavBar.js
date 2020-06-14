import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    NavLink
} from 'react-router-dom';

import Home from './Home';
import Error404 from './Error404';

import Books from './Book/Books';
import CreateBook from './Book/CreateBook';
import EditBook from './Book/EditBook';
import ReadBook from './Book/ReadBook';

import Collections from './Collection/Collections';
import CreateCollection from './Collection/CreateCollection';
import OpenCollection from './Collection/OpenCollection';
import EditCollection from './Collection/EditCollection';

import Authors from './Author/Authors';
import OpenAuthor from './Author/OpenAuthor';

import Registration from './Auth/Registration';


class Navbar extends Component {
    render = () => {
        return (
            <Router>
                <nav>
                    <ul className="nav-left">
                        <li>
                            <NavLink exact to="/" activeClassName="active">Home</NavLink>
                        </li>
                        <li>
                            <NavLink exact to="/books" activeClassName="active">Books</NavLink>
                        </li>
                        <li>
                            <NavLink exact to="/collections" activeClassName="active">Collections</NavLink>
                        </li>
                        <li>
                            <NavLink exact to="/authors" activeClassName="active">Authors</NavLink>
                        </li>
                    </ul>
                    <ul className="nav-right">
                        {/*
                        <li>
                            <NavLink exact to="/registration" activeClassName="active">Registration</NavLink>
                        </li>
                        <li>
                            <NavLink exact to="/login" activeClassName="active">Login</NavLink>
                        </li>
                        */}
                    </ul>
                </nav>

                <main>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/books" component={Books} />
                        <Route exact path="/books/create" component={CreateBook} />
                        <Route exact path="/books/:bookId/edit" component={EditBook} />
                        <Route exact path="/books/:bookId/read" component={ReadBook} />
                        <Route exact path="/registration" component={Registration} />

                        <Route exact path="/collections" component={Collections} />
                        <Route exact path="/collections/create" component={CreateCollection} />
                        <Route exact path="/collections/:collectionId" component={OpenCollection} />
                        <Route exact path="/collections/:collectionId/edit" component={EditCollection} />

                        <Route exact path="/authors" component={Authors} />
                        <Route exact path="/authors/:authorId" component={OpenAuthor} />

                        <Route path="/" component={Error404} />
                    </Switch>
                </main>
            </Router>
        )
    }
}


export default Navbar;
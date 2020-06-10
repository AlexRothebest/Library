import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    NavLink
} from 'react-router-dom';

import Home from './Home';
import Books from './Books';
import CreateBook from './CreateBook';
import EditBook from './EditBook';
import ReadBook from './ReadBook';

import Registration from './Registration';

import Error404 from './Error404';


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
                    </ul>
                    <ul className="nav-right">
                        <li>
                            <NavLink exact to="/registration" activeClassName="active">Registration</NavLink>
                        </li>
                        <li>
                            <NavLink exact to="/login" activeClassName="active">Login</NavLink>
                        </li>
                    </ul>
                </nav>

                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/books" component={Books} />
                    <Route exact path="/books/create" component={CreateBook} />
                    <Route exact path="/books/:bookId/edit" component={EditBook} />
                    <Route exact path="/books/:bookId/read" component={ReadBook} />
                    <Route exact path="/registration" component={Registration} />

                    <Route path="/" component={Error404} />
                </Switch>
            </Router>
        )
    }
}


export default Navbar;
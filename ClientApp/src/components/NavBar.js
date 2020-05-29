import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';

import Home from './Home'
import Books from './Books'
import CreateBook from './CreateBook'
import EditBook from './EditBook'


class Navbar extends Component {
    render = () => {
        return (
            <Router>
                <nav>
                    <ul>
                        <div className="nav-left">
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/books">Books</Link>
                            </li>
                        </div>
                    </ul>
                </nav>

                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/books" component={Books} />
                    <Route exact path="/books/create" component={CreateBook} />
                    <Route exact path="/books/:bookId/edit" component={EditBook} />
                </Switch>
            </Router>
        )
    }
}


export default Navbar;
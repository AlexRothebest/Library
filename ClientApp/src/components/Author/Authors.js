import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


class Authors extends Component {
    state = {
        authors: [],
        dataLoaded: false
    }

    deleteAuthor = (authorToDeleteId) => {
        if (window.confirm('Are you sure you want to delete this author?')) {
            axios.post('/api/authors/delete', {
                id: authorToDeleteId
            }).then(response => {
                if (!response) return;

                this.setState({
                    authors: this.state.authors.filter(author => author.id !== authorToDeleteId)
                });
            });
        }
    }

    componentDidMount = () => {
        axios.post('/api/authors').then(response => {
            if (!response) return;

            this.setState({
                authors: response.data.authors,
                dataLoaded: true
            });
        });
    }

    render = () => {
        let authors = this.state.authors.map(author => {
            return (
                <tr key={author.id}>
                    <td>
                        {author.name}
                    </td>
                    <td>
                        <Link to={`/authors/${author.id}`}><a className="button blue">View</a></Link>
                        <a onClick={() => this.deleteAuthor(author.id)} className="button red lm">Delete</a>
                    </td>
                </tr>
            )
        });

        return (this.state.dataLoaded) ? (
            (authors.length > 0) ? (
                <div>
                    <div className="flex space-between">
                        <h1>List of authors</h1>
                    </div>

                    <table className="all-width authors-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {authors}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="flex space-between">
                    <h1>No authors</h1>
                </div>
            )
        ) : (
            <div className="flex center">
                <h1>Loading data...</h1>
            </div>
        )
    }
}


export default Authors;
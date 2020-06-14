import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


class Collections extends Component {
    state = {
        collections: [],
        dataLoaded: false
    }

    deleteCollection = (collectionToDeleteId) => {
        if (window.confirm('Are you sure you want to delete this collection?')) {
            axios.post('/api/collections/delete', {
                id: collectionToDeleteId
            }).then(response => {
                if (!response) return;

                this.setState({
                    collections: this.state.collections.filter(collection => collection.id !== collectionToDeleteId)
                });
            });
        }
    }

    componentDidMount = () => {
        axios.post('/api/collections').then(response => {
            if (!response) return;

            this.setState({
                collections: response.data.collections,
                dataLoaded: true
            });
        });
    }

    render = () => {
        let collections = this.state.collections.map(collection => {
            return (
                <tr key={collection.id}>
                    <td>
                        {collection.name}
                    </td>
                    <td>
                        <Link to={`/collections/${collection.id}`}><a className="button blue">Open</a></Link>
                        <Link to={`/collections/${collection.id}/edit`}><a className="button green lm">Edit</a></Link>
                        <a onClick={() => this.deleteCollection(collection.id)} className="button red lm">Delete</a>
                    </td>
                </tr>
            )
        });

        return (this.state.dataLoaded) ? (
            (collections.length > 0) ? (
                <div>
                    <div className="flex space-between">
                        <h1>List of collections</h1>
                        <Link to="/collections/create">
                            <h3><button className="blue">Add a new collection</button></h3>
                        </Link>
                    </div>

                    <table className="all-width collections-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {collections}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div>
                    <div className="flex space-between">
                        <h1>No collections</h1>
                        <Link to="/collections/create">
                            <h3><button className="blue">Add a new collection</button></h3>
                        </Link>
                    </div>
                </div>
            )
        ) : (
                <div className="flex center">
                    <h1>Loading collections...</h1>
                </div>
            )
    }
}


export default Collections;
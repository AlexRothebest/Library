import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';


class CreateCollection extends Component {
    state = {
        isFormSubmitted: false,
        newCollectionId: null
    }

    createNewCollection = (event) => {
        event.preventDefault();

        let form = event.target;

        let name = form.querySelector('input[name="name"]').value;

        console.log(name);

        axios.post('/api/collections/create', {
                name: name
        }).then(response => {
            this.setState({
                isFormSubmitted: true,
                newCollectionId: response.data.collectionId
            });
        });
    }

    render = () => {
        return (this.state.isFormSubmitted) ? (
            <Redirect to={`/collections/${this.state.newCollectionId}/edit`} />
        ) : (
            <div>
                <h1>Add a new collection</h1>

                <form onSubmit={this.createNewCollection}>
                    <input type="text" name="name" placeholder="Name" required />

                    <button className="tm">Add a collection</button>
                </form>
            </div>
        )
    }
}


export default CreateCollection;
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';


class CreateBook extends Component {
    state = {
        isFormSubmitted: false
    }

    createNewBook = (event) => {
        event.preventDefault();

        let form = event.target;

        let name = form.querySelector('input[name="name"]').value;
        let author = form.querySelector('input[name="author"]').value;

        axios.post('/api/books/create', {
            name: name,
            author: author
        }).then(response => {
            if (!response) return;

            this.setState({
                isFormSubmitted: true
            });
        });
    }

    render = () => {
        return (this.state.isFormSubmitted) ? (
            <Redirect to='/books' />
        ) : (
            <main>
                <h1>Add a new book</h1>

                <form onSubmit={this.createNewBook}>
                    <input type="text" name="name" placeholder="Name" required />
                    <br />
                    <input type="text" name="author" placeholder="Author" required />
                    <br />

                    <button className="tm">Add a book</button>
                </form>
            </main>
        )
    }
}


export default CreateBook;
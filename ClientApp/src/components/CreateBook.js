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
        let formData = new FormData();

        formData.set('name', form.querySelector('input[name="name"]').value);
        formData.set('author', form.querySelector('input[name="author"]').value);
        formData.append('bookFile', form.querySelector('input[name="bookFile"]').files[0]);

        axios({
            method: 'post',
            url: '/api/books/create',
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
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
                    <input type="text" name="author" placeholder="Author" required />
                    <input type="file" accept=".pdf" name="bookFile" placeholder="PDF file with the book" required />

                    <button className="tm">Add a book</button>
                </form>
            </main>
        )
    }
}


export default CreateBook;
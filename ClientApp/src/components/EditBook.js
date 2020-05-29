import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';


class EditBook extends Component {
    state = {
        isBookToEditLoaded: null,
        bookToEdit: null,
        isFormSubmitted: false
    }

    editBook = (event) => {
        event.preventDefault();

        let form = event.target;

        let name = form.querySelector('input[name="name"]').value;
        let author = form.querySelector('input[name="author"]').value;

        axios.post('/api/books/edit', {
            id: this.state.bookToEdit.id,
            name: name,
            author: author
        }).then(response => {
            console.log(response);

            this.setState({
                isFormSubmitted: true
            });
        });
    }

    componentDidMount = () => {
        axios.get(`/api/books/${this.props.match.params.bookId}`).then(response => {
            this.setState({
                bookToEdit: response.data.book,
                isBookToEditLoaded: true
            });
        });
    }

    render = () => {
        return (this.state.isFormSubmitted) ? (
            <Redirect to='/books' />
        ) : (
            (this.state.isBookToEditLoaded) ? (
                <main>
                    <h1>Edit a book</h1>

                    <form onSubmit={this.editBook}>
                        <input type="text" name="name" placeholder="Name" defaultValue={this.state.bookToEdit.name} required />
                        <br />
                        <input type="text" name="author" placeholder="Author" defaultValue={this.state.bookToEdit.author} required />
                        <br />

                        <button className="tm">Edit a book</button>
                    </form>
                </main>
            ) : (
                <main>
                    <h1>Loading book data...</h1>
                </main>
            )
        )
    }
}


export default EditBook;
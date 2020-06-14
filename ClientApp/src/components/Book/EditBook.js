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

        axios.post('/api/books/edit', {
            id: this.state.bookToEdit.id,
            name: name
        }).then(response => {
            if (!response) return;

            console.log(response);

            this.setState({
                isFormSubmitted: true
            });
        });
    }

    componentDidMount = () => {
        axios.post(`/api/books/${this.props.match.params.bookId}`).then(response => {
            if (!response) return;

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
                <div>
                    <h1>Edit a book</h1>

                    <form onSubmit={this.editBook}>
                        <input type="text" name="name" placeholder="Name" defaultValue={this.state.bookToEdit.name} required />

                        <button className="tm">Edit a book</button>
                    </form>
                </div>
            ) : (
                <div>
                    <h1>Loading book data...</h1>
                </div>
            )
        )
    }
}


export default EditBook;
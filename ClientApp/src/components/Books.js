import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


class Books extends Component {
    state = {
        books: [],
        booksLoaded: false
    }

    deleteBook = (bookToDeleteId) => {
        if (window.confirm('Are you sure you want to delete this book?')) {
            axios.post('/api/books/delete', {
                id: bookToDeleteId
            }).then(response => {
                if (!response) return;

                this.setState({
                    books: this.state.books.filter(book => book.id !== bookToDeleteId)
                });
            });
        }
    }

    componentDidMount = () => {
        axios.post('/api/books').then(response => {
            if (!response) return;

            this.setState({
                books: response.data.books,
                booksLoaded: true
            });
        });
    }

    render = () => {
        let books = this.state.books.map(book => {
            return (
                <tr key={book.id}>
                    <td>
                        {book.name}
                    </td>
                    <td>
                        {book.author}
                    </td>
                    <td>
                        <Link to={`/books/${book.id}/read`}><a className="button blue">Read</a></Link>
                        <Link to={`/books/${book.id}/edit`}><a className="button green lm">Edit</a></Link>
                        <a onClick={() => this.deleteBook(book.id)} className="button red lm">Delete</a>
                    </td>
                </tr>
            )
        });

        return (this.state.booksLoaded) ? (
            (books.length > 0) ? (
                <main>
                    <div className="flex space-between">
                        <h1>List of books</h1>
                        <Link to="/books/create">
                            <h3><button className="blue">Add a new book</button></h3>
                        </Link>
                    </div>

                    <table className="all-width">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Author</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books}
                        </tbody>
                    </table>
                </main>
            ) : (
                <main>
                    <div className="flex space-between">
                        <h1>No books available</h1>
                        <Link to="/books/create">
                            <h3><button className="blue">Add a new book</button></h3>
                        </Link>
                    </div>
                </main>
            )
        ) : (
            <main className="flex center">
                <h1>Loading book info...</h1>
            </main>
        )
    }
}


export default Books;
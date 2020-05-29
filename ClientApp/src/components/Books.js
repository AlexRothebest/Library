import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


class Books extends Component {
    state = {
        books: [],
        booksLoaded: false
    }

    deleteBook = (bookToDeleteId) => {
        console.log(bookToDeleteId);
        if (window.confirm('Are you sure you want to delete this book?')) {
            axios.post('/api/books/delete', {
                id: bookToDeleteId
            });

            this.setState({
                books: this.state.books.filter(book => book.id !== bookToDeleteId)
            });
        }
    }

    componentDidMount = () => {
        axios.get('/api/books').then(response => {
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
                        <a onClick={() => this.deleteBook(book.id)} className="button red rm">Delete</a>
                        <Link to={`/books/${book.id}/edit`}><a className="button green">Edit</a></Link>
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
                        <tbody>
                            <tr>
                                <th>Name</th>
                                <th>Author</th>
                                <th>Actions</th>
                            </tr>
                            {books}
                        </tbody>
                    </table>
                </main>
            ) : (
                <main>
                    <div className="flex space-between">
                        <h1>No books available</h1>
                        <h3><a href="/books/create" className="button blue">Add a new book</a></h3>
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
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


class OpenAuthor extends Component {
    state = {
        authorToEdit: null,
        dataLoaded: null
    }

    deleteBook = (bookToDeleteId) => {
        if (window.confirm('Are you sure you want to delete this book?')) {
            axios.post('/api/books/delete', {
                id: bookToDeleteId
            }).then(response => {
                let author = this.state.authorToEdit;
                author.books = author.books.filter(b => b.id != bookToDeleteId);

                this.setState({
                    authorToEdit: author
                });
            });
        }
    }

    componentDidMount = () => {
        axios.post('/api/authors/get', {
            authorId: this.props.match.params.authorId
        }).then(response => {
            this.setState({
                authorToEdit: response.data.author
            });
        }).then(() => {
            axios.post('/api/authors/get-books', {
                authorId: this.props.match.params.authorId
            }).then(response => {
                let author = this.state.authorToEdit;
                author.books = response.data.books;

                this.setState({
                    authorToEdit: author
                });
            }).then(() => {
                this.setState({
                    dataLoaded: true
                });
            });
        });
    }

    render = () => {
        //let headerBlock = this.state.editNameMode ? (
        //    <form onSubmit={this.editAuthorName}>
        //        <input type="text" name="name" placeholder="Name" defaultValue={this.state.authorToEdit.name} required />

        //        <button className="tm">Change name</button>
        //    </form>
        //) : (
        //    <h1>Author "{this.state.author.name}"</h1>
        //)

        return (this.state.dataLoaded) ? (
            <div>
                <h1 className="inline">Author "{this.state.authorToEdit.name}"</h1>

                {
                    (this.state.authorToEdit.books.length > 0) ? (
                        <div>
                            <div className="flex space-between">
                                <h1>List of books</h1>
                            </div>

                            <table className="all-width books-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.authorToEdit.books.map(book =>
                                            <tr key={book.id}>
                                                <td>
                                                    {book.name}
                                                </td>
                                                <td>
                                                    <Link to={`/books/${book.id}/read`}><a className="button blue">Read</a></Link>
                                                    <Link to={`/books/${book.id}/edit`}><a className="button green lm">Edit</a></Link>
                                                    <a onClick={() => this.deleteBook(book.id)} className="button red lm">Delete</a>
                                                </td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="flex space-between">
                            <h1>No books</h1>
                        </div>
                    )
                }
            </div>
        ) : (
            <div>
                <h1>Loading data...</h1>
            </div>
        )
    }
}


export default OpenAuthor;
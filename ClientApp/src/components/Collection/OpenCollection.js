import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


class OpenCollection extends Component {
    state = {
        collectionToEdit: null,
        dataLoaded: null
    }

    deleteBook = (bookToDeleteId) => {
        if (window.confirm('Are you sure you want to delete this book?')) {
            axios.post('/api/books/delete', {
                id: bookToDeleteId
            }).then(response => {
                let collection = this.state.collectionToEdit;
                collection.books = collection.books.filter(b => b.id != bookToDeleteId);

                this.setState({
                    collectionToEdit: collection
                });
            });
        }
    }

    componentDidMount = () => {
        axios.post('/api/collections/get', {
            collectionId: this.props.match.params.collectionId
        }).then(response => {
            this.setState({
                collectionToEdit: response.data.collection
            });
        }).then(() => {
            axios.post('/api/collections/get-books', {
                collectionId: this.props.match.params.collectionId
            }).then(response => {
                let collection = this.state.collectionToEdit;
                collection.books = response.data.books;

                this.setState({
                    collectionToEdit: collection
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
        //    <form onSubmit={this.editCollectionName}>
        //        <input type="text" name="name" placeholder="Name" defaultValue={this.state.collectionToEdit.name} required />

        //        <button className="tm">Change name</button>
        //    </form>
        //) : (
        //    <h1>Collection "{this.state.collection.name}"</h1>
        //)

        return (this.state.dataLoaded) ? (
            <div>
                <h1 className="inline">Collection "{this.state.collectionToEdit.name}"</h1>

                {
                    (this.state.collectionToEdit.books.length > 0) ? (
                        <div>
                            <div className="flex space-between">
                                <h1>List of books</h1>
                            </div>

                            <table className="all-width books-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        {/*<th>Author</th>*/}
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.collectionToEdit.books.map(book =>
                                            <tr key={book.id}>
                                                <td>
                                                    {book.name}
                                                </td>
                                                {/*
                                                <td>
                                                    {book.author}
                                                </td>
                                                */}
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
                        <div>
                            <div className="flex space-between">
                                <h1>No books in collection</h1>
                                <Link to={`/collections/${this.state.collectionToEdit.id}/edit`}>
                                    <h3><button className="blue">Add books to collection</button></h3>
                                </Link>
                            </div>
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


export default OpenCollection;
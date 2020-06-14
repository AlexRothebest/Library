import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


class EditCollection extends Component {
    state = {
        collectionToEdit: null,
        books: [],
        dataLoaded: null,
        editNameMode: false
    }

    editCollectionName = (event) => {
        event.preventDefault();

        let form = event.target;

        let name = form.querySelector('input[name="name"]').value;

        axios.post('/api/collections/edit', {
            id: this.state.collectionToEdit.id,
            name: name,
        }).then(response => {
            let collection = this.state.collectionToEdit;
            collection.name = name;

            this.setState({
                collectionToEdit: collection,
                editNameMode: false
            });
        });
    }

    addBook = (book) => {
        axios.post('/api/collections/add-book', {
            collectionId: this.state.collectionToEdit.id,
            bookId: book.id
        }).then(response => {
            let collection = this.state.collectionToEdit;
            collection.books.push(book);

            this.setState({
                collectionToEdit: collection
            });
        });
    }

    removeBook = (book) => {
        axios.post('/api/collections/remove-book', {
            collectionId: this.state.collectionToEdit.id,
            bookId: book.id
        }).then(response => {
            let collection = this.state.collectionToEdit;
            collection.books = collection.books.filter(b => b.id != book.id);

            this.setState({
                collectionToEdit: collection
            });
        });
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
                axios.post('/api/books').then(response => {
                    console.log(response);

                    this.setState({
                        books: response.data.books
                    });
                }).then(() => {
                    this.setState({
                        dataLoaded: true
                    });
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
                {
                    (this.state.editNameMode) ? (
                        <form onSubmit={this.editCollectionName}>
                            <input type="text" name="name" placeholder="Name" className="inline" defaultValue={this.state.collectionToEdit.name} autoFocus required />

                            <button className="tm lm">Change name</button>
                        </form>
                    ) : (
                        <h1 className="inline">Collection "<a onClick={() => this.setState({ editNameMode: true })}>{this.state.collectionToEdit.name}</a>"</h1>
                    )
                }

                {
                    (this.state.books.length > 0) ? (
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
                                        this.state.books.map(book =>
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
                                                    {
                                                        (this.state.collectionToEdit.books.filter(b => b.id == book.id).length == 0) ? (
                                                            <a onClick={() => this.addBook(book)} className="button blue">Add</a>
                                                        ) : (
                                                            <a onClick={() => this.removeBook(book)} className="button red">Remove</a>
                                                        )
                                                    }
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
                                <h1>No books added yet</h1>
                                <Link to="/books/create">
                                    <h3><button className="blue">Add a new book</button></h3>
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


export default EditCollection;
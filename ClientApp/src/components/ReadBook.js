import React, { PureComponent, Component } from 'react';
import { PDFDownloadLink, Document, Page } from 'react-pdf';
import axios from 'axios';


class ReadBook extends PureComponent {
    state = {
        isBookLoaded: null,
        book: null
    }

    componentDidMount = () => {
        axios.post(`/api/books/${this.props.match.params.bookId}`).then(response => {
            if (!response) return;

            this.setState({
                book: response.data.book,
                isBookLoaded: true
            });
        });
    }

    render = () => {
        return this.state.isBookLoaded ? (
            <main className="all-height">
                {/*<iframe src={`/BookCatalog/${this.state.book.fileName}`} />*/}
                <Document
                    file={`/BookCatalog/${this.state.book.fileName}`}
                    onLoadSuccess={() => console.log('dpfkkgdfeogidfkk')}>
                    onLoadError={(error) => console.log(error)}>
                    <Page pageNumber={1} />
                </Document>
                {/*<PDFDownloadLink fileName={`/BookCatalog/${this.state.book.fileName}`} />*/}
            </main>
        ) : (
            <main>
                <h1>Loading book...</h1>
            </main>
        );
    }
}


export default ReadBook;
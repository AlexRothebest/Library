import React, { PureComponent, Component } from 'react';
import { PDFDownloadLink, Document, Page, PDFReader } from 'react-pdf';
import pdf2base64 from 'pdf-to-base64';
import axios from 'axios';


class ReadBook extends Component {
    state = {
        isBookLoaded: null,
        book: null,
        bookBase64: null
    }

    componentDidMount = () => {
        axios.post(`/api/books/${this.props.match.params.bookId}`).then(response => {
            if (!response) return;

            this.setState({
                book: response.data.book,
                isBookLoaded: true
            });


            //pdf2base64(`https://localhost:5001/BookCatalog/${this.state.book.fileName}`)
            //    .then(response => {
            //        this.setState({
            //            bookBase64: response
            //        });
            //    });
        });
    }

    render = () => {
        return this.state.isBookLoaded ? (
            <div>
                <div className="book-info-container">
                    <h1>{this.state.book.name}</h1>
                    <h3>{this.state.book.author}</h3>
                </div>

                <iframe src={`/BookCatalog/${this.state.book.fileName}`} />
                {/*<Document file={`data:application/pdf;base64,${this.state.bookBase64}`}>
                    {/*
                    onLoadSuccess={() => console.log('dpfkkgdfeogidfkk')}>
                    onLoadError={(error) => {
                        console.log('gfbhkgfhkgflghklgfkgflh');
                        console.log(error);
                    }
                    }
                    
                    <Page pageNumber={1} />
                </Document>*/}
                {/*<PDFDownloadLink fileName={`/BookCatalog/${this.state.book.fileName}`} />*/}

                {/*<div style={{maxWidth: '300px'}}>
                    <PDFReader
                        url={`/BookCatalog/${this.state.book.fileName}`}
                        page={1} />
                </div>*/}
            </div>
        ) : (
            <div>
                <h1>Loading book...</h1>
            </div>
        );
    }
}


export default ReadBook;
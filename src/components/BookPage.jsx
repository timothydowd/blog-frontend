import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export class BookPage extends Component {

    state = {
        book: {},
        isLoaded: false

    }

    componentDidMount() {
        axios.get(`/wp-json/wp/v2/books/${this.props.match.params.id}`)
        .then(res => this.setstate({
            book: res.data,
            isLoaded: true
        }))
        .catch(err => console.log(err))
    }

    render() {
        
        if(this.state.isLoaded){
            return (
                <Fragment>
                    <Link to='/'>Go Back</Link>
                    <hr />
                    <h1>{this.state.book.tite.rendered}</h1>
                    <div dangerouslySetInnerHTML={{ __html: this.state.book.content.rendered }}>
                    <h4>Publisher: { this.state.book.acf.publisher }</h4>

                    </div>
                    
                    
                </Fragment>
            )
        }
        
    }
}

export default BookPage

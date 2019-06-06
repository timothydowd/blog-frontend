import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import PropTypes from 'prop-types'

export class BookItem extends Component {
    static propTypes = {
        book: PropTypes.object.isRequired
    }
    state = {
        imageUrl: '',
        author: '',
        isLoaded: false
    }

    componentDidMount() {

        const getImageUrl = axios.get(`/wp-json/wp/v2/media/${this.props.book.featured_media}`).catch((error) => {
            console.log('image error: ',error)
        })
        const getAuthor = axios.get(`/wp-json/wp/v2/users/${this.props.book.author}`)
        
        Promise.all([getImageUrl, getAuthor])
        .then((resArray) => {
            console.log('sdsddsd',resArray[0])
            
            if(resArray[0]){
                this.setState({
                    imageUrl: resArray[0].data.media_details.sizes.full.source_url,
                    author: resArray[1].data.name,
                    isLoaded: true
                })
            }
            else {
                this.setState({
                    imageUrl: '',
                    author: resArray[1].data.name,
                    isLoaded: true
                })
            }
            
        })
    }

    render() {
        const { title, excerpt } = this.props.book

        if(this.state.isLoaded){
            console.log('imageurls: ',this.state.imageUrl)
            return (
                <div>
                    <h2 style={{marginBottom: '0'}}>
                        {title.rendered}
                    </h2>
                    <small>Review by { this.state.author }</small>
                    <img style={{width: '100%'}} src={this.state.imageUrl} alt={this.props.book.title.rendered}></img>
                    <div dangerouslySetInnerHTML={{ __html: excerpt.rendered }} />

                    <Link to={`/book/${this.props.book.id}`}>Read Review</Link>
                    <hr />
                </div>
            )
        }

        return null;
        
    }
}

export default BookItem

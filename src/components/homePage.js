import React from 'react'
import { Link } from 'react-router-dom'
import Shelf from './shelf'

export default function HomePage(props) {
    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div >
            <div className="list-books-content">
                <div>
                    <Shelf title="Currently Reading" shelf_key="currentlyReading" {...props}/>
                    <Shelf title="Want to Read" shelf_key="wantToRead" {...props}/>
                    <Shelf title="Read" shelf_key="read" {...props}/>
                </div>
            </div>
            <div className="open-search">
                <Link to="/search">
                    <button>Add a book</button>
                </Link>
            </div>
        </div >
    )
}

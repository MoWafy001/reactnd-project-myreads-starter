import React from 'react'

export default function Shelf({title, shelf_key, books, updateBooks}) {
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{title}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.filter(book => book.shelf === shelf_key).map(book => (
                        <li key={book.id}>
                            <div className="book">
                                <div className="book-top">
                                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.thumbnail}")` }}></div>
                                    <div className="book-shelf-changer">
                                        <select value={book.shelf} onChange={(e) => updateBooks(e, book)}>
                                            <option value="move" disabled>Move to...</option>
                                            <option value="currentlyReading">Currently Reading</option>
                                            <option value="wantToRead">Want to Read</option>
                                            <option value="read">Read</option>
                                            <option value="none">None</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="book-title">{book.title}</div>
                                {book.authors ? book.authors.map(author => (
                                    <div key={author} className="book-authors">{author}</div>
                                )) : <div className="book-authors">unkown</div>}
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    )
}

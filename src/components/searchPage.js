import React from 'react'

const SearchPage = ({ handelSearch, query, queriedBooks, updateBooks }) => {
    return (
        <div className="search-books">
            <div className="search-books-bar">
                <button className="close-search" onClick={() => { window.history.back() }}>Close</button>
                <div className="search-books-input-wrapper">
                    <input onChange={handelSearch} type="text" value={query} placeholder="Search by title or author" />

                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                    {queriedBooks.length !== 0 ? queriedBooks.map(book => (
                        <li key={book.id}>
                            <div className="book">
                                <div className="book-top">
                                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks && book.imageLinks.thumbnail}")` }}></div>
                                    <div className="book-shelf-changer">
                                        <select value={book.shelf || 'none'} onChange={(e) => updateBooks(e, book)}>
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
                                    <div className="book-authors">{author}</div>
                                )): <div className="book-authors">unkown</div>}
                            </div>
                        </li>
                    )) : query === '' ? "" : "Found Nothing"}
                </ol>
            </div>
        </div>
    )
}

export default SearchPage;
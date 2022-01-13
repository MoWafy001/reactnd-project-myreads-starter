import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: [],
    query: "",
    queriedBooks: []
  }

  constructor() {
    super();
    BooksAPI.getAll()
      .then(data => this.setState({ books: data }))

  }

  updateBooks = (e, book) => {
    const oldStateBooks = this.state.books // in case the update fails

    if (oldStateBooks.includes(book)) {
      if(e.target.value !== 'none'){
        const newBooks = this.state.books.map(b => b === book ? { ...book, shelf: e.target.value } : b)
        this.setState({ books: newBooks })
      }else{
        const newBooks = this.state.books.filter(b => b !== book)
        this.setState({ books: newBooks })
      }
    }else if(e.target.value !== 'none'){
      book.shelf = e.target.value
      let newBooks = this.state.books
      newBooks.push(book)
      this.setState({books:newBooks})
    }

    BooksAPI.update(book, e.target.value).catch(() => {
      this.setState({ books: oldStateBooks })
    })
  }

  handelSearch = (e) => {
    const query = e.target.value
    this.setState({ query })

    if (query !== '')
      BooksAPI.search(query)
        .then(books => {
          if (!books.error && this.state.query !== '')
            this.setState({ queriedBooks: books });
          else
            this.setState({ queriedBooks: [] });
        })
    else
      this.setState({ queriedBooks: [] })
  }

  render() {
    return (
      <div className="app">

        <Routes>
          {/* Search */}
          <Route path="/search" element={
            <div className="search-books">
              <div className="search-books-bar">
                <button className="close-search" onClick={() => { window.history.back() }}>Close</button>
                <div className="search-books-input-wrapper">
                  <input onChange={this.handelSearch} type="text" value={this.state.query} placeholder="Search by title or author" />

                </div>
              </div>
              <div className="search-books-results">
                <ol className="books-grid">
                  {this.state.queriedBooks.length !== 0 ? this.state.queriedBooks.map(book => (
                    <li key={book.id}>
                      <div className="book">
                        <div className="book-top">
                          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks && book.imageLinks.thumbnail}")` }}></div>
                          <div className="book-shelf-changer">
                            <select value='move' onChange={(e) => this.updateBooks(e, book)}>
                              <option value="move" disabled>Move to...</option>
                              <option value="currentlyReading">Currently Reading</option>
                              <option value="wantToRead">Want to Read</option>
                              <option value="read">Read</option>
                              <option value="none">None</option>
                            </select>
                          </div>
                        </div>
                        <div className="book-title">{book.title}</div>
                        <div className="book-authors">{book.authors ? book.authors[0] : 'unknown'}</div>
                      </div>
                    </li>
                  )): this.state.query===''?"":"Found Nothing"}
                </ol>
              </div>
            </div>
          } />

          {/* Root */}
          <Route exact path="/" element={
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div >
              <div className="list-books-content">
                <div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Currently Reading</h2>
                    <div className="bookshelf-books">
                      <ol className="books-grid">
                        {this.state.books.filter(book => book.shelf === "currentlyReading").map(book => (
                          <li key={book.id}>
                            <div className="book">
                              <div className="book-top">
                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.thumbnail}")` }}></div>
                                <div className="book-shelf-changer">
                                  <select value='move' onChange={(e) => this.updateBooks(e, book)}>
                                    <option value="move" disabled>Move to...</option>
                                    <option value="currentlyReading">Currently Reading</option>
                                    <option value="wantToRead">Want to Read</option>
                                    <option value="read">Read</option>
                                    <option value="none">None</option>
                                  </select>
                                </div>
                              </div>
                              <div className="book-title">{book.title}</div>
                              <div className="book-authors">{book.authors[0]}</div>
                            </div>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Want to Read</h2>
                    <div className="bookshelf-books">
                      <ol className="books-grid">
                        {this.state.books.filter(book => book.shelf === "wantToRead").map(book => (
                          <li key={book.id}>
                            <div className="book">
                              <div className="book-top">
                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.thumbnail}")` }}></div>
                                <div className="book-shelf-changer">
                                  <select value='move' onChange={(e) => this.updateBooks(e, book)}>
                                    <option value="move" disabled>Move to...</option>
                                    <option value="currentlyReading">Currently Reading</option>
                                    <option value="wantToRead">Want to Read</option>
                                    <option value="read">Read</option>
                                    <option value="none">None</option>
                                  </select>
                                </div>
                              </div>
                              <div className="book-title">{book.title}</div>
                              <div className="book-authors">{book.authors[0]}</div>
                            </div>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Read</h2>
                    <div className="bookshelf-books">
                      <ol className="books-grid">
                        {this.state.books.filter(book => book.shelf === "read").map(book => (
                          <li key={book.id}>
                            <div className="book">
                              <div className="book-top">
                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.thumbnail}")` }}></div>
                                <div className="book-shelf-changer">
                                  <select value='move' onChange={(e) => this.updateBooks(e, book)}>
                                    <option value="move" disabled>Move to...</option>
                                    <option value="currentlyReading">Currently Reading</option>
                                    <option value="wantToRead">Want to Read</option>
                                    <option value="read">Read</option>
                                    <option value="none">None</option>
                                  </select>
                                </div>
                              </div>
                              <div className="book-title">{book.title}</div>
                              <div className="book-authors">{book.authors[0]}</div>
                            </div>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
              <div className="open-search">
                <Link to="/search">
                  <button>Add a book</button>
                </Link>
              </div>
            </div >
          } />
        </Routes>

      </div>
    )
  }
}

export default BooksApp

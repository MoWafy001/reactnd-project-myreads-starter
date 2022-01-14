import React from 'react'
import { Routes, Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchPage from './components/searchPage'
import HomePage from './components/homePage'

class BooksApp extends React.Component {
  state = {
    books: [],
    query: "",
    queriedBooks: []
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then(data => this.setState({ books: data }))
  }

  updateBooks = (e, book) => {
    const oldStateBooks = this.state.books // in case the update fails

    if (oldStateBooks.includes(book)) {
      if (e.target.value !== 'none') {
        const newBooks = this.state.books.map(b => b === book ? { ...book, shelf: e.target.value } : b)
        this.setState({ books: newBooks })
      } else {
        const newBooks = this.state.books.filter(b => b !== book)
        this.setState({ books: newBooks })
      }
    } else if (e.target.value !== 'none') {
      book.shelf = e.target.value
      let newBooks = this.state.books
      newBooks.push(book)
      this.setState({ books: newBooks })
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
          if (!books.error && this.state.query !== '') { // if all is well

            // check if any of the results are in the home page, and set the shelf if so
            books = books.map(book => {
              const book_from_state = this.state.books.find(b => b.id === book.id)
              if (book_from_state) {
                book.shelf = book_from_state.shelf;
              }
              return book;
            })


            this.setState({ queriedBooks: books });
          } // if there was an error or the query became empty after the search
          else
            this.setState({ queriedBooks: [] });
        })
    else // if the query is empty
      this.setState({ queriedBooks: [] })
  }

  render() {
    return (
      <div className="app">

        <Routes>
          {/* Search */}
          <Route path="/search" element={
            <SearchPage
              handelSearch={this.handelSearch}
              query={this.state.query}
              queriedBooks={this.state.queriedBooks}
              updateBooks={this.updateBooks}
            />
          } />

          {/* Root */}
          <Route path="/" element={
            <HomePage books={this.state.books} updateBooks={this.updateBooks} />
          } />
        </Routes>

      </div>
    )
  }
}

export default BooksApp

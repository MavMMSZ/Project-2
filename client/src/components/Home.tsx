import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Book {
  title: string;
  authors: string[];
  publisher: string;
  description: string;
  imageUrl: string;
  category: string;
}

const BooksList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [categories] = useState<string[]>([
    'Fiction', 'Non-fiction', 'Science', 'History', 'Mystery', 'Fantasy'
  ]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [startIndex, setStartIndex] = useState<number>(0);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null); // Track the selected book for description toggle

  // Function to fetch books from Google Books API
  const fetchBooks = async (category: string = '', index: number = 0) => {
    setLoading(true);
    try {
      const categoryQuery = category ? `+subject:${category}` : '';
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=subject:${categoryQuery}&startIndex=${index}&maxResults=10`
      );

      if (!response.data.items) {
        alert("No books found for this category.");
        setLoading(false);
        return;
      }

      const booksData = response.data.items.map((item: any) => ({
        title: item.volumeInfo.title,
        authors: item.volumeInfo.authors || ['Unknown'],
        publisher: item.volumeInfo.publisher || 'Unknown',
        description: item.volumeInfo.description || 'No description available',
        imageUrl: item.volumeInfo.imageLinks?.thumbnail || '',
        category: item.volumeInfo.categories?.[0] || 'Uncategorized',
      }));

      setBooks(prevBooks => [...prevBooks, ...booksData]); // Append new books to existing list
    } catch (error) {
      console.error('Error fetching books', error);
      alert('Something went wrong. Please try again later.');
    }
    setLoading(false);
  };

  // Fetch books when component is mounted or category changes
  useEffect(() => {
    setStartIndex(0); // Reset to first set of books
    setBooks([]); // Clear the list of books
    fetchBooks(selectedCategory, 0); // Fetch first set of books for the selected category
  }, [selectedCategory]);

  // Function to save books to local storage
  const saveToLocalStorage = (book: Book, list: 'wishlist' | 'readlist') => {
    const storedBooks = JSON.parse(localStorage.getItem(list) || '[]');
    storedBooks.push(book);
    localStorage.setItem(list, JSON.stringify(storedBooks));
    alert(`${book.title} has been added to your ${list}.`);
  };

  // Load more books
  const loadMoreBooks = () => {
    setStartIndex(prevStartIndex => prevStartIndex + 10); // Increment startIndex by 10
    fetchBooks(selectedCategory, startIndex + 10); // Fetch next set of books based on updated startIndex
  };

  // Toggle description visibility for the selected book
  const toggleDescription = (book: Book) => {
    // If the clicked book is already selected, hide its description
    if (selectedBook?.title === book.title) {
      setSelectedBook(null);
    } else {
      setSelectedBook(book); // Show the clicked book's description
    }
  };

  return (
    <div className='book-container' >
      <h1>Random Books</h1>

      {/* Genre filter */}
      <div>
        <label>Choose a genre: </label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Genres</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Loading spinner */}
      {loading && <p>Loading...</p>}

      {/* Book list */}
      <div>
        {books.length === 0 ? (
          <p>No books available. Please try again later.</p>
        ) : (
          <ul className='book-list'>
            {books.map((book, index) => (
              <li  key={index}>
                <div className='book-item book-actions'>
                  <img src={book.imageUrl} alt={book.title} width={150} />
                  <h2>{book.title}</h2>
                  <p><strong>Authors:</strong> {book.authors.join(', ')}</p>
                  <p><strong>Publisher:</strong> {book.publisher}</p>
                  <p><strong>Category:</strong> {book.category}</p>

                  {/* Toggle Description */}
                  <button onClick={() => toggleDescription(book)}>
                    {selectedBook?.title === book.title ? 'Hide Description' : 'Show Description'}
                  </button>

                  {/* Show the description if the book is selected */}
                  {selectedBook?.title === book.title && (
                    <p><strong>Description:</strong> {book.description}</p>
                  )}

                  {/* Buttons to save to wishlist and readlist */}
                  <button onClick={() => saveToLocalStorage(book, 'wishlist')}>Add to Wishlist</button>
                  <button onClick={() => saveToLocalStorage(book, 'readlist')}>Add to Readlist</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Load more button */}
      <div>
        {!loading && books.length > 0 && (
          <button onClick={loadMoreBooks}>Load More</button>
        )}
      </div>
    </div>
  );
};

export default BooksList;

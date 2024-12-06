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
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

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

      setBooks(prevBooks => [...prevBooks, ...booksData]);
    } catch (error) {
      console.error('Error fetching books', error);
      alert('Something went wrong. Please try again later.');
    }
    setLoading(false);
  };

  useEffect(() => {
    setStartIndex(0);
    setBooks([]);
    fetchBooks(selectedCategory, 0);
  }, [selectedCategory]);

  const saveToLocalStorage = (book: Book, list: 'wishlist' | 'readlist') => {
    const storedBooks = JSON.parse(localStorage.getItem(list) || '[]');
    storedBooks.push(book);
    localStorage.setItem(list, JSON.stringify(storedBooks));
    alert(`${book.title} has been added to your ${list}.`);
  };

  const loadMoreBooks = () => {
    setStartIndex(prevStartIndex => prevStartIndex + 10);
    fetchBooks(selectedCategory, startIndex + 10);
  };

  const toggleDescription = (book: Book) => {
    if (selectedBook?.title === book.title) {
      setSelectedBook(null);
    } else {
      setSelectedBook(book);
    }
  };

  return (
    <div>
      <div className="label">
        <label>Choose a genre to display random books:</label>
        <select
          className="options"
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

      {loading && <p>Loading...</p>}

      {books.length === 0 ? (
        <p>No books available. Please try again later.</p>
      ) : (
        <div className="books-grid">
          {books.map((book, index) => (
            <div className="book-card" key={index}>
              <img src={book.imageUrl} alt={book.title} />
              <div className="book-info">
                <h2>{book.title}</h2>
                <p><strong>Authors:</strong> {book.authors.join(', ')}</p>
                <p><strong>Publisher:</strong> {book.publisher}</p>
                <p><strong>Category:</strong> {book.category}</p>
                {selectedBook?.title === book.title && (
                  <p><strong>Description:</strong> {book.description}</p>
                )}
              </div>
              <div className="book-actions">
                <button onClick={() => toggleDescription(book)}>
                  {selectedBook?.title === book.title ? 'Hide Description' : 'Show Description'}
                </button>
                <button onClick={() => saveToLocalStorage(book, 'wishlist')}>Add to Wishlist</button>
                <button onClick={() => saveToLocalStorage(book, 'readlist')}>Add to Readlist</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="load">
        {!loading && books.length > 0 && (
          <button className="loadmore" onClick={loadMoreBooks}>
            Load More Books
          </button>
        )}
      </div>
    </div>
  );
};

export default BooksList;

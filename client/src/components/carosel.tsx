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

  // Function to fetch books from Google Books API
  const fetchBooks = async (category: string = '') => {
    setLoading(true);
    try {
      const categoryQuery = category ? `+subject:${category}` : '';
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=subject:${categoryQuery}&maxResults=10`);
      const booksData = response.data.items.map((item: any) => ({
        title: item.volumeInfo.title,
        authors: item.volumeInfo.authors || ['Unknown'],
        publisher: item.volumeInfo.publisher || 'Unknown',
        description: item.volumeInfo.description || 'No description available',
        imageUrl: item.volumeInfo.imageLinks?.thumbnail || '',
        category: item.volumeInfo.categories?.[0] || 'Uncategorized',
      }));
      setBooks(booksData);
    } catch (error) {
      console.error('Error fetching books', error);
    }
    setLoading(false);
  };

  // Fetch books when component is mounted or category changes
  useEffect(() => {
    fetchBooks(selectedCategory);
  }, [selectedCategory]);

  // Function to save books to local storage
  const saveToLocalStorage = (book: Book, list: 'wishlist' | 'readlist') => {
    const storedBooks = JSON.parse(localStorage.getItem(list) || '[]');
    storedBooks.push(book);
    localStorage.setItem(list, JSON.stringify(storedBooks));
    alert(`${book.title} has been added to your ${list}.`);
  };

  return (
    <div>
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
          <ul>
            {books.map((book, index) => (
              <li key={index}>
                <div>
                  <img src={book.imageUrl} alt={book.title} width={80} />
                  <h2>{book.title}</h2>
                  <p><strong>Authors:</strong> {book.authors.join(', ')}</p>
                  <p><strong>Publisher:</strong> {book.publisher}</p>
                  <p><strong>Description:</strong> {book.description}</p>
                  <p><strong>Category:</strong> {book.category}</p>

                  {/* Buttons to save to wishlist and readlist */}
                  <button onClick={() => saveToLocalStorage(book, 'wishlist')}>Add to Wishlist</button>
                  <button onClick={() => saveToLocalStorage(book, 'readlist')}>Add to Readlist</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default BooksList;

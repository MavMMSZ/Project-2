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
  const [books, setBooks] = useState<Book[]>([]); // Stores the list of books
  const [categories, setCategories] = useState<string[]>([
    'Fiction', 'Non-fiction', 'Science', 'History', 'Mystery', 'Fantasy'
  ]);
  const [selectedCategory, setSelectedCategory] = useState<string>(''); // Current selected category
  const [loading, setLoading] = useState<boolean>(false); // Loading state for API requests
  const [startIndex, setStartIndex] = useState<number>(0); // Tracks the start index for pagination

  // Function to fetch books from Google Books API
  const fetchBooks = async (category: string = '', startIndex: number = 0) => {
    setLoading(true);
    try {
      const categoryQuery = category ? `+subject:${category}` : '';
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=subject:${categoryQuery}&startIndex=${startIndex}&maxResults=10`
      );
      const booksData = response.data.items.map((item: any) => ({
        title: item.volumeInfo.title,
        authors: item.volumeInfo.authors || ['Unknown'],
        publisher: item.volumeInfo.publisher || 'Unknown',
        description: item.volumeInfo.description || 'No description available',
        imageUrl: item.volumeInfo.imageLinks?.thumbnail || '',
        category: item.volumeInfo.categories?.[0] || 'Uncategorized',
      }));
      setBooks(prevBooks => [...prevBooks, ...booksData]); // Append new books to the existing list
    } catch (error) {
      console.error('Error fetching books', error);
    }
    setLoading(false);
  };

  // Fetch books when component is mounted or category changes
  useEffect(() => {
    setStartIndex(0); // Reset to the first set of books
    setBooks([]); // Clear the current list of books before fetching new ones
    fetchBooks(selectedCategory, 0);
  }, [selectedCategory]);

  // Function to handle the "Load More" button click
  const loadMoreBooks = () => {
    setStartIndex(prevStartIndex => prevStartIndex + 10); // Increment the start index by 10
    fetchBooks(selectedCategory, startIndex + 10); // Fetch the next 10 books
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
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Load More button */}
      <div>
        {!loading && books.length > 0 && (
          <button onClick={loadMoreBooks}>Load More</button>
        )}
      </div>
    </div>
  );
};

export default BooksList;

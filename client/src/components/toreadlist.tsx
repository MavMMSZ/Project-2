import React, { useState, useEffect } from 'react';

interface Book {
  title: string;
  authors: string[];
  publisher: string;
  description: string;
  imageUrl: string;
  category: string;
}

const ReadlistPage: React.FC = () => {
  const [readlist, setReadlist] = useState<Book[]>([]);

  // Function to load books from the readlist in localStorage
  const loadReadlistFromLocalStorage = () => {
    const savedReadlist = JSON.parse(localStorage.getItem('readlist') || '[]');
    setReadlist(savedReadlist);
  };

  // Function to remove a book from the readlist
  const removeFromReadlist = (bookToRemove: Book) => {
    const updatedReadlist = readlist.filter(book => book.title !== bookToRemove.title);
    localStorage.setItem('readlist', JSON.stringify(updatedReadlist)); // Update localStorage
    setReadlist(updatedReadlist); // Update state
  };

  // Load the readlist when the component mounts
  useEffect(() => {
    loadReadlistFromLocalStorage();
  }, []);

  return (
    <div>
      <h1>Your Readlist</h1>

      {/* If readlist is empty */}
      {readlist.length === 0 ? (
        <p>Your readlist is empty. Add some books to the readlist first!</p>
      ) : (
        <ul>
          {readlist.map((book, index) => (
            <li key={index}>
              <div>
                <img src={book.imageUrl} alt={book.title} width={80} />
                <h2>{book.title}</h2>
                <p><strong>Authors:</strong> {book.authors.join(', ')}</p>
                <p><strong>Publisher:</strong> {book.publisher}</p>
                <p><strong>Description:</strong> {book.description}</p>
                <p><strong>Category:</strong> {book.category}</p>

                {/* Remove button */}
                <button onClick={() => removeFromReadlist(book)}>Remove from Readlist</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReadlistPage;

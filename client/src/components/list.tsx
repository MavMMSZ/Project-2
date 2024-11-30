import React, { useState, useEffect } from 'react';

interface Book {
  title: string;
  authors: string[];
  publisher: string;
  description: string;
  imageUrl: string;
  category: string;
}

const WishlistPage: React.FC = () => {
  const [wishlist, setWishlist] = useState<Book[]>([]);

  // Function to load books from the readlist in localStorage
  const loadWishlistFromLocalStorage = () => {
    const savedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setWishlist(savedWishlist);
  };

  // Function to remove a book from the readlist
  const removeFromWishlist = (bookToRemove: Book) => {
    const updatedWishlist = wishlist.filter(book => book.title !== bookToRemove.title);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist)); // Update localStorage
    setWishlist(updatedWishlist); // Update state
  };

  // Load the readlist when the component mounts
  useEffect(() => {
    loadWishlistFromLocalStorage();
  }, []);

  return (
    <div>
      <h1>Your Readlist</h1>

      {/* If readlist is empty */}
      {wishlist.length === 0 ? (
        <p>Your readlist is empty. Add some books to the readlist first!</p>
      ) : (
        <ul>
          {wishlist.map((book, index) => (
            <li key={index}>
              <div>
                <img src={book.imageUrl} alt={book.title} width={80} />
                <h2>{book.title}</h2>
                <p><strong>Authors:</strong> {book.authors.join(', ')}</p>
                <p><strong>Publisher:</strong> {book.publisher}</p>
                <p><strong>Description:</strong> {book.description}</p>
                <p><strong>Category:</strong> {book.category}</p>

                {/* Remove button */}
                <button onClick={() => removeFromWishlist(book)}>Remove from Wishlist</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WishlistPage;

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

  // Function to load books from the wishlist in localStorage
  const loadWishlistFromLocalStorage = () => {
    const savedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setWishlist(savedWishlist);
  };

  // Function to remove a book from the wishlist
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
      

      {/* If wishlist is empty */}
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty. Add some books to the wishlist first!</p>
      ) : (
        <ul className='books-container'>
          {wishlist.map((book, index) => (
            <li className=' book-card random-card' key={index}>
            <div className='book-item'>
                <img src={book.imageUrl} alt={book.title}  style={{ height: "200px", objectFit: "none" }} width={80} />
              <div className='book-info' >
                <h2>{book.title}</h2>
                <p><strong>Authors:</strong> {book.authors.join(', ')}</p>
                <p><strong>Publisher:</strong> {book.publisher}</p>
                <p><strong>Description:</strong> {book.description}</p>
                <p><strong>Category:</strong> {book.category}</p>

                {/* <div className="mt-auto"> */}
                {/* Remove button */}
               </div> 
                  <button className='book-action' onClick={() => removeFromWishlist(book)}>Remove from Wishlist</button>
                {/* </div> */}

              
                
            </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WishlistPage;

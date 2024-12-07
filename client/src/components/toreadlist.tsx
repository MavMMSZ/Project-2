import React, { useState, useEffect } from 'react';

interface Review {
  content: string;
  date: string;
}

interface Book {
  title: string;
  authors: string[];
  publisher: string;
  description: string;
  imageUrl: string;
  category: string;
  reviews?: Review[];
}

const ReadlistPage: React.FC = () => {
  const [readlist, setReadlist] = useState<Book[]>([]);
  const [reviewInput, setReviewInput] = useState<{ [key: string]: string }>({});

  // Function to load books from the readlist in localStorage
  const loadReadlistFromLocalStorage = () => {
    const savedReadlist = JSON.parse(localStorage.getItem('readlist') || '[]');
    setReadlist(savedReadlist);
  };

  const saveReadlistToLocalStorage = (updatedReadlist: Book[]) => {
    localStorage.setItem('readlist', JSON.stringify(updatedReadlist));
  };

  const handleAddReview = (bookTitle: string) => {
    const updatedReadlist = readlist.map((book) => {
      if (book.title === bookTitle) {
        const newReview: Review = {
          content: reviewInput[bookTitle] || '',
          date: new Date().toISOString(),
        };
        return {
          ...book,
          reviews: [...(book.reviews || []), newReview],
        };
      }
      return book;
    });
    setReadlist(updatedReadlist);
    saveReadlistToLocalStorage(updatedReadlist);
    setReviewInput({ ...reviewInput, [bookTitle]: '' }); // Reset input field for this book
  };

  const handleReviewInputChange = (e: React.ChangeEvent<HTMLInputElement>, bookTitle: string) => {
    setReviewInput({ ...reviewInput, [bookTitle]: e.target.value });
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
      {readlist.length === 0 ? (
        <p>Your readlist is empty. Add some books to the readlist first!</p>
      ) : (
        <ul className='books-container'>
          {readlist.map((book, index) => (
            <li className=' book-card random-card' key={index}>
              <div className='book-item'>
                <img  src={book.imageUrl} alt={book.title}  style={{ height: "200px", objectFit: "none" }} width={80} />
            <div className='book-info'> 
                <h2 >{book.title}</h2>
                <p><strong>Authors:</strong> {book.authors.join(', ')}</p>
                <p><strong>Publisher:</strong> {book.publisher}</p>
                <p><strong>Description:</strong> {book.description}</p>
                <p><strong>Category:</strong> {book.category}</p>
            </div>
                

                {/* Remove button */}
                <button className='book-action' onClick={() => removeFromReadlist(book)}>Remove from Readlist</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
};

export default ReadlistPage;

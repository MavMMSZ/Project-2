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
     

      {/* If readlist is empty */}
      {readlist.length === 0 ? (
        <p>Your readlist is empty. Add some books to the readlist first!</p>
      ) : (
        <ul className='container py-4'>
          {readlist.map((book, index) => (
            <li className='column g-3' key={index}>
              <div className="card h-100 shadow-sm">
                <img src={book.imageUrl} alt={book.title} className="card-img-top img-fluid" style={{ height: "200px", objectFit: "none" }} width={80} />
            <div className="card-body d-flex flex-column"> 
                <h2 >{book.title}</h2>
                <p><strong>Authors:</strong> {book.authors.join(', ')}</p>
                <p><strong>Publisher:</strong> {book.publisher}</p>
                <p><strong>Description:</strong> {book.description}</p>
                <p><strong>Category:</strong> {book.category}</p>
            </div>
                

                {/* Remove button */}
                <button className="btn btn btn-secondary me-2 mb-2" onClick={() => removeFromReadlist(book)}>Remove from Readlist</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReadlistPage;

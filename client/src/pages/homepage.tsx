import BooksList from "../components/Home";
// import '../styles/homepage.css';
// import '../styles/carousel.css';
import Carousel from "../components/carousel";
const Homepage = () => {
  const bookUrl = "https://example.com/book-image.jpg"; // Replace with the actual book image URL from the BookList component

  return (
    <div>
      <h1>Welcome To the Home of Your Favorite Books</h1>
      <div>
        <Carousel bookUrl={BooksList.booksData.imageUrl} />
      </div>
      <BooksList />
    </div>
  );
};

export default Homepage;

import BooksList from "../components/Home";
import '../styles/homepage.css';


const Homepage = () => {
  

  return (
    <div className="welcome">
      <h1>Welcome To the Home of Your Favorite Books</h1>
      
      <BooksList/>
    </div>
  );
};

export default Homepage;

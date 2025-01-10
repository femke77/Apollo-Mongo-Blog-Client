import { Button } from "react-bootstrap";
import BlogList from "../components/BlogList";
import { useNavigate, Link } from "react-router-dom";
import { useLoggedIn } from "../App";

const Home = () => {
  const navigate = useNavigate();
  const [loggedIn] = useLoggedIn();
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <p className="display-6">Latest Blogs....</p>
        {!loggedIn ? (
          <Link to="/login">
            <p className="text-success fs-5">Login in to post a blog!</p>
          </Link>
        ) : (
          <Button className="m-4" onClick={() => navigate("/profile")}>
            Add a Blog
          </Button>
        )}
      </div>

      <BlogList />
    </div>
  );
};

export default Home;

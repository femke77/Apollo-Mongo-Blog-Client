import { Button } from "react-bootstrap";
import BlogList from "../components/BlogList";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { useLoggedIn } from "../App";
import auth from "../utils/auth";

const Home = () => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useLoggedIn();

    if (!auth.loggedIn()){
      setLoggedIn(false);
      return <Navigate to="/login" />;
    }
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

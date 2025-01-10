import { useQuery, useMutation } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import { REMOVE_BLOG } from "../utils/mutations";
import Blog from "../components/Blog";
import { Button } from "react-bootstrap";
import React from "react";
import { IBlog } from "../interfaces/Blog";
import { NavLink } from "react-router-dom";
import AddBlog from "../components/AddBlog";

const Profile = () => {
  const { loading, data, error } = useQuery(GET_ME, {
    fetchPolicy: "cache-and-network", // use cache first, then make network request
  });

  const blogs = data?.me.blogs || [];

  const [deleteBlog] = useMutation(REMOVE_BLOG, {
    refetchQueries: [{ query: GET_ME }], // Refetch the GET_ME query
    awaitRefetchQueries: true, // Wait for the query to complete before resolving the mutation
    // we could also update the cache directly and that would be even more efficient
  });

  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    await deleteBlog({ variables: { blogId: e.currentTarget.value } });
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h3>Add a Blog!</h3>
      <div className="mb-5">
        {" "}
        <AddBlog />
      </div>
      <hr/>
      <h4 className="mb-3">Your previous blogs:</h4>
      {blogs &&
        blogs.map((blog: IBlog) => (
          <div key={blog._id}>
            <Blog
              username={"me"}
              content={blog.content}
              dateCreated={blog.dateCreated}
              title={blog.title}
              _id={blog._id}
              commentCount={blog.commentCount}
            />
            <Button className="my-2 me-3" onClick={handleDelete} value={blog._id} variant="danger">
              Delete
            </Button>
            <NavLink to={`/edit-blog/${blog._id}`}>Edit Blog</NavLink>
            <hr />
          </div>
        ))}
      {error && <div className="text-danger"> {error.message}</div>}
    </div>
  );
};

export default Profile;

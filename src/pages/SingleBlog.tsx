import { useQuery } from "@apollo/client";
import { useParams, Link } from "react-router-dom";
import { GET_BLOG } from "../utils/queries";
import Blog from "../components/Blog";
import { IBlog } from "../interfaces/Blog";
import CommentForm from "../components/CommentForm";
import { useLoggedIn } from "../App";
import utc from "dayjs/plugin/utc";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);


const SingleBlog = () => {
  const { blogId } = useParams();
  const { loading, data, error } = useQuery(GET_BLOG, {
    variables: { blogId: blogId },
  });

  const blog: IBlog = data?.blog || {};
  const [loggedIn] = useLoggedIn();
  if (loading) {
    return <div>Loading...</div>;
  }

  const timezone = dayjs.tz.guess() || 'America/Los_Angeles';


  return (
    <div>
      <Blog
        key={blog._id}
        username={blog.username}
        content={blog.content}
        dateCreated={blog.dateCreated}
        title={blog.title}
        _id={blog._id}
        commentCount={blog.commentCount}
      />
      {loggedIn ?
        (<CommentForm blogId={blogId} />) :
        (<Link to="/login"><p className="text-success fs-5">Login in to post a comment!</p></Link>)}

      {/* TODO implement Comment and CommentList and render here */}

      {blog.comments && blog.comments.length > 0 ? (
        <>
       
          <h6>Comments:</h6>
          {blog.comments &&
            blog.comments.map((comment) => (
              <>
                <hr />
                <div key={comment._id}>
                  <p>{comment.comment}</p>
                  <p>
                    By: {comment.username} on {dayjs.unix(comment.dateCreated as number / 1000).tz(timezone).format('MM/DD/YYYY hh:mm A')}
                  </p>
                </div>
              </>
            ))}
        </>
      ) : (
        <h6>No one has commented yet, be the first!</h6>
      )}

      {error && <div>Error: {error.message}</div>}
    </div>
  );
};

export default SingleBlog;

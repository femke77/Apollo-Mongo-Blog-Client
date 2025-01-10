import type { IBlog } from "../interfaces/Blog";
import { Link, useParams} from "react-router-dom";
import utc from "dayjs/plugin/utc";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);

const Blog = ({
  _id,
  title,
  content,
  username,
  dateCreated,
  commentCount,
}: IBlog) => {

  const { blogId } = useParams();
  // dayjs will attempt to guess the user's timezone, fall back on 'America/Los_Angeles' if guess not successful
  const timezone = dayjs.tz.guess() || 'America/Los_Angeles';
  // server is supplying date in milliseconds, convert to seconds
  const dateInSeconds = dateCreated as number / 1000;
  // convert date to local timezone and format 
  const localDate = dayjs.unix(dateInSeconds).tz(timezone).format('MM/DD/YYYY hh:mm A');


  return (
    <>
      <div>
        {/* don't want a link if it's the single blog view b/c it's just a link to the same page so that's weird
        use params to find out what page we are on and render title accordingly*/}
        {!blogId ? (<Link className="" to={`/blog/${_id}`}>
          {title}{" "}
        </Link>) : (<h5>{title}</h5>)}

        <p>{content}</p>
        <p>
          By: {username} on {localDate}
        </p>
      </div>
      <div>
        <p>Comments: {commentCount} </p>
      </div>
    </>
  );
};

export default Blog;


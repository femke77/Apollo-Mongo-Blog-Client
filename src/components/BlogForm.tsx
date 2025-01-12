import { Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// using this form for both adding and editing a blog which means sometimes we have to prefill the form with the previous values
// and sometimes we don't. 
const BlogForm = ({
  prevTitle = "",
  prevContent = "",
  onSubmitFn, // function has to change between a blog create or a blog update, but will require the data from this component
}: {
  prevTitle?: string;
  prevContent?: string;
  onSubmitFn: (blog: { title: string; content: string }) => Promise<void>;
}) => {
  const navigate = useNavigate();
  const [blog, setBlog] = useState({ title: prevTitle, content: prevContent });

  useEffect(() => {
    setBlog({ title: prevTitle, content: prevContent });
  }, [prevTitle, prevContent]);

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await onSubmitFn(blog);
      setBlog({ title: "", content: "" });
      navigate("/");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          value={blog.title}
          as="input"
          name="title"
          onChange={(e) => setBlog({ ...blog, title: e.target.value })}
        />
      </Form.Group>
      <Form.Group className="my-3">
        <Form.Label>Content</Form.Label>
        <Form.Control
          value={blog.content}
          as="textarea"
          name="content"
          rows={2}
          onChange={(e) => setBlog({ ...blog, content: e.target.value })}
        />
      </Form.Group>
      <Button className="my-3" variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default BlogForm;

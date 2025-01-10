import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_BLOG = gql`
  mutation AddBlog($blogData: BlogInput) {
    addBlog(blogData: $blogData) {
      _id

      comments {
        _id
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($blogId: ID!, $comment: String!) {
    addComment(blogId: $blogId, comment: $comment) {
      _id

      comments {
        _id
      }
    }
  }
`;

export const REMOVE_BLOG = gql`
  mutation RemoveBlog($blogId: ID!) {
    removeBlog(blogId: $blogId) {
      _id

      comments {
        _id
      }
    }
  }
`;

export const EDIT_BLOG = gql`
  mutation EditBlog($blogId: ID!, $title: String!, $content: String!) {
    editBlog(blogId: $blogId, title: $title, content: $content) {
      _id
      username
      title
      content
      dateCreated
      comments {
        _id
        username
        comment
        dateCreated
      }
      commentCount
    }
  }
`;

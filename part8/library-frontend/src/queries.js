import { gql } from "@apollo/client";

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      published
      genres
      author {
        name
      }
    }
  }
`;

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

export const ADD_BOOK = gql`
  mutation createBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
    }
  }
`;

export const EDIT_AUTHOR = gql`
  mutation updateBirthYear($name: String!, $born: Int!) {
    editAuthor(name: $name, born: $born) {
      name
      born
    }
  }
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
      favoriteGenre
    }
  }
`;

export const FAVORITE_GENRES = gql`
  query createQueryForGenre($genre: String) {
    allBooks(genre: $genre) {
      title
      published
      author {
        name
      }
    }
  }
`;

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
    }
  }
`;

import React from "react";
import { useQuery } from "@apollo/client";
import { FAVORITE_GENRES } from "../queries";

export const Recommend = ({ show, favoriteGenre }) => {
  const result = useQuery(FAVORITE_GENRES, {
    variables: { genre: favoriteGenre },
  });
  if (!show) return null;
  console.log(result);
  return (
    <div>
      <h1>recommendations</h1>
      <h3>
        books in your favorite genre <b>{favoriteGenre}</b>
      </h3>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {result.data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

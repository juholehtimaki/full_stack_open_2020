import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";

const Books = (props) => {
  const result = useQuery(ALL_BOOKS);
  const [filter, setFilter] = useState("");

  if (!props.show) {
    return null;
  }

  if (result.loading) return <div>Loading...</div>;

  if (result) console.log(result);

  let genres = [];
  for (let book of result.data.allBooks) {
    console.log(book);
    for (let genre of book.genres) {
      if (!genres.includes(genre)) genres = genres.concat(genre);
    }
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {result.data.allBooks
            .filter((a) => a.genres.includes(filter) || !filter)
            .map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <div>
        {genres.map((genre, index) => (
          <button onClick={() => setFilter(genre)} key={index}>
            {genre}
          </button>
        ))}
        <button onClick={() => setFilter("")}>all genres</button>
      </div>
    </div>
  );
};

export default Books;

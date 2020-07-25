import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";
import Select from "react-select";

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS);

  const [name, setName] = useState("");
  const [bornString, setBornString] = useState("");

  const [updateBirthYear] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      console.log(error);
    },
  });

  const editBirthYear = (e) => {
    console.log("editing birthyear");
    const setBornTo = parseInt(bornString);
    updateBirthYear({
      variables: { name: name, born: setBornTo },
    });
    e.preventDefault();
    setBornString("");
    setName("");
  };

  if (!props.show) {
    return null;
  }

  if (result.loading) return <div>Loading...</div>;

  let options = [];
  for (let author of result.data.allAuthors) {
    let option = { value: author.name, label: author.name };
    options = options.concat(option);
  }

  return (
    <div>
      <div>
        <h2>authors</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>born</th>
              <th>books</th>
            </tr>
            {result.data.allAuthors.map((a) => (
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h1>Set birthyear</h1>
      <form onSubmit={editBirthYear}>
        <div>
          <Select options={options} onChange={(e) => setName(e.value)} />
        </div>
        <div>
          born:{" "}
          <input
            value={bornString}
            onChange={(e) => setBornString(e.target.value)}
          />
        </div>
        <button>Edit</button>
      </form>
    </div>
  );
};

export default Authors;

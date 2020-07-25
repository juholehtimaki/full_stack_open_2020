import React, { useState, useEffect } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { Login } from "./components/Login";
import { useMutation } from "@apollo/client";
import { LOGIN } from "./queries";
import { Recommend } from "./components/Recommend";
import { useSubscription } from "@apollo/client";
import { BOOK_ADDED } from "./queries";

const App = () => {
  const [page, setPage] = useState("authors");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [favoriteGenre, setFavoriteGenre] = useState(null);

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      setFavoriteGenre(result.data.login.favoriteGenre);
      localStorage.setItem("library-token", token);
    }
  }, [result.data]);

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded;
      alert(`${addedBook.title} added`);
    },
  });

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("we got here");
    login({
      variables: { username: name, password: password },
    });
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token && <button onClick={() => setPage("add")}>add book</button>}
        {token && (
          <button onClick={() => setPage("recommend")}>recommend</button>
        )}
        {!token && <button onClick={() => setPage("login")}>login</button>}
        {token && <button onClick={() => setToken("")}>logout</button>}
      </div>

      <Books show={page === "books"} />
      <Authors show={page === "authors"} />
      <NewBook show={page === "add"} />
      <Login
        show={page === "login"}
        name={name}
        setName={setName}
        password={password}
        setPassword={setPassword}
        handleLogin={handleLogin}
      />
      <Recommend show={page === "recommend"} favoriteGenre={favoriteGenre} />
    </div>
  );
};

export default App;

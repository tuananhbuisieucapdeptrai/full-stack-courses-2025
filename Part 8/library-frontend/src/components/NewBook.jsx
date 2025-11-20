/* eslint-disable react/prop-types */
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { ADD_BOOK, ALL_AUTHORS, ALL_BOOKS } from "../queries";

const NewBook = ({ show }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);

  const [createBook, { loading, error }] = useMutation(ADD_BOOK, {
    refetchQueries: [
      { query: ALL_BOOKS },
      { query: ALL_AUTHORS },
    ],
    awaitRefetchQueries: true,
  });

  if (!show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();

    try {
      await createBook({
        variables: {
          title,
          author,
          published: Number(published),
          genres,
        },
      });

      setTitle("");
      setPublished("");
      setAuthor("");
      setGenres([]);
      setGenre("");
    } catch (err) {
      console.error(err);
    }
  };

  const addGenre = () => {
    if (!genre.trim()) {
      return;
    }

    setGenres(genres.concat(genre.trim()));
    setGenre("");
  };

  return (
    <div>
      <h2>add book</h2>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            required
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            required
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
            required
          />
        </div>
        <div>
          genre
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(" ")}</div>
        <button type="submit" disabled={loading}>
          {loading ? "saving..." : "create book"}
        </button>
        {error && <p style={{ color: "red" }}>{error.message}</p>}
      </form>
    </div>
  );
};

export default NewBook;

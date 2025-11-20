/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";

const Authors = ({ show }) => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");
  const result = useQuery(ALL_AUTHORS);

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    awaitRefetchQueries: true,
  });

  useEffect(() => {
    if (result.data?.allAuthors?.length && !name) {
      setName(result.data.allAuthors[0].name);
    }
  }, [result.data, name]);

  if (!show) {
    return null;
  }

  if (result.loading) {
    return <div>loading...</div>;
  }

  if (result.error) {
    return <div>Error loading authors</div>;
  }

  const authors = result.data?.allAuthors ?? [];

  const submit = async (event) => {
    event.preventDefault();
    if (!name || !born) {
      return;
    }

    try {
      await editAuthor({
        variables: {
          name,
          setBornTo: Number(born),
        },
      });
      setBorn("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born ?? "-"}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <div>
          name
          <select value={name} onChange={({ target }) => setName(target.value)}>
            {authors.map((author) => (
              <option key={author.name} value={author.name}>
                {author.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          born
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default Authors;

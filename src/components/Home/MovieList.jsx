import { useEffect, useState } from "react";
import { getAllMovieRows } from "../../services/tmdb.service";
import MovieRow from "./MovieRow";
import Loader from "../Common/Loader";

const RowContainer = () => {
  const [rows, setRows] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllMovieRows()
      .then((data) => {
        setRows(data);
      })
      .catch((err) => {
        console.error("Error fetching rows:", err);
        setError(err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <p className="px-6 py-10 text-sm text-red-500">Failed to load movies</p>
    );
  }

  if (rows.length === 0) {
    return (
      <p className="px-6 py-10 text-sm text-yellow-500">No movies found</p>
    );
  }

  return (
    <main className="flex flex-col">
      {rows.map((row) => (
        <MovieRow key={row.title} row={row} />
      ))}
    </main>
  );
};

export default RowContainer;
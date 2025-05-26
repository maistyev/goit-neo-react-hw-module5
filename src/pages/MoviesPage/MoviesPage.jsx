import { Field, Form, Formik } from "formik";
import { searchMovies } from "../../api/movieApi";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { PacmanLoader } from "react-spinners";
import { useSearchParams } from "react-router-dom";

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchValue = searchParams.get("search") ?? "";

  const handleSubmit = (values) => {
    if (!values.query.trim()) {
      toast.error("Please enter a search query.");
      return;
    }
    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.set("search", values.query);
    setSearchParams(updatedParams);
  };

  useEffect(() => {
    if (!searchValue) return;
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      setMovies([]);
      try {
        const movies = await searchMovies(searchValue);
        setMovies(movies);
        if (movies.length === 0) {
          toast.error("No movies found for your search query.");
        }
      } catch (error) {
        toast.error("Failed to fetch movies. Please try again later.");
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [searchValue]);

  return (
    <>
      <Formik initialValues={{ query: searchValue }} onSubmit={handleSubmit}>
        <Form>
          <Field name="query" placeholder="Search movies..." />
          <button type="submit" disabled={loading}>
            Search
          </button>
        </Form>
      </Formik>
      <PacmanLoader size={50} loading={loading} />
      {!error && !loading && <MovieList movies={movies} />}
    </>
  );
};

export default MoviesPage;

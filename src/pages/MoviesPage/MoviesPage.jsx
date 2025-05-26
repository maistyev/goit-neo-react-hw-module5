import { Field, Form, Formik } from "formik";
import { searchMovies } from "../../api/movieApi";
import toast from "react-hot-toast";
import { useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { PacmanLoader } from "react-spinners";
import Navigation from "../../components/Navigation/Navigation";

const MoviesPage = () => {
  const [error, setError] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    if (!values.query.trim()) {
      toast.error("Please enter a search query.");
      return;
    }
    setLoading(true);
    setError(null);
    setMovies([]);
    try {
      const movies = await searchMovies(values.query);
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
  return (
    <>
      <Navigation />
      <Formik initialValues={{ query: "" }} onSubmit={handleSubmit}>
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

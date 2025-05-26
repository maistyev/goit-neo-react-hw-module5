import { useEffect, useState } from "react";
import { getTrendingMovies } from "../../api/movieApi";
import MovieList from "../../components/MovieList/MovieList";
import Navigation from "../../components/Navigation/Navigation";
import toast from "react-hot-toast";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { PacmanLoader } from "react-spinners";

const HomePage = () => {
  const [error, setError] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const getMovies = async () => {
    try {
      setError(null);
      setMovies([]);
      setLoading(true);
      const movies = await getTrendingMovies();
      setMovies(movies);
    } catch (error) {
      setError(error);
      toast.error("Failed to fetch trending movies. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <>
      <Navigation />
      <PacmanLoader size={50} loading={loading} />
      {!error && !loading && <MovieList movies={movies} />}
      {error && <ErrorMessage />}
    </>
  );
};
export default HomePage;

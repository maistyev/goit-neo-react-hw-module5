import { useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieCast } from "../../api/movieApi";
import toast from "react-hot-toast";

const MovieCast = () => {
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const movieId = useParams().movieId;

  useState(() => {
    const fetchCast = async () => {
      try {
        const data = await getMovieCast(movieId);
        setCast(data);
      } catch (err) {
        setError(err.message);
        toast.error(
          "Failed to fetch cast information. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCast();
  }, [movieId]);

  return (
    <section>
      {loading && <p>Loading cast information...</p>}
      {!loading && cast.length === 0 && !error && (
        <p>No cast information available for this movie.</p>
      )}
      {cast.length > 0 && !loading && !error && (
        <ul>
          {cast.map((actor) => (
            <li key={actor.id}>
              <img
                src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                alt={actor.name}
                width="100"
              />
              <h3>{actor.name}</h3>
              <p>Character: {actor.character}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default MovieCast;

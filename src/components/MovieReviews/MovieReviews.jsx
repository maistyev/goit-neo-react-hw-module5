import { useEffect, useState } from "react";
import { getMovieReviews } from "../../api/movieApi";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const MovieReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const movieId = useParams().movieId;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getMovieReviews(movieId);
        setReviews(data);
      } catch (err) {
        setError(err.message);
        toast.error("Failed to fetch reviews. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [movieId]);

  return (
    <>
      {loading && <p>Loading reviews...</p>}
      {reviews.length === 0 && !loading && !error && (
        <p>No reviews available for this movie.</p>
      )}
      {reviews.length > 0 && !loading && !error && (
        <ul>
          {reviews.map((review) => (
            <li key={review.id}>
              <h3>{review.author}</h3>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default MovieReviews;

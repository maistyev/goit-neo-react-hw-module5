import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import Navigation from "../../components/Navigation/Navigation";
import { BackLink } from "../../components/BackLink/BackLink";
import { useEffect, useRef, useState } from "react";
import { getMovieDetails } from "../../api/movieApi";
import css from "./MovieDetailsPage.module.css";

const MovieDetailPage = () => {
  const { movieId } = useParams();

  const [movie, setMovie] = useState(null);

  const location = useLocation();

  const backLinkLocationRef = useRef(location.state);
  const backLinkHref = backLinkLocationRef.current ?? "/movies";

  useEffect(() => {
    if (!movieId) return;

    const fetchMovieDetails = async () => {
      try {
        const movieData = await getMovieDetails(movieId);
        setMovie(movieData);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  return (
    movie && (
      <div>
        <BackLink to={backLinkHref}>Go back</BackLink>
        <main className={css.movieDetails}>
          <section className={css.movieInfo}>
            <div className={css.moviePoster}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={`${movie.title} poster`}
              />
            </div>

            <div className={css.movieContent}>
              <h1 className={css.movieTitle}>
                {movie.title} ({movie.release_date?.split("-")[0]})
              </h1>

              <div className={css.userScore}>
                User Score: {movie.vote_average * 10}%
              </div>

              <h2 className={css.sectionTitle}>Overview</h2>
              <p className={css.overviewText}>{movie.overview}</p>

              <h3 className={css.sectionTitle}>Genres</h3>
              <div className={css.genresList}>
                {movie.genres.map((genre) => (
                  <span key={genre.id} className={css.genreTag}>
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>
          </section>

          <section className={css.additionalInfo}>
            <h2 className={css.additionalInfoTitle}>Additional information</h2>

            <ul className={css.infoLinks}>
              <li>
                <Link to={`/movies/${movieId}/cast`} className={css.infoLink}>
                  Cast
                </Link>
              </li>
              <li>
                <Link
                  to={`/movies/${movieId}/reviews`}
                  className={css.infoLink}
                >
                  Reviews
                </Link>
              </li>
            </ul>
          </section>
          <section>
            <Outlet />
          </section>
        </main>
      </div>
    )
  );
};

export default MovieDetailPage;

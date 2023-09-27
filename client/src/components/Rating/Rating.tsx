import { Star, StarHalf, StarBorder } from "@mui/icons-material";
import styles from "./Rating.module.scss";

const Rating = (props) => {
  const { rating, numRev } = props;

  return (
    <div className={styles.ratingContainer}>
      <div className={styles.rating}>
        {rating >= 1 ? (
          <Star />
        ) : rating === 0.5 ? (
          <StarHalf />
        ) : (
          <StarBorder />
        )}

        {rating >= 2 ? (
          <Star />
        ) : rating === 1.5 ? (
          <StarHalf />
        ) : (
          <StarBorder />
        )}

        {rating >= 3 ? (
          <Star />
        ) : rating === 2.5 ? (
          <StarHalf />
        ) : (
          <StarBorder />
        )}

        {rating >= 4 ? (
          <Star />
        ) : rating === 3.5 ? (
          <StarHalf />
        ) : (
          <StarBorder />
        )}

        {rating === 5 ? (
          <Star />
        ) : rating === 4.5 ? (
          <StarHalf />
        ) : (
          <StarBorder />
        )}
      </div>

      <span>{numRev} reviews</span>
    </div>
  );
};

export default Rating;

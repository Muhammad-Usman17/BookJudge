//   lib
import React from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import StarRatings from 'react-star-ratings';
import getOr from 'lodash/fp/getOr';
import { connect } from 'react-redux';
//  src
import './BookDetails.css';

const BookDetails = props => {
  const { book } = props;
  if (book) {
    const { title, author, averageRating, image, ratingCount } = book;
    const Rating = isNaN(averageRating) ? 0 : averageRating;

    return title
      ? <div className="Book-div">
          <Card className="Book-card">
            <CardHeader title={title} subheader={author} />
            <CardMedia className="Book-image" image={image} title={title} />
            <CardContent className="Book-content">
              <Typography component="p">
                Book Name : {title}
              </Typography>
              <Typography component="p">
                Written By : {author}
              </Typography>
            </CardContent>
            <Divider />
            <CardContent className="Book-content">
              <Typography component="p">
                Average Rating :
                <StarRatings
                  rating={Rating}
                  starDimension="25px"
                  starSpacing="0"
                  starRatedColor="blue"
                  name="rating"
                />
              </Typography>
              <Typography component="p">
                Rating Count : {ratingCount}
              </Typography>
            </CardContent>
          </Card>
        </div>
      : <p>Book Not Found</p>;
  }

  return (
    <div>
      <center>
        <h1>No Results found</h1>
      </center>
    </div>
  );
};
function mapStateToProps(state, ownProps) {
  const id = getOr(0, 'match.params.id')(ownProps);
  const book = getOr({}, `books.mainReducer.books[${id}]`)(state);
  return {
    book,
  };
}
export default connect(mapStateToProps)(BookDetails);

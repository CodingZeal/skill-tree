import React from "react";

class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: {
        category_id: this.props.category.id,
        developer_id: this.props.user.id,
        mentor_id: this.props.current_user.id,
        score: "#"
      }
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = event => {
    const { rating } = this.state;
    const { addRating } = this.props;

    rating[event.target.name] = parseInt(event.target.value);
    this.setState({ rating });

    addRating(rating);
  };

  render() {
    const { rating } = this.state;
    const { category } = this.props;

    return (
      <div className="category">
        <form className="rank_buttons">
          <button
            name="score"
            value="0"
            onClick={this.handleClick}
            type="button"
          >
            0
          </button>
          <button
            name="score"
            value="1"
            onClick={this.handleClick}
            type="button"
          >
            1
          </button>
          <button
            name="score"
            value="2"
            onClick={this.handleClick}
            type="button"
          >
            2
          </button>
          <button
            name="score"
            value="3"
            onClick={this.handleClick}
            type="button"
          >
            3
          </button>
          <button
            name="score"
            value="5"
            onClick={this.handleClick}
            type="button"
          >
            5
          </button>
          <button
            name="score"
            value="8"
            onClick={this.handleClick}
            type="button"
          >
            8
          </button>
        </form>
        <div>{rating.score}</div>
        <h2 id="category_name"> {category.category_name}</h2>
      </div>
    );
  }
}

export default Category;

import React from "react";

class Category extends React.Component {
  constructor(props) {
    super(props);
    const { category, user, current_user } = this.props;

    this.state = {
      rating: {
        category_id: category.id,
        developer_id: user.id,
        mentor_id: current_user.id,
        score: "#"
      }
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = event => {
    const { rating } = this.state;
    const { addRating } = this.props;

    rating[event.target.name] = parseInt(event.target.value, 10);
    this.setState({ rating });
    addRating(rating);
  };

  render() {
    const { rating } = this.state;
    const { category } = this.props;
    const scores = [
      { className: "zero", value: "0" },
      { className: "one", value: "1" },
      { className: "two", value: "2" },
      { className: "three", value: "3" },
      { className: "five", value: "5" },
      { className: "eight", value: "8" }
    ];
    const buttons = scores.map(v => {
      return (
        <button
          className={v.className}
          key={v.value}
          name="score"
          onClick={this.handleClick}
          type="button"
          value={v.value}
        >
          {v.value}
        </button>
      );
    });

    return (
      <div className="category">
        <form className="rank_buttons">{buttons}</form>
        <div className="score">
          <h2>{rating.score}</h2>
        </div>
        <h1 id="category_name"> {category.category_name}</h1>
      </div>
    );
  }
}

export default Category;

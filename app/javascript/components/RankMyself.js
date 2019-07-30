import React from "react";
import { allCategories, createRating, oneUser } from "./API/api";

import Category from "./Category";

class RankMyself extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      ratings: [],
      user: []
    };
  }

  componentWillMount() {
    this.renderingFunction();
  }

  componentDidUpdate(prevProps) {
    const { match } = this.props;

    if (match.params.id !== prevProps.match.params.id) {
      this.renderingFunction();
    }
  }

  renderingFunction() {
    const { match } = this.props;
    const { id } = match.params;

    oneUser(id).then(APIuser => {
      this.setState({ user: APIuser });
    });
    allCategories().then(APIcategories => {
      this.setState({ categories: APIcategories });
    });
  }

  // adds rating and removes any past duplicates
  addRating = rating => {
    const { ratings } = this.state;
    const ids = ratings.map(r => r.category_id);

    if (ids.includes(rating.category_id)) {
      const id = ids.indexOf(rating.category_id);

      ratings.splice(id, 1);
      ratings.push(rating);
    } else {
      ratings.push(rating);
    }
    this.setState({ ratings });
  };

  handleSubmit = () => {
    const { ratings } = this.state;
    const { token } = this.props;

    ratings.forEach(v => {
      createRating(v, token);
    });
  };

  render() {
    const { categories, user, ratings } = this.state;
    const { current_user } = this.props;
    console.log(ratings);
    const categoryList = categories.map((category, index) => {
      return (
        <Category
          index={index}
          key={category.id}
          category={category}
          current_user={current_user}
          user={user}
          addRating={this.addRating}
        />
      );
    });

    return (
      <div className="rank_myself">
        <h1> Rank A Developer</h1>
        <h3>
          {user.first_name} {user.last_name}
        </h3>
        <div className="card">
          {categoryList}
          <button
            onClick={this.handleSubmit}
            className="rank_submition"
            type="button"
          >
            Submit
          </button>
        </div>
      </div>
    );
  }
}

export default RankMyself;

import React from "react";

import { BrowserRouter as Router, Link } from "react-router-dom";

import { allCategories, createRating, oneUser } from "./API/api";
import Category from "./Category";

class RankMyself extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      ratings: [],
      user: [],
      redirect: false
    };
  }

  componentWillMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    const { match } = this.props;

    if (match.params.id !== prevProps.match.params.id) {
      this.fetchData();
    }
  }

  fetchData() {
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
    const { categories, user } = this.state;
    const { current_user, match } = this.props;

    const redirect = `/profile/${user.id}`;

    const categoryList = categories.map((category, index) => {
      return (
        <Category
          addRating={this.addRating}
          category={category}
          current_user={current_user}
          index={index}
          key={category.id}
          match={match}
          user={user}
        />
      );
    });

    return (
      <div className="rank_myself">
        {(current_user.id === user.id && <h1> Rank Myself</h1>) || (
          <h1> Rank Another Developer</h1>
        )}
        <h3>
          {user.first_name} {user.last_name}
        </h3>
        <div className="card">
          {categoryList}
          <Link
            className="rank_submission"
            onClick={this.handleSubmit}
            to={redirect}
            type="link"
          >
            <h3>Submit</h3>
          </Link>
        </div>
      </div>
    );
  }
}

export default RankMyself;

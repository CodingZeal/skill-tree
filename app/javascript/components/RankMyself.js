import React from "react";
import { allCategories } from "./API/api";
import Category from "./Category";
class RankMyself extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: []
    };
  }
  componentWillMount() {
    allCategories().then(APIcategories => {
      this.setState({ categories: APIcategories });
    });
  }

  render() {
    const { categories } = this.state;
    const categoryList = categories.map((category, index) => {
      return <Category index={index} key={category.id} category={category} />;
    });

    return <div className="card">{categoryList}</div>;
  }
}

export default RankMyself;

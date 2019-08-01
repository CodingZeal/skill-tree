import React from "react";

import AllCategories from "./AllCategories";
import { myLastRating, oneUser } from "./API/api";

class StaticProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myRatings: [],
      user: []
    };
  }

  componentWillMount() {
    this.renderingFunction();
  }

  componentDidUpdate(prevProps) {
    const { match } = this.props;

    if (match.params.unique_url !== prevProps.match.params.unique_url) {
      this.renderingFunction();
    }
  }

  renderingFunction() {
    const { match } = this.props;
    const { unique_url } = match.params;

    oneUser(unique_url).then(APIuser => {
      this.setState({ user: APIuser });
    });
    myLastRating(unique_url).then(APIrating => {
      this.setState({ myRatings: APIrating });
    });
  }

  render() {
    const { user, myRatings } = this.state;

    return (
      <div className="profile">
        <h1 className="card-header">My Profile</h1>
        <div className="card">
          <div className="card-content">
            <h1 className="card-info" id="fullname">
              {user.first_name} {user.last_name}
            </h1>
            <h2 className="card-info" id="email">
              <span aria-label="envelope" role="img">
                {" "}
                ✉️
              </span>{" "}
              {user.email}
            </h2>
            <h2 className="card-info" id="timezone">
              <span aria-label="globe" role="img">
                {" "}
                🌐
              </span>{" "}
              {user.time_zone}
            </h2>
          </div>
          <div className="categories">
            <AllCategories myRatings={myRatings} />
          </div>
        </div>
      </div>
    );
  }
}

export default StaticProfile;

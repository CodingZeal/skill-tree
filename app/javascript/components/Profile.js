import React from "react";

import AllCategories from "./AllCategories";
import { myLastRating, oneUser } from "./API/api";

class Profile extends React.Component {
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
    myLastRating(id).then(APIrating => {
      this.setState({ myRatings: APIrating });
    });
  }

  render() {
    const { user, myRatings } = this.state;
    const { current_user } = this.props;
    // coming from fetch of profile (find where(url = {url}))
    const host = window.location.origin;

    // local host will change on deployment
    const myUrl = `${host}/staticprofile/`;
    const rankUrl = `/rankmyself/${user.id}`;

    return (
      <div className="profile">
        <div className="header-area">
          <h1 className="card-header">My Profile</h1>
          {(current_user.id === user.id && (
            <button className="rank-btn" type="button">
              <a href={rankUrl}> RANK MYSELF </a>
            </button>
          )) || (
            <button className="rank-btn" type="button">
              {" "}
              <a href={rankUrl}> RANK {user.first_name} </a>{" "}
            </button>
          )}
        </div>
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
            <h2 className="card-info" id="url">
              {myUrl}
              <br />
              {user.unique_url}
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

export default Profile;

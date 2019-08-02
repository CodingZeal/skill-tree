import React from "react";

import { BrowserRouter as Router, Link } from "react-router-dom";

import AllCategories from "./AllCategories";
import { myLastRating, oneUser } from "./API/api";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myRatings: [],
      user: [],
      upcaseName: ""
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
      this.setState({
        upcaseName: APIuser.first_name.toUpperCase(),
        user: APIuser
      });
    });
    myLastRating(id).then(APIrating => {
      this.setState({ myRatings: APIrating });
    });
  }

  render() {
    const { user, myRatings, upcaseName } = this.state;
    const { current_user } = this.props;
    // coming from fetch of profile (find where(url = {url}))
    const host = window.location.origin;

    // local host will change on deployment
    const myUrl = `${host}/staticprofile/`;
    const rankUrl = `/rankmyself/${user.id}`;
    const headerName = `${user.first_name}'s`;

    return (
      <div className="profile">
        {(current_user.id === user.id && (
          <div className="header-area">
            <h1 className="card-header">My Profile</h1>
            <Link className="rank-btn-link" to={rankUrl}>
              <h4>RANK MYSELF</h4>
            </Link>
          </div>
        )) || (
          <div className="header-area">
            <h1 className="card-header">{headerName} Profile</h1>
            <Link className="rank-btn-link" to={rankUrl}>
              <h4>RANK {upcaseName}</h4>
            </Link>
          </div>
        )}
        <div className="card">
          <div className="card-content">
            <h1 className="card-info" id="fullname">
              {user.first_name} {user.last_name}
            </h1>
            <h2 className="card-info" id="email">
              <span aria-label="envelope" role="img">
                ✉️
              </span>
              {user.email}
            </h2>
            <h2 className="card-info" id="timezone">
              <span aria-label="globe" role="img">
                🌐
              </span>
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

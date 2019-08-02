import React from "react";

import AllCategories from "./AllCategories";
import ProfileHeader from "./ProfileHeader";
import { myLastRating, oneUser } from "./API/api";
import Avatar from "./avatar.svg";
import Email from "./email.svg";
import Timezone from "./timezone.svg";

class StaticProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myRatings: [],
      user: []
    };
  }

  componentWillMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    const { match } = this.props;

    if (match.params.unique_url !== prevProps.match.params.unique_url) {
      this.fetchData();
    }
  }

  fetchData() {
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
    const { current_user, staticProfile } = this.props;

    return (
      <div className="profile">
        <ProfileHeader
          current_user={current_user}
          user={user}
          staticProfile={staticProfile}
        />
        <div className="card">
          <div className="card-content">
            <img alt="Avatar" className="avatar" src={Avatar} />
            <h1 className="card-info-name" id="fullname">
              {user.first_name} {user.last_name}
            </h1>
            <div className="card-info">
              <img alt="Email-icon" className="email-icon icon" src={Email} />
              <h2 id="email">{user.email}</h2>
            </div>
            <div className="card-info">
              <img
                alt="Timezone-icon"
                className="timezone-icon icon"
                src={Timezone}
              />
              <h2 id="timezone">{user.time_zone}</h2>
            </div>
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

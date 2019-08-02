import React from "react";

import AllCategories from "./AllCategories";
import { myLastRating, oneUser } from "./API/api";
import Avatar from "./avatar.svg";
import Email from "./email.svg";
import ProfileHeader from "./ProfileHeader";
import Timezone from "./timezone.svg";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myRatings: [],
      upcaseName: "",
      user: []
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
    const { current_user, staticProfile } = this.props;
    // coming from fetch of profile (find where(url = {url}))
    const host = window.location.origin;

    // local host will change on deployment
    const myUrl = `${host}/staticprofile/`;
    const rankUrl = `/rankmyself/${user.id}`;
    const headerName = `${user.first_name}'s`;

    return (
      <div className="profile">
        <ProfileHeader
          current_user={current_user}
          user={user}
          staticProfile={staticProfile}
          upcaseName={upcaseName}
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

import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import RankMyself from "./RankMyself";

import Profile from "./Profile";
import StaticProfile from "./StaticProfile";

class Routes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "iou22o38f4"
    };
  }

  render() {
    const { url } = this.state;
    const { current_user } = this.props;

    // builds custom url
    const profUrl = `/profile/${url}`;

    return (
      <Router>
        <Route
          exact
          path="/profile/:id"
          render={props => <Profile {...props} current_user={current_user} />}
        />
        <Route
          exact
          path="/staticprofile/:unique_url"
          render={props => <StaticProfile {...props} />}
        />
        <Route
          exact
          path="/rankmyself/:id"
          render={props => <RankMyself {...props} />}
        />
      </Router>
    );
  }
}

export default Routes;

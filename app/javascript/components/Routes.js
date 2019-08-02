import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Profile from "./Profile";
import RankMyself from "./RankMyself";
import StaticProfile from "./StaticProfile";

function Routes({ current_user, token }) {
  return (
    <Router>
      <Route
        exact
        path="/profile/:id"
        render={props => (
          <Profile
            {...props}
            current_user={current_user}
            staticProfile={false}
          />
        )}
      />
      <Route
        exact
        path="/staticprofile/:unique_url"
        render={props => (
          <StaticProfile {...props} current_user={current_user} staticProfile />
        )}
      />
      <Route
        exact
        path="/rankmyself/:id"
        render={props => (
          <RankMyself {...props} current_user={current_user} token={token} />
        )}
      />
    </Router>
  );
}

export default Routes;

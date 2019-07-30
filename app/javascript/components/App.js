import React from "react";

import Header from "./Header";
import Routes from "./Routes";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      logged_in,
      sign_out_path,
      sign_in_path,
      current_user,
      edit_user
    } = this.props;

    return (
      <div className="app">
        <Header
          current_user={current_user}
          logged_in={logged_in}
          sign_in_path={sign_in_path}
          sign_out_path={sign_out_path}
        />
        <div className="wrapper">
          <Routes current_user={current_user} />
        </div>
      </div>
    );
  }
}

export default App;

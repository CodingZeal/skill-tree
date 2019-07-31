import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";

import AllCategories from "../AllCategories";
import Profile from "../Profile";
import "whatwg-fetch";

Enzyme.configure({ adapter: new Adapter(), disableLifecycleMethods: true });

describe("<Profile>", () => {
  const current_user = {
    id: 1
  };
  const profile = {
    email: "john@example.com",
    firstname: "John",
    id: 1,
    lastname: "Doe",
    timezone: "UTC",
    url: "iou22o38f4"
  };

  const wrapper = shallow(
    <Profile
      match={{ params: { id: 1 } }}
      profile={profile}
      current_user={current_user}
    />
  );

  it("renders corretly", () => {
    expect(wrapper).toMatchSnapshot();
  });
  it("displays user fullname", () => {
    expect(wrapper.find("#fullname").length).toEqual(1);
  });
  it("displays user email", () => {
    expect(wrapper.find("#email").length).toEqual(1);
  });
  it("displays user timezone", () => {
    expect(wrapper.find("#timezone").length).toEqual(1);
  });
  it("displays a unique url", () => {
    expect(wrapper.find("#url").length).toEqual(1);
  });

  it("should render the AllCategories component", () => {
    expect(wrapper.find(AllCategories)).toHaveLength(1);
  });
});

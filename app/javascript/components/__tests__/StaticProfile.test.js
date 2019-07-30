import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import "whatwg-fetch";

import StaticProfile from "../StaticProfile";

Enzyme.configure({ adapter: new Adapter() });

describe("<StaticProfile>", () => {
  const profile = {
    email: "john@example.com",
    firstname: "John",
    lastname: "Doe",
    timezone: "UTC",
    url: "iou22o38f4"
  };
  const wrapper = shallow(
    <StaticProfile
      match={{ params: { unique_url: "iou22o38f4" } }}
      profile={profile}
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
});

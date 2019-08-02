import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import "whatwg-fetch";

import RankMyself from "../RankMyself";

Enzyme.configure({ adapter: new Adapter() });

describe("<RankMyself>", () => {
  const user = {
    email: "john@example.com",
    firstname: "John",
    id: 1,
    lastname: "Doe",
    timezone: "UTC",
    url: "iou22o38f4"
  };
  const wrapper = shallow(
    <RankMyself match={{ params: { id: 1 } }} user={user} />
  );

  it("renders without crashing", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

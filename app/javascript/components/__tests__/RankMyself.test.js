import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import "whatwg-fetch";

import RankMyself from "../RankMyself";

Enzyme.configure({ adapter: new Adapter() });

describe("<RankMyself>", () => {
  const wrapper = shallow(<RankMyself />);

  it("renders without crashing", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

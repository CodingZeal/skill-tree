import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";

import Category from "../Category";

Enzyme.configure({ adapter: new Adapter() });

describe("<Category>", () => {
  const category = {
    category_name: "Rails",
    id: 3
  };
  const wrapper = shallow(<Category category={category} />);

  it("renders without crashing", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

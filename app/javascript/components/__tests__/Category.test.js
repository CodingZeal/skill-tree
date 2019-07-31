import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";

import Category from "../Category";

Enzyme.configure({ adapter: new Adapter() });

describe("<Category>", () => {
  const addRating = () => {
    console.log("hello there");
  };
  const current_user = {
    id: 1
  };
  const user = {
    id: 1
  };
  const category = {
    category_name: "Rails",
    id: 3
  };
  const wrapper = shallow(
    <Category
      addRating={addRating}
      category={category}
      current_user={current_user}
      user={user}
    />
  );

  it("renders without crashing", () => {
    expect(wrapper).toMatchSnapshot();
  });
  it("shows current rating when number is clicked", () => {
    wrapper.setState({ rating: { score: 0 } });
    expect(wrapper.find("h2").text()).toEqual("0");
  });
});

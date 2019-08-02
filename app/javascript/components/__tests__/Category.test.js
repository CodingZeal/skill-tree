import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";

import Category from "../Category";

Enzyme.configure({ adapter: new Adapter() });

describe("<Category>", () => {
  const addRating = () => {
    true;
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
});

describe("Rating skills", () => {
  const addRating = () => {
    true;
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

  it("shows current rating when 0 is clicked", () => {
    const mockedEvent = { target: { name: "score", value: "0" } };

    wrapper.find(".zero").simulate("click", mockedEvent);

    expect(wrapper.find("h2").text()).toEqual("0");
  });
  it("shows current rating when 1 is clicked", () => {
    const mockedEvent = { target: { name: "score", value: "1" } };

    wrapper.find(".one").simulate("click", mockedEvent);

    expect(wrapper.find("h2").text()).toEqual("1");
  });
  it("shows current rating when 2 is clicked", () => {
    const mockedEvent = { target: { name: "score", value: "2" } };

    wrapper.find(".two").simulate("click", mockedEvent);

    expect(wrapper.find("h2").text()).toEqual("2");
  });
  it("shows current rating when 3 is clicked", () => {
    const mockedEvent = { target: { name: "score", value: "3" } };

    wrapper.find(".three").simulate("click", mockedEvent);

    expect(wrapper.find("h2").text()).toEqual("3");
  });
  it("shows current rating when 5 is clicked", () => {
    const mockedEvent = { target: { name: "score", value: "5" } };

    wrapper.find(".five").simulate("click", mockedEvent);

    expect(wrapper.find("h2").text()).toEqual("5");
  });
});

import React from "react";

function Category({ category }) {
  return (
    <div className="category">
      <h2 id="category_name"> {category.category_name}</h2>
    </div>
  );
}

export default Category;

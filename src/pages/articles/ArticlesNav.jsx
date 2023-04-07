import React from "react";

// import "./Articles.css";

import Button from "../../components/button/Button";

const ArticlesNav = ({ handleAllData, handleFilter }) => {
  return (
    <>
      <Button text="All" handleClick={handleAllData} />
      <Button text="News" handleClick={() => handleFilter("news")} />
      <Button text="Blogs" handleClick={() => handleFilter("blog")} />
    </>
  );
};

export default ArticlesNav;

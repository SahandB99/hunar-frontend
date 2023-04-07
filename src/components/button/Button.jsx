import { useSelector } from "react-redux";

import "./button.styles.css";

function Button({ text, handleClick }) {
  const isDark = useSelector((state) => state.theme.isDark);

  return (
    <button
      className={isDark ? "small-button-dark" : "small-button"}
      onClick={handleClick}
    >
      {text}
    </button>
  );
}

export default Button;

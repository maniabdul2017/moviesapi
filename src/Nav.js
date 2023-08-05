import React, { useEffect, useState } from "react";
import "./Nav.css";

function Nav() {
  const [show, handleShow] = useState(false);
  //here i am using this function for the navbar
  //and saying that if y > 100 then gets big
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else {
        handleShow(false);
      }
    });
    return () => {
      window.removeEventListener("scroll");
    };
  }, []);

  return (
    /* here i am sayihn that if the value gets true
       ${show && "nav__black"} then just get the value from the css
       and go black value */
    <div className={`nav ${show && "nav__black"}`}>
      <img
        className="nav__logo"
        src="https://wallpapercave.com/wp/wp5063339.png"
        alt="Netflix Logo"
      />
      <img
        className="nav__avatar"
        src="https://pbs.twimg.com/media/DlKNEufWsAAgr2E.jpg"
        alt="Netflix Logo"
      />
    </div>
  );
}

export default Nav;

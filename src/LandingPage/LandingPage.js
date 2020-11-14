import { Link } from "react-router-dom";
import React from "react";

import "./LandingPage.css";
export default function LandingPage() {
  return (
    <div className="LandingPage">
      <p>
        Hello, and welcome to petful! We are an unusual adoption agency in that
        we only have cats and dogs, and while you can adopt either a cat or a
        dog, you can only adopt the one that has been here longest! That way we
        ensure everyuone finds a home not just the kittens and puppies. Would
        you like to see our adorkable lil floofs?
      </p>
      <img
        src="https://images.pexels.com/photos/33053/dog-young-dog-small-dog-maltese.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        alt="cute dog"
      />
      <Link to={"/adopt"}>
        <button>Yes!</button>
      </Link>
    </div>
  );
}

import React, { useState } from "react";
import { Star, StarFill } from "react-bootstrap-icons";

function StarRate({ rate, handleStarRating }) {
  const [star, setStar] = useState(rate);
  return (
    <span>
      {[...Array(star)].map((a, i) => (
        <StarFill
          size={20}
          color="#FCD53F"
          style={{ margin: "0 1px 2% 0" }}
          key={i}
          onClick={() => {
            setStar(i + 1);
            handleStarRating(i + 1);
          }}
        />
      ))}
      {[...Array(5 - star)].map((a, i) => (
        <Star
          size={20}
          color="grey"
          style={{ margin: "0 1px 2% 0" }}
          key={i}
          onClick={() => {
            setStar(star + i + 1);
            handleStarRating(star + i + 1);
          }}
        />
      ))}
      <input type="hidden" value={star} />
    </span>
  );
}

export default StarRate;

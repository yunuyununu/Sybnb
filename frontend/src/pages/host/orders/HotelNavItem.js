import React, { useRef } from "react";

function HotelNavItem({ rownum, ho_idx, ho_name, loading, handleHotelChange }) {
  const hotel_idx = useRef();
  if (rownum == 1 && !loading) {
    return (
      <li
        key={rownum}
        className={"nav-item"}
        onClick={() => {
          handleHotelChange(ho_idx);
        }}
      >
        <a key={ho_idx} className={`nav-link active hotel${ho_idx}`}>
          {ho_name}
        </a>
        <input type="hidden" defaultValue={ho_idx} ref={hotel_idx} />
      </li>
    );
  } else {
    return (
      <li
        key={rownum}
        onClick={() => {
          handleHotelChange(ho_idx);
        }}
      >
        <a key={ho_idx} className={`nav-link hotel${ho_idx}`}>
          {ho_name}
        </a>
        <input type="hidden" defaultValue={ho_idx} ref={hotel_idx} />
      </li>
    );
  }
}

export default HotelNavItem;

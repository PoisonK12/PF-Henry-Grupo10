import React, { useState } from "react";
import s from "./SearchBar.module.css";

export const SearchBar = () => {
  const [search, setSearch] = useState("");

  const cleanButton = () => {
    setSearch("");
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className={s.major}>
    <div className={s.form}>
      <input
        className={s.input}
        type="text"
        placeholder="Search name..."
        value={search}
        onChange={handleSearch}
      />

      <button className={s.buttons}>
        <svg
          width="17"
          height="16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-labelledby="search"
        >
          <path
            d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
            stroke="currentColor"
            strokeWidth="1.333"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      </button>
      <button className={s.reset} onClick={cleanButton}></button>
      <div className={s.results}>
        <div className={s.list}>
          <p>Juli</p>
          <p>Juli</p>
          <p>Juli</p>
          <p>Juli</p>
          <p>Juli</p>
          <p>Juli</p>
          <p>Juli</p>
          <p>Juli</p>
          {/* <li>Julian</li>
          <li>Luque</li>
          <li>Luque x2</li>
          <li>Luque x3</li> */}
        </div>
      </div>
    </div>
    </div>
  );
};

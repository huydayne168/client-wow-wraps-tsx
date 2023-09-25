import React, { useCallback, useState } from "react";
import styles from "./filter-side-bar.module.css";
import { useSearchParams } from "react-router-dom";
function FilterSideBar() {
    const [search, setSearch] = useSearchParams();

    const searchHandler = useCallback(
        (text: string) => {
            if (text.length === 0) {
                search.delete("nameQuery");
                setSearch(search, {
                    replace: true,
                });
            } else {
                search.set("nameQuery", text);
                setSearch(search, {
                    replace: true,
                });
            }
        },
        [search]
    );
    return (
        <div className={styles["filter-side-bar"]}>
            <form action="#">
                <div className={styles["search-input"]}>
                    <input
                        type="text"
                        name="search"
                        id="search"
                        placeholder="Search food here..."
                        defaultValue={search.get("nameQuery") || undefined}
                        onChange={(e) => {
                            searchHandler(e.target.value);
                        }}
                    />

                    {/* search icon */}
                    <div className={styles["search-icon"]}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="1em"
                            viewBox="0 0 512 512"
                            fill="currentColor"
                        >
                            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                        </svg>
                    </div>
                </div>

                <ul className={styles["sort-side"]}>
                    {/* user can choose more than one at the same sorting action */}
                    <li>
                        <label htmlFor="top-rate">Top Rate</label>
                        <input
                            type="checkbox"
                            name="top-rate"
                            id="top-rate"
                            hidden
                        />
                    </li>
                    <li>
                        <label htmlFor="low-price">Low Price</label>
                        <input
                            type="checkbox"
                            name="sortPrice"
                            id="low-price"
                            hidden
                        />
                    </li>
                    <li>
                        <label htmlFor="high-price">High Price</label>
                        <input
                            type="checkbox"
                            name="sortPrice"
                            id="high-price"
                            hidden
                        />
                    </li>
                </ul>
            </form>
        </div>
    );
}

export default FilterSideBar;

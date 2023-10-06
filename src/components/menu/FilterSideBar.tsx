import React, { useCallback, useEffect, useState } from "react";
import styles from "./filter-side-bar.module.css";
import { useSearchParams } from "react-router-dom";
function FilterSideBar() {
    const [search, setSearch] = useSearchParams();
    const [sortRate, setSortRate] = useState(false);
    const [sortLowPrice, setSortLowPrice] = useState(false);
    const [sortHighPrice, setSortHighPrice] = useState(false);
    const [sortFlashSale, setSortFlashSale] = useState(false);

    useEffect(() => {
        if (sortRate) {
            search.set("sortRate", sortRate.toString());
            search.delete("sortLowPrice");
            search.delete("sortHighPrice");
            // search.delete("sortFlashSale");
        } else if (sortHighPrice) {
            search.set("sortHighPrice", sortHighPrice.toString());
            search.delete("sortLowPrice");
            search.delete("sortRate");
            // search.delete("sortFlashSale");
        } else if (sortLowPrice) {
            search.set("sortLowPrice", sortLowPrice.toString());
            search.delete("sortHighPrice");
            search.delete("sortRate");
            // search.delete("sortFlashSale");
        } else {
            search.delete("sortLowPrice");
            search.delete("sortHighPrice");
            search.delete("sortRate");
            search.delete("sortFlashSale");
        }

        if (sortFlashSale) {
            search.set("sortFlashSale", sortFlashSale.toString());
        }

        setSearch(search, {
            replace: true,
        });
    }, [sortRate, sortHighPrice, sortLowPrice, sortFlashSale]);

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
        [search, setSearch]
    );

    const sortHandler = useCallback(
        (sortType: string) => {
            search.set("sort", sortType);
            setSearch(search, {
                replace: true,
            });
        },
        [search, setSearch]
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
                    <li
                        onClick={() => {
                            setSortRate((prev) => !prev);
                            setSortHighPrice(false);
                            setSortLowPrice(false);
                            // setSortFlashSale(false);
                        }}
                        className={sortRate ? styles["active"] : ""}
                    >
                        Top Rate
                    </li>
                    <li
                        onClick={() => {
                            setSortLowPrice((prev) => !prev);
                            setSortHighPrice(false);
                            setSortRate(false);
                            // setSortFlashSale(false);
                        }}
                        className={sortLowPrice ? styles["active"] : ""}
                    >
                        Low Price
                    </li>
                    <li
                        onClick={() => {
                            setSortHighPrice((prev) => !prev);
                            // setSortFlashSale(false);
                            setSortLowPrice(false);
                            setSortRate(false);
                        }}
                        className={sortHighPrice ? styles["active"] : ""}
                    >
                        High Price
                    </li>

                    <li
                        onClick={() => {
                            setSortFlashSale((pre) => !pre);
                        }}
                        className={sortFlashSale ? styles["active"] : ""}
                    >
                        Flash Sale
                    </li>
                </ul>
            </form>
        </div>
    );
}

export default FilterSideBar;

import React, { useState } from "react";
import styles from "./rate-star.module.css";
import Star from "./Star";
const RateStar: React.FC<{ ratePoint?: number }> = ({ ratePoint }) => {
    const points = [1, 2, 3, 4, 5];
    const [pointIndex, setPointIndex] = useState(ratePoint || 0); // check if we pass ratePoint prop or not?
    function changePoint(point: number) {
        setPointIndex(point);
    }
    return (
        <div className={styles["rate-star"]}>
            {!ratePoint
                ? points.map((point, index) => {
                      return (
                          <Star
                              key={point}
                              point={point}
                              changePoint={changePoint}
                              color={pointIndex > index ? "#FB8F2C" : "#828282"} // if point > index so I pass the suitable color to add to fill attribute
                          />
                      );
                  })
                : points.map((point, index) => {
                      return (
                          <Star
                              key={point}
                              point={point}
                              color={pointIndex > index ? "#FB8F2C" : "#828282"} // if point > index so I pass the suitable color to add to fill attribute
                          />
                      );
                  })}
        </div>
    );
};

export default RateStar;

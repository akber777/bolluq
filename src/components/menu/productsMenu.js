import React, { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { searchSpan } from "../../helper/helper";
import PropTypes from "prop-types";

// css
import "../../assets/css/_menu.scss";

const ProductsMenu = ({ id, setId }) => {
  const searchRef = useRef([]);

  console.log("rendered");

  useEffect(() => {
    searchSpan(searchRef);
  }, []);

  return (
    <div className="menu">
      <NavLink to={"/products/our-products"}>BİZİM MARKALAR</NavLink>
      <NavLink to={"/products/external-products"}>XARİCİ MARKALAR</NavLink>
      <div className="menu__details">
        <div className="menu__details--item">
          <div className="menu__detailsSearch">
            <input
              ref={(e) => (searchRef.current[0] = e)}
              type="search"
              placeholder="Quru qida axtar..."
            />
            <svg
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.1498 10.6918H11.3819L11.1098 10.4294C12.0623 9.32133 12.6358 7.88279 12.6358 6.3179C12.6358 2.82847 9.80732 0 6.3179 0C2.82847 0 0 2.82847 0 6.3179C0 9.80732 2.82847 12.6358 6.3179 12.6358C7.88279 12.6358 9.32133 12.0623 10.4294 11.1098L10.6918 11.3819V12.1498L15.5517 17L17 15.5517L12.1498 10.6918ZM6.3179 10.6918C3.89766 10.6918 1.94397 8.73814 1.94397 6.3179C1.94397 3.89766 3.89766 1.94397 6.3179 1.94397C8.73814 1.94397 10.6918 3.89766 10.6918 6.3179C10.6918 8.73814 8.73814 10.6918 6.3179 10.6918Z"
                fill="#C4C4C4"
              />
            </svg>
          </div>
          <div className="parent">
            {[1, 2, 3, 4, 5, 6].map((item, index) => (
              <span
                data-id={item}
                key={index}
                onClick={(e) => {
                  if (
                    id.includes(Number(e.target.getAttribute("data-id"))) ===
                    false
                  ) {
                    setId((prev) => [
                      ...prev,
                      Number(e.target.getAttribute("data-id")),
                    ]);

                    e.target.classList.add("activeSpan");
                  } else {
                    const index = id.indexOf(
                      Number(e.target.getAttribute("data-id")),
                      0
                    );

                    if (index > -1) {
                      id.splice(index, 1);
                      setId(id);
                      e.target.classList.remove("activeSpan");
                    }
                  }
                }}
              >
                Yag {item}
              </span>
            ))}
          </div>
        </div>
        <div className="menu__details--item">
          <div className="menu__detailsSearch">
            <input
              ref={(e) => (searchRef.current[1] = e)}
              type="search"
              placeholder="Qənnadi axtar..."
            />
            <svg
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.1498 10.6918H11.3819L11.1098 10.4294C12.0623 9.32133 12.6358 7.88279 12.6358 6.3179C12.6358 2.82847 9.80732 0 6.3179 0C2.82847 0 0 2.82847 0 6.3179C0 9.80732 2.82847 12.6358 6.3179 12.6358C7.88279 12.6358 9.32133 12.0623 10.4294 11.1098L10.6918 11.3819V12.1498L15.5517 17L17 15.5517L12.1498 10.6918ZM6.3179 10.6918C3.89766 10.6918 1.94397 8.73814 1.94397 6.3179C1.94397 3.89766 3.89766 1.94397 6.3179 1.94397C8.73814 1.94397 10.6918 3.89766 10.6918 6.3179C10.6918 8.73814 8.73814 10.6918 6.3179 10.6918Z"
                fill="#C4C4C4"
              />
            </svg>
          </div>
          <div className="parent">
            {[7, 8, 9].map((item, index) => (
              <span
                data-id={item}
                key={index}
                onClick={(e) => {
                  if (
                    id.includes(Number(e.target.getAttribute("data-id"))) ===
                    false
                  ) {
                    setId((prev) => [
                      ...prev,
                      Number(e.target.getAttribute("data-id")),
                    ]);

                    e.target.classList.add("activeSpan");
                  } else {
                    const index = id.indexOf(
                      Number(e.target.getAttribute("data-id")),
                      0
                    );

                    if (index > -1) {
                      id.splice(index, 1);
                      e.target.classList.remove("activeSpan");
                      setId(id);
                    }
                  }
                }}
              >
                Yag {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

ProductsMenu.propTypes = {
  setId: PropTypes.func.isRequired,
  id: PropTypes.array.isRequired,
};

export default React.memo(ProductsMenu);

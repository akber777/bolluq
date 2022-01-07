import React, { useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { searchSpan } from "../../helper/helper";
import PropTypes from "prop-types";

// css
import "../../assets/css/_menu.scss";
import { useTranslation } from "react-i18next";

const ProductsMenu = ({ data, type }) => {
  const { pathname } = useLocation();
  const searchRef = useRef([]);
  const allSpan = useRef([]);
  const filter = useRef(null);
  const closeBtnForFilter = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    searchSpan(searchRef);

    filter.current.onclick = () => {
      document.querySelector(".menuProduct").style.display = "flex";
    };

    closeBtnForFilter.current.onclick = () => {
      document.querySelector(".menuProduct").style.display = "none";
    };
  }, []);

  return (
    <>
      <div className="filterBox" ref={filter}>
        <button>
          <svg
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8301 17.0928H4.52942"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M13.6405 7.40042H19.9412"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M9.22629 7.34625C9.22629 6.0506 8.16813 5 6.86314 5C5.55816 5 4.5 6.0506 4.5 7.34625C4.5 8.64191 5.55816 9.69251 6.86314 9.69251C8.16813 9.69251 9.22629 8.64191 9.22629 7.34625Z"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M20.5 17.0538C20.5 15.7581 19.4426 14.7075 18.1376 14.7075C16.8318 14.7075 15.7737 15.7581 15.7737 17.0538C15.7737 18.3494 16.8318 19.4 18.1376 19.4C19.4426 19.4 20.5 18.3494 20.5 17.0538Z"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Filter
        </button>
      </div>
      <div className="menu menuProduct">
        <NavLink to={"/our-products"}>{t("bizimmarkalar")}</NavLink>
        <NavLink to={"/external-products"}>{t("xaricimarkalar")}</NavLink>
        <div className="menu__details">
          <div className="menu__details--title">
            <button ref={closeBtnForFilter}>
              <svg
                width={8}
                height={15}
                viewBox="0 0 8 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.79325 0.212584C8.04386 0.470261 8.06664 0.873484 7.8616 1.15762L7.79325 1.23903L1.70447 7.5L7.79325 13.761C8.04386 14.0186 8.06664 14.4219 7.8616 14.706L7.79325 14.7874C7.54265 15.0451 7.15049 15.0685 6.87415 14.8577L6.79498 14.7874L0.206749 8.01322C-0.0438556 7.75554 -0.0666379 7.35232 0.138402 7.06818L0.206749 6.98678L6.79498 0.212584C7.07065 -0.0708613 7.51759 -0.0708613 7.79325 0.212584Z"
                  fill="black"
                />
              </svg>
            </button>
            <h5>Filter</h5>
            <span></span>
          </div>
          <div className="menu__details--item">
            <div className="menu__detailsSearch">
              <input
                ref={(e) => (searchRef.current[0] = e)}
                type="search"
                placeholder={`${t("quruqidaaxtar")}...`}
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
              {data !== undefined &&
                data.dryFood.map((item) => (
                  <Link to={`/${type}/category/${item.slug}`} key={item.id}>
                    <span
                      ref={(e) => (allSpan.current[item.id] = e)}
                      onClick={(e) => {
                        allSpan.current.forEach((element) => {
                          element.classList.remove("activeSpan");
                        });
                        e.target.classList.add("activeSpan");
                      }}
                    >
                      {item.title}
                    </span>
                  </Link>
                ))}
            </div>
          </div>
          <div className="menu__details--item">
            <div className="menu__detailsSearch">
              <input
                ref={(e) => (searchRef.current[1] = e)}
                type="search"
                placeholder={`${t("qennadiaxtar")}...`}
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
              {data !== undefined &&
                data.confectionery.map((item) => (
                  <Link to={`/${type}/category/${item.slug}`} key={item.id}>
                    <span
                      // className={
                      //   pathname
                      //     .split("/")
                      //     [pathname.split("/").length - 1].toUpperCase() ==
                      //   item.title.toUpperCase()
                      //     ? "activeSpan"
                      //     : ""
                      // }
                      ref={(e) => (allSpan.current[item.id] = e)}
                      onClick={(e) => {
                        allSpan.current.forEach((element) => {
                          element.classList.remove("activeSpan");
                        });
                        e.target.classList.add("activeSpan");
                      }}
                    >
                      {item.title}
                    </span>
                  </Link>
                ))}
            </div>
          </div>
          <button className="menu__details--btnForFilter">Tətbiq et</button>
        </div>
      </div>
    </>
  );
};

ProductsMenu.propTypes = {
  data: PropTypes.object,
  type: PropTypes.string.isRequired,
};

function noRender(prev, next) {
  if (next.data === undefined) {
    return true;
  }
}

export default React.memo(ProductsMenu, noRender);

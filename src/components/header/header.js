import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Container } from "reactstrap";
import { Link, NavLink, useHistory, useLocation } from "react-router-dom";
import "../../assets/css/_header.scss";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";
import i18n from "../../i18/i18n";

import { useForm } from "react-hook-form";

const Header = ({ headerId, lang, isHide, hide, dispatchSearch, settings }) => {
  const { t } = useTranslation();
  const searchRef = useRef();

  const history = useHistory();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const isMobileScreen = useMediaQuery({ query: "(max-width: 1073px)" });

  const headerRef = useRef("");

  useEffect(() => {
    window.addEventListener("scroll", function () {
      if (this.scrollY > 120) {
        headerRef.current.classList.add("fixedHeader");
      } else {
        headerRef.current.classList.remove("fixedHeader");
      }
    });
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    searchRef.current.style.display = "none";
    history.push({
      pathname: `search-result`,
      search: `query=${data.search}`,
    });
    dispatchSearch(data.search);
  };

  const { pathname } = useLocation();

  useEffect(() => {
    hide(false);
  }, [pathname]);

  useEffect(() => {
    document.querySelectorAll(".mobParent").forEach((item) => {
      item.onclick = function () {
        if (item.classList.contains("showMenu")) {
          item.classList.remove("showMenu");
        } else {
          item.classList.add("showMenu");
        }
      };
    });
  }, [isHide]);

  return (
    <>
      {isHide && <div className="layoutData"></div>}
      {isHide && (
        <div className="header__mobMenu">
          <div
            className="header__mobMenu--close"
            onClick={() => {
              hide(false);
            }}
          >
            <svg
              width={32}
              height={32}
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.332 10.3319C10.4366 10.227 10.5609 10.1439 10.6977 10.0872C10.8345 10.0304 10.9811 10.0012 11.1292 10.0012C11.2773 10.0012 11.424 10.0304 11.5608 10.0872C11.6976 10.1439 11.8219 10.227 11.9265 10.3319L21.4873 19.8927C21.592 19.9974 21.6749 20.1217 21.7315 20.2584C21.7881 20.3952 21.8172 20.5418 21.8171 20.6898C21.8171 20.8378 21.7879 20.9843 21.7312 21.121C21.6745 21.2578 21.5914 21.382 21.4867 21.4866C21.382 21.5912 21.2577 21.6742 21.1209 21.7308C20.9842 21.7873 20.8376 21.8164 20.6896 21.8164C20.5416 21.8163 20.395 21.7871 20.2583 21.7304C20.1216 21.6737 19.9974 21.5906 19.8928 21.4859L10.3306 11.9264C10.2258 11.8218 10.1427 11.6975 10.0859 11.5607C10.0292 11.4239 10 11.2772 10 11.1291C10 10.981 10.0292 10.8344 10.0859 10.6976C10.1427 10.5608 10.2258 10.4365 10.3306 10.3319H10.332Z"
                fill="white"
                fillOpacity="0.9"
              />
              <path
                d="M21.4874 10.332C21.5923 10.4366 21.6754 10.5609 21.7321 10.6977C21.7889 10.8345 21.8181 10.9811 21.8181 11.1292C21.8181 11.2773 21.7889 11.424 21.7321 11.5608C21.6754 11.6976 21.5923 11.8219 21.4874 11.9265L11.9266 21.4873C11.7152 21.6986 11.4284 21.8172 11.1295 21.8171C10.8306 21.817 10.544 21.6981 10.3327 21.4867C10.1214 21.2752 10.0028 20.9885 10.0029 20.6896C10.0031 20.3907 10.1219 20.1041 10.3334 19.8928L19.8929 10.3306C19.9975 10.2258 20.1218 10.1427 20.2586 10.0859C20.3954 10.0292 20.5421 10 20.6902 10C20.8383 10 20.9849 10.0292 21.1217 10.0859C21.2585 10.1427 21.3828 10.2258 21.4874 10.3306V10.332Z"
                fill="white"
                fillOpacity="0.9"
              />
              <rect
                x="1.5"
                y="1.5"
                width={29}
                height={29}
                rx="6.5"
                stroke="white"
                strokeOpacity="0.9"
                strokeWidth={3}
              />
            </svg>
          </div>
          <p>
            {lang.map((item, index) => (
              <span
                key={index}
                onClick={() => {
                  changeLanguage(item.locale);
                  window.location.href = `/${item.locale}`;
                }}
              >
                {item.locale.toUpperCase()}
              </span>
            ))}
          </p>
          <div className="header__mobLink">
            <Link to={"/"}>
              <svg
                width={15}
                height={15}
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="7.5" cy="7.5" r="7.5" fill="#BF0807" />
              </svg>
              ESAS SEHİFE
            </Link>
            <div className="mobParent">
              <p>
                <svg
                  width={15}
                  height={15}
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="7.5" cy="7.5" r="7.5" fill="#BF0807" />
                  <path
                    d="M3.86228 6.32078C3.97323 6.20983 4.14684 6.19975 4.26917 6.29052L4.30422 6.32078L6.99992 9.01633L9.69562 6.32078C9.80656 6.20983 9.98017 6.19975 10.1025 6.29052L10.1376 6.32078C10.2485 6.43172 10.2586 6.60533 10.1678 6.72767L10.1376 6.76272L7.22089 9.67939C7.10995 9.79033 6.93634 9.80042 6.814 9.70964L6.77895 9.67939L3.86228 6.76272C3.74024 6.64068 3.74024 6.44282 3.86228 6.32078Z"
                    fill="white"
                  />
                </svg>
                BİZ KİMİK
              </p>
              <div className="menuMob">
                <Link to="/about">Haqqımızda</Link>
                <Link to="/history">Tariximiz</Link>
                <Link to="/principles">Deyerlerimiz</Link>
                <Link to="/structure">Struktur</Link>
                <Link to="/productions">İstehsalat</Link>
                <Link to="/news">Xeberler</Link>
              </div>
            </div>
            {/* <Link to={"/branch"}>
              <svg
                width={15}
                height={15}
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="7.5" cy="7.5" r="7.5" fill="#BF0807" />
              </svg>
              FİLİALLAR
            </Link> */}
            <div className="mobParent">
              <p>
                <svg
                  width={15}
                  height={15}
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="7.5" cy="7.5" r="7.5" fill="#BF0807" />
                  <path
                    d="M3.86228 6.32078C3.97323 6.20983 4.14684 6.19975 4.26917 6.29052L4.30422 6.32078L6.99992 9.01633L9.69562 6.32078C9.80656 6.20983 9.98017 6.19975 10.1025 6.29052L10.1376 6.32078C10.2485 6.43172 10.2586 6.60533 10.1678 6.72767L10.1376 6.76272L7.22089 9.67939C7.10995 9.79033 6.93634 9.80042 6.814 9.70964L6.77895 9.67939L3.86228 6.76272C3.74024 6.64068 3.74024 6.44282 3.86228 6.32078Z"
                    fill="white"
                  />
                </svg>
                {t("mehsullar")}
              </p>
              <div className="menuMob">
                <Link to="/our-products">{t("bizimmarkalar")}</Link>
                <Link to="/external-products">{t("xaricimarkalar")}</Link>
              </div>
            </div>
            <div className="mobParent">
              <p>
                <svg
                  width={15}
                  height={15}
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="7.5" cy="7.5" r="7.5" fill="#BF0807" />
                  <path
                    d="M3.86228 6.32078C3.97323 6.20983 4.14684 6.19975 4.26917 6.29052L4.30422 6.32078L6.99992 9.01633L9.69562 6.32078C9.80656 6.20983 9.98017 6.19975 10.1025 6.29052L10.1376 6.32078C10.2485 6.43172 10.2586 6.60533 10.1678 6.72767L10.1376 6.76272L7.22089 9.67939C7.10995 9.79033 6.93634 9.80042 6.814 9.70964L6.77895 9.67939L3.86228 6.76272C3.74024 6.64068 3.74024 6.44282 3.86228 6.32078Z"
                    fill="white"
                  />
                </svg>
                {t("insanresurslari")}
              </p>
              <div className="menuMob">
                <Link to="/internship">{t("tecrubeproqramlari")}</Link>
                <Link to="/rules">{t("isemuracietqaydalari")}</Link>
                <Link to="/vacancies">{t("vakansiyalar")}</Link>
              </div>
            </div>
            <Link to={"/catalogs"}>
              <svg
                width={15}
                height={15}
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="7.5" cy="7.5" r="7.5" fill="#BF0807" />
              </svg>
              {t("kataloq")}
            </Link>
            <Link to={"/export"}>
              <svg
                width={15}
                height={15}
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="7.5" cy="7.5" r="7.5" fill="#BF0807" />
              </svg>
              {t("export")}
            </Link>
            <NavLink to={`/contact`}>
              <svg
                width={15}
                height={15}
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="7.5" cy="7.5" r="7.5" fill="#BF0807" />
              </svg>
              {t("ƏLAQƏ")}
            </NavLink>
          </div>
          <div className="header__mobMenu--social">
            {settings !== null && (
              <>
                <a href={settings.facebook} target={"_blank"}>
                  <svg
                    width={16}
                    height={16}
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.80563 2.65667H11.2663V0.112667C11.0143 0.078 10.1476 0 9.13829 0C7.03229 0 5.58963 1.32467 5.58963 3.75933V6H3.26562V8.844H5.58963V16H8.43896V8.84467H10.669L11.023 6.00067H8.43829V4.04133C8.43896 3.21933 8.66029 2.65667 9.80563 2.65667Z"
                      fill="#BF0807"
                    />
                  </svg>
                </a>
                <a href={`https://t.me/${settings.telegram}`} target={"_blank"}>
                  <svg
                    width={17}
                    height={16}
                    viewBox="0 0 17 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_1146_1416)">
                      <path
                        d="M6.41874 10.1205L6.15408 13.8432C6.53274 13.8432 6.69674 13.6805 6.89341 13.4852L8.66874 11.7885L12.3474 14.4825C13.0221 14.8585 13.4974 14.6605 13.6794 13.8619L16.0941 2.54721C16.3081 1.54988 15.7341 1.15921 15.0767 1.40388L0.88341 6.83788C-0.0852564 7.21388 -0.0705897 7.75388 0.718744 7.99855L4.34741 9.12721L12.7761 3.85321C13.1727 3.59055 13.5334 3.73588 13.2367 3.99855L6.41874 10.1205Z"
                        fill="#BF0807"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1146_1416">
                        <rect
                          width="15.9448"
                          height={16}
                          fill="white"
                          transform="translate(0.861816)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </a>
                <a href={settings.linkedin} target={"_blank"}>
                  <svg
                    width={17}
                    height={16}
                    viewBox="0 0 17 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_1146_1395)">
                      <path
                        d="M16.4773 15.9507L16.4813 15.95V10.082C16.4813 7.21133 15.8633 5 12.5073 5C10.894 5 9.81129 5.88533 9.36929 6.72467H9.32263V5.268H6.14062V15.95H9.45396V10.6607C9.45396 9.268 9.71796 7.92133 11.4426 7.92133C13.142 7.92133 13.1673 9.51067 13.1673 10.75V15.9507H16.4773Z"
                        fill="#BF0807"
                      />
                      <path
                        d="M0.404541 5.31836H3.72187V16.0004H0.404541V5.31836Z"
                        fill="#BF0807"
                      />
                      <path
                        d="M2.06196 0C1.00129 0 0.140625 0.860667 0.140625 1.92133C0.140625 2.982 1.00129 3.86067 2.06196 3.86067C3.12263 3.86067 3.98329 2.982 3.98329 1.92133C3.98263 0.860667 3.12196 0 2.06196 0V0Z"
                        fill="#BF0807"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1146_1395">
                        <rect
                          width="15.9448"
                          height={16}
                          fill="white"
                          transform="translate(0.723877)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </a>
                <a href={settings.instagram} target={"_blank"}>
                  <svg
                    width={17}
                    height={16}
                    viewBox="0 0 17 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_1146_1401)">
                      <path
                        d="M8.14062 4C5.93162 4 4.14062 5.791 4.14062 8C4.14062 10.209 5.93162 12 8.14062 12C10.3496 12 12.1406 10.209 12.1406 8C12.1406 5.791 10.3496 4 8.14062 4ZM8.14062 10.5C6.76262 10.5 5.64062 9.378 5.64062 8C5.64062 6.621 6.76262 5.5 8.14062 5.5C9.51863 5.5 10.6406 6.621 10.6406 8C10.6406 9.378 9.51863 10.5 8.14062 10.5Z"
                        fill="#BF0807"
                      />
                      <path
                        d="M11.1406 0H5.14062C2.37963 0 0.140625 2.239 0.140625 5V11C0.140625 13.761 2.37963 16 5.14062 16H11.1406C13.9016 16 16.1406 13.761 16.1406 11V5C16.1406 2.239 13.9016 0 11.1406 0ZM14.6406 11C14.6406 12.93 13.0706 14.5 11.1406 14.5H5.14062C3.21063 14.5 1.64062 12.93 1.64062 11V5C1.64062 3.07 3.21063 1.5 5.14062 1.5H11.1406C13.0706 1.5 14.6406 3.07 14.6406 5V11Z"
                        fill="#BF0807"
                      />
                      <path
                        d="M12.4407 4.23298C12.7351 4.23298 12.9737 3.99435 12.9737 3.69999C12.9737 3.40562 12.7351 3.16699 12.4407 3.16699C12.1463 3.16699 11.9077 3.40562 11.9077 3.69999C11.9077 3.99435 12.1463 4.23298 12.4407 4.23298Z"
                        fill="#BF0807"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1146_1401">
                        <rect
                          width="15.9448"
                          height={16}
                          fill="white"
                          transform="translate(0.585938)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </a>
                <a
                  href={` https://wa.me/${settings.whatsapp}`}
                  target={"_blank"}
                >
                  <svg
                    width={17}
                    height={16}
                    viewBox="0 0 17 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_1146_1414)">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M13.4466 2.67206C12.0432 1.26709 10.1769 0.493011 8.18869 0.492188C4.0917 0.492188 0.757355 3.82645 0.755707 7.92453C0.755157 9.23456 1.09738 10.5134 1.74786 11.6406L0.693359 15.4922L4.6337 14.4586C5.71942 15.0508 6.94174 15.3629 8.18567 15.3633H8.18878C12.2853 15.3633 15.62 12.0287 15.6216 7.93048C15.6224 5.94434 14.85 4.07693 13.4466 2.67206ZM8.18869 14.108H8.18613C7.07761 14.1075 5.99042 13.8096 5.04175 13.2469L4.81625 13.1129L2.478 13.7263L3.10211 11.4466L2.95517 11.2128C2.33673 10.2292 2.01016 9.09228 2.01071 7.92499C2.01199 4.51877 4.78348 1.74756 8.19116 1.74756C9.84131 1.74811 11.3925 2.39154 12.5589 3.5593C13.7252 4.72705 14.3672 6.27923 14.3667 7.93002C14.3652 11.3365 11.5939 14.108 8.18869 14.108ZM11.5774 9.48102C11.3918 9.388 10.4786 8.93884 10.3083 8.87677C10.1382 8.81479 10.0142 8.78393 9.89056 8.96979C9.76669 9.15564 9.41083 9.57403 9.30243 9.6979C9.19403 9.82187 9.08581 9.83743 8.90005 9.74441C8.71429 9.65149 8.1159 9.45529 7.40646 8.82257C6.8544 8.33011 6.48169 7.72192 6.37329 7.53607C6.26507 7.35004 6.37237 7.25922 6.45477 7.15704C6.65582 6.90738 6.85715 6.64563 6.91904 6.52176C6.98102 6.3978 6.94998 6.28931 6.90347 6.19638C6.85715 6.10345 6.48572 5.1893 6.33099 4.81732C6.18011 4.45532 6.02713 4.50421 5.91305 4.49853C5.80484 4.49313 5.68097 4.49203 5.5571 4.49203C5.43332 4.49203 5.23209 4.53845 5.0618 4.72449C4.8916 4.91043 4.41186 5.35968 4.41186 6.27383C4.41186 7.18799 5.07736 8.0711 5.1702 8.19507C5.26303 8.31903 6.47986 10.1949 8.34286 10.9993C8.78598 11.1909 9.13187 11.305 9.40167 11.3906C9.84662 11.532 10.2514 11.512 10.5714 11.4642C10.9283 11.4109 11.6702 11.0149 11.8251 10.5811C11.9798 10.1472 11.9798 9.77545 11.9333 9.6979C11.887 9.62045 11.7631 9.57403 11.5774 9.48102Z"
                        fill="#BF0807"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1146_1414">
                        <rect
                          width="15.9448"
                          height={16}
                          fill="white"
                          transform="translate(0.447754)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </a>
                <a href={settings.twitter} target={"_blank"}>
                  <svg
                    width={19}
                    height={16}
                    viewBox="0 0 19 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.1648 1.00785C18.1648 1.00785 16.5903 1.93787 15.7149 2.20158C15.245 1.66129 14.6205 1.27834 13.9259 1.10454C13.2313 0.930729 12.5 0.974449 11.8311 1.22978C11.1621 1.48511 10.5877 1.93974 10.1855 2.53217C9.78333 3.1246 9.57281 3.82626 9.58241 4.54224V5.32246C8.21128 5.35801 6.85264 5.05391 5.62749 4.43726C4.40233 3.8206 3.34871 2.91052 2.56044 1.78806C2.56044 1.78806 -0.560438 8.81003 6.46153 11.9309C4.85469 13.0216 2.94053 13.5685 1 13.4913C8.02197 17.3924 16.6044 13.4913 16.6044 4.51883C16.6044 4.30193 16.5825 4.08503 16.542 3.87125C17.3378 3.08635 18.1648 1.00785 18.1648 1.00785Z"
                      stroke="#BF0807"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </>
            )}
          </div>
        </div>
      )}
      <header
        ref={headerRef}
        className="header"
        id={headerId}
        style={{ zIndex: isHide === true ? 1 : 9 }}
      >
        <div className="header__search" ref={searchRef}>
          <div className="header__search--item">
            <form onSubmit={handleSubmit(onSubmit)}>
              <img
                src={require("../../assets/images/close.svg").default}
                alt="close"
                onClick={() => {
                  searchRef.current.style.display = "none";
                }}
              />
              <input
                {...register("search", { required: true })}
                type="search"
                placeholder="Axtar..."
              />
              <button type="submit">
                <svg
                  width="27"
                  height="27"
                  viewBox="0 0 27 27"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.2967 16.9811H18.0772L17.6449 16.5643C19.1578 14.8045 20.0686 12.5197 20.0686 10.0343C20.0686 4.49228 15.5763 0 10.0343 0C4.49228 0 0 4.49228 0 10.0343C0 15.5763 4.49228 20.0686 10.0343 20.0686C12.5197 20.0686 14.8045 19.1578 16.5643 17.6449L16.9811 18.0772V19.2967L24.6998 27L27 24.6998L19.2967 16.9811ZM10.0343 16.9811C6.19039 16.9811 3.08748 13.8782 3.08748 10.0343C3.08748 6.19039 6.19039 3.08748 10.0343 3.08748C13.8782 3.08748 16.9811 6.19039 16.9811 10.0343C16.9811 13.8782 13.8782 16.9811 10.0343 16.9811Z"
                    fill="white"
                    fillOpacity="0.62"
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>
        <Container>
          <div className="d-flex justify-content-between align-items-center">
            <div className="header__logo">
              <Link to={`/`}>
                <img
                  className="img-fluid"
                  src={require("../../assets/images/logo.png").default}
                  alt=""
                />
              </Link>
            </div>
            {!isMobileScreen && (
              <div className="header__nav">
                <nav>
                  <NavLink to={`/about`} className="header__nav--item">
                    {t("BİZ KİMİK")}
                  </NavLink>
                  {/* <NavLink to={`/branch`} className="header__nav--item">
                    {t("FİLİALLAR")}
                  </NavLink> */}
                  <NavLink to={`/our-products`} className="header__nav--item">
                    {t("MEHSULLAR")}
                  </NavLink>
                  <NavLink to={`/internship`} className="header__nav--item">
                    {t("İNSAN RESURSLARI")}
                  </NavLink>
                  <NavLink to={`/export`} className="header__nav--item">
                    {t("EXPORT")}
                  </NavLink>
                  <NavLink to={`/catalogs`} className="header__nav--item">
                    {t("KATALOQ")}
                  </NavLink>
                  <NavLink to={`/contact`} className="header__nav--item">
                    {t("ƏLAQƏ")}
                  </NavLink>
                </nav>
              </div>
            )}
            <div className="header__langBox d-flex align-items-center">
              {isMobileScreen ? (
                <div className="header__mobileBox">
                  <div
                    className="header__mobileSearch"
                    onClick={() => {
                      searchRef.current.style.display = "flex";
                    }}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z"
                        fill="#FBFBFB"
                      />
                    </svg>
                  </div>
                  <div
                    className="header__mobileHamburger"
                    onClick={() => {
                      hide(true);
                    }}
                  >
                    <svg
                      width={20}
                      height={14}
                      viewBox="0 0 20 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0 14H20V11.6667H0V14ZM0 8.16667H20V5.83333H0V8.16667ZM0 0V2.33333H20V0H0Z"
                        fill="#FBFBFB"
                      />
                    </svg>
                  </div>
                </div>
              ) : (
                <>
                  <div className="header__langBox--search">
                    <button
                      onClick={() => {
                        searchRef.current.style.display = "flex";
                      }}
                    >
                      <svg
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z"
                          fill="black"
                          fillOpacity="0.69"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="header__langBox--multiLang d-flex align-items-center justify-content-center flex-column">
                    <button className="az">
                      {localStorage.getItem("i18nextLng").toUpperCase()}
                      <svg
                        width={10}
                        height={6}
                        viewBox="0 0 10 6"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 1L5 5L9 1"
                          stroke="black"
                          strokeOpacity="0.69"
                        />
                      </svg>
                    </button>
                    <div className="header__langBox--multiBox">
                      {lang.map((item, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            changeLanguage(item.locale);
                            window.location.href = `/${item.locale}`;
                          }}
                        >
                          {item.locale.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </Container>
      </header>
    </>
  );
};

export default connect(
  (state) => ({
    isHide: state.isHide,
    settings: state.settings,
  }),
  (dispatch) => ({
    hide: (val) => dispatch.isHide.hide(val),
    dispatchSearch: (val) => dispatch.searchState.dispatchSearch(val),
  })
)(React.memo(Header));

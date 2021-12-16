import React, { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { Container } from "reactstrap";
import { animateBody } from "../../helper/helper";
import swal from "sweetalert";
import { useQuery, useMutation } from "react-query";
import { settingApi } from "../../queries/queries";
import "../../assets/css/_footer.scss";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import { chat } from "../../queries/queries";
import { useForm } from "react-hook-form";

const Footer = ({ dispatchSettings }) => {
  const btnTopRef = useRef();
  const { t } = useTranslation();

  const sendRef = useRef();
  const sendMessageBox = useRef();
  const closeRef = useRef();

  useEffect(() => {
    animateBody(btnTopRef.current);
    sendRef.current.onclick = () => {
      sendMessageBox.current.classList.remove("opacityNone");
    };

    closeRef.current.onclick = () => {
      sendMessageBox.current.classList.add("opacityNone");
    };
  });

  const { data, isLoading } = useQuery(["setting"], settingApi, {
    refetchOnWindowFocus: false,
    onSuccess: (succ) => {
      dispatchSettings(succ.data);
    },
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const { mutate } = useMutation((data) => chat(data), {
    onSuccess: (succ) => {
      if (succ.status === 200) {
      }

      swal({
        title: "Təbriklər!",
        text: "Mesajınız göndərildi",
        icon: "success",
      });
    },
  });

  const onSubmit = (data) => {
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    mutate(formData);
  };

  return (
    <footer className="footer">
      <div className="footer__sendMessage">
        <div
          ref={sendMessageBox}
          className="footer__sendMessageBox opacityNone"
        >
          <div className="footer__sendTitle">
            <h3>{t("formanidoldurun")}</h3>
            <button ref={closeRef}>
              <svg
                width={22}
                height={22}
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx={11} cy={11} r={11} fill="white" />
                <path d="M6 11H16" stroke="#7D7D7D" strokeWidth={2} />
              </svg>
            </button>
          </div>
          <div className="footer__sendForm">
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                {...register("firstname", { required: true })}
                type="text"
                placeholder={`*${t("ad")}`}
              />
              <input
                {...register("lastname", { required: true })}
                type="text"
                placeholder={`*${t("soyad")}`}
              />
              <input
                {...register("email", { required: true })}
                type="text"
                placeholder={`*${t("email")}`}
              />
              <textarea
                {...register("message", { required: true })}
                placeholder={`*${t("mesajyaz")}`}
              ></textarea>
              <button className="sendBtnFormFooter" type="submit">
                <svg
                  width={18}
                  height={16}
                  viewBox="0 0 18 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.15411 7.99983H2.5559L1.01824 1.88262C1.00839 1.84707 1.00239 1.81057 1.00035 1.77373C0.983237 1.21296 1.60079 0.82407 2.1359 1.08074L16.5559 7.99983L2.1359 14.9189C1.60701 15.1733 0.997237 14.7953 1.00035 14.2446C1.00192 14.1954 1.01057 14.1467 1.02601 14.0999L2.16701 10.3332"
                    fill="white"
                  />
                  <path
                    d="M7.15411 7.99983H2.5559L1.01824 1.88262C1.00839 1.84707 1.00239 1.81057 1.00035 1.77373C0.983237 1.21296 1.60079 0.82407 2.1359 1.08074L16.5559 7.99983L2.1359 14.9189C1.60701 15.1733 0.997237 14.7953 1.00035 14.2446C1.00192 14.1954 1.01057 14.1467 1.02601 14.0999L2.16701 10.3332"
                    stroke="white"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {t("gonder")}
              </button>
            </form>
          </div>
        </div>
        <button ref={sendRef}>
          <svg
            width={20}
            height={16}
            viewBox="0 0 20 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 0H2C0.9 0 0.00999999 0.9 0.00999999 2L0 14C0 15.1 0.9 16 2 16H18C19.1 16 20 15.1 20 14V2C20 0.9 19.1 0 18 0ZM18 14H2V4L10 9L18 4V14ZM10 7L2 2H18L10 7Z"
              fill="black"
            />
          </svg>
          {t("bizeismaric")}
        </button>
      </div>
      <Container>
        <div className="btnTop" ref={btnTopRef}>
          <svg
            width={41}
            height={41}
            viewBox="0 0 41 41"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M32.9421 27.1256C32.4951 27.5705 31.7971 27.6094 31.3062 27.2434L31.1656 27.1214L20.3554 16.2606L9.49404 27.0703C9.04703 27.5152 8.34908 27.5541 7.85818 27.188L7.71758 27.0661C7.27268 26.6191 7.23378 25.9211 7.59982 25.4302L7.72178 25.2896L19.4735 13.5933C19.9205 13.1484 20.6184 13.1095 21.1093 13.4755L21.2499 13.5975L32.9463 25.3491C33.4357 25.8409 33.4338 26.6362 32.9421 27.1256Z"
              fill="white"
            />
          </svg>
        </div>
        <div className="d-flex flexBoxFooter justify-content-between">
          <div className="footer__items hide">
            <h3>Biz kimik</h3>
            <NavLink to={"/principles"}>{t("deyerlerimiz")}</NavLink>
            <NavLink to={"/news"}>{t("xeberler")}</NavLink>
          </div>
          <div className="footer__items hide">
            <h3>Məhsullar</h3>
            <NavLink to={"/our-products"}>{t("bizimmarkalar")}</NavLink>
            <NavLink to={"/external-products"}>{t("xaricimarkalar")}</NavLink>
          </div>
          <div className="footer__items hide">
            <h3>İnsan Resursları</h3>
            <NavLink to={"/internship"}>{t("tecrubeproqramlari")}</NavLink>
            <NavLink to={"/rules"}>{t("isemuracietqaydalari")}</NavLink>
            <NavLink to={"/vacancies"}>{t("vakansiyalar")}</NavLink>
          </div>
          <div className="footer__items">
            <h3>{t("elaqemelumatlari")}</h3>
            <div className="d-flex flex-column">
              <a
                href={`tel:${
                  isLoading === false && data !== undefined && data.data.phone
                }`}
              >
                <img
                  src={require("../../assets/images/phone.svg").default}
                  alt=""
                />
                {isLoading === false && data !== undefined && data.data.phone}
              </a>
              <a
                href={`mailto:${
                  isLoading === false && data !== undefined && data.data.email
                }`}
              >
                <img
                  src={require("../../assets/images/office.svg").default}
                  alt=""
                />
                {isLoading === false && data !== undefined && data.data.email}
              </a>
              <a
                target={"_blank"}
                href={
                  isLoading === false &&
                  data !== undefined &&
                  data.data.address.link
                }
              >
                <img
                  src={require("../../assets/images/location.svg").default}
                  alt=""
                />
                {isLoading === false &&
                  data !== undefined &&
                  data.data.address.name}
              </a>
            </div>
          </div>
        </div>
        <div className="d-flex flexBoxFooter justify-content-between align-items-center footer__margin">
          <div className="footer__end">
            <p>Bütün hüquqlar qorunur © 2021 Bolluq MMC</p>
          </div>
          <div className="footer__end hide">
            <a href="#appstore">
              <img
                src={require("../../assets/images/appstore.svg").default}
                alt=""
              />
            </a>
            <a href="#playstore">
              <img
                src={require("../../assets/images/playstore.svg").default}
                alt=""
              />
            </a>
            <a href="#appstore">
              <img
                src={require("../../assets/images/appGalery.svg").default}
                alt=""
              />
            </a>
          </div>
          <div className="footer__end">
            {isLoading === false && (
              <>
                <a href={data.data.facebook}>
                  <svg
                    width={16}
                    height={16}
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.80563 2.65667H11.2663V0.112667C11.0143 0.078 10.1476 0 9.13829 0C7.03229 0 5.58963 1.32467 5.58963 3.75933V6H3.26562V8.844H5.58963V16H8.43896V8.84467H10.669L11.023 6.00067H8.43829V4.04133C8.43896 3.21933 8.66029 2.65667 9.80563 2.65667Z"
                      fill="white"
                    />
                  </svg>
                </a>
                <a href={data.data.linkedin}>
                  <svg
                    width={17}
                    height={16}
                    viewBox="0 0 17 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_702:1262)">
                      <path
                        d="M16.4774 15.9507L16.4814 15.95V10.082C16.4814 7.21133 15.8634 5 12.5074 5C10.8941 5 9.81144 5.88533 9.36944 6.72467H9.32278V5.268H6.14078V15.95H9.45411V10.6607C9.45411 9.268 9.71811 7.92133 11.4428 7.92133C13.1421 7.92133 13.1674 9.51067 13.1674 10.75V15.9507H16.4774Z"
                        fill="white"
                      />
                      <path
                        d="M0.404694 5.31836H3.72203V16.0004H0.404694V5.31836Z"
                        fill="white"
                      />
                      <path
                        d="M2.06211 0C1.00144 0 0.140778 0.860667 0.140778 1.92133C0.140778 2.982 1.00144 3.86067 2.06211 3.86067C3.12278 3.86067 3.98344 2.982 3.98344 1.92133C3.98278 0.860667 3.12211 0 2.06211 0V0Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_702:1262">
                        <rect
                          width="15.9448"
                          height={16}
                          fill="white"
                          transform="translate(0.723907)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </a>
                <a href={data.data.instagram}>
                  <svg
                    width={17}
                    height={16}
                    viewBox="0 0 17 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_702:1268)">
                      <path
                        d="M8.14069 4C5.93169 4 4.14069 5.791 4.14069 8C4.14069 10.209 5.93169 12 8.14069 12C10.3497 12 12.1407 10.209 12.1407 8C12.1407 5.791 10.3497 4 8.14069 4ZM8.14069 10.5C6.76269 10.5 5.64069 9.378 5.64069 8C5.64069 6.621 6.76269 5.5 8.14069 5.5C9.51869 5.5 10.6407 6.621 10.6407 8C10.6407 9.378 9.51869 10.5 8.14069 10.5Z"
                        fill="white"
                      />
                      <path
                        d="M11.1407 0H5.14069C2.37969 0 0.140686 2.239 0.140686 5V11C0.140686 13.761 2.37969 16 5.14069 16H11.1407C13.9017 16 16.1407 13.761 16.1407 11V5C16.1407 2.239 13.9017 0 11.1407 0ZM14.6407 11C14.6407 12.93 13.0707 14.5 11.1407 14.5H5.14069C3.21069 14.5 1.64069 12.93 1.64069 11V5C1.64069 3.07 3.21069 1.5 5.14069 1.5H11.1407C13.0707 1.5 14.6407 3.07 14.6407 5V11Z"
                        fill="white"
                      />
                      <path
                        d="M12.4408 4.23298C12.7351 4.23298 12.9738 3.99435 12.9738 3.69999C12.9738 3.40562 12.7351 3.16699 12.4408 3.16699C12.1464 3.16699 11.9078 3.40562 11.9078 3.69999C11.9078 3.99435 12.1464 4.23298 12.4408 4.23298Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_702:1268">
                        <rect
                          width="15.9448"
                          height={16}
                          fill="white"
                          transform="translate(0.585876)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </a>
              </>
            )}
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default connect(
  (state) => ({
    settings: state.settings,
  }),
  (dispatch) => ({
    dispatchSettings: (e) => dispatch.settings.dispatchSettings(e),
  })
)(React.memo(Footer));

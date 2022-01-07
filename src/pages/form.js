import React, { useState, useEffect } from "react";
import { Container } from "reactstrap";
import { useMutation } from "react-query";
import { Controller, useForm } from "react-hook-form";
import Title from "../components/title/title";
import "../assets/css/_form.scss";
import { exportApi, resumeCv } from "../queries/queries";
import swal from "sweetalert";
import { useParams } from "react-router";
import { readURL } from "../helper/helper";
import { useTranslation } from "react-i18next";

const Form = () => {
  const { slug } = useParams();

  const [img, setImg] = useState("");

  const [imgPath, setImgPath] = useState(null);

  const [forceUpdate, setForceUpdate] = useState();

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm();

  const { mutate, isLoading } = useMutation((data) => resumeCv(data, slug), {
    onSuccess: (succ) => {
      if (succ.status === 200) {
      }

      swal({
        title: "Təbriklər!",
        text: "Mesajınız göndərildi",
        icon: "success",
      });

      reset();
    },
  });

  const onSubmit = (data) => {
    const formData = new FormData();

    for (const key in data) {
      if (data[key] !== undefined && key !== "file") {
        formData.append(key, data[key]);
      }
      if (key === "file") {
        formData.append(key, data.file[0]);
      }
    }

    mutate(formData);
  };

  useEffect(() => {
    if (img !== "") {
      readURL(img, setImgPath);
    }
  }, [img, forceUpdate]);

  const { t } = useTranslation();

  return (
    <>
      <Title title="İNSAN RESURSLARI" />
      <div className="form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Container>
            <div className="form__title">
              <h2>{t("formanidoldurun")}</h2>
              <p>{t("zehmetolmazsaasagidakiformanidoldurun")}</p>
            </div>
            <div className="form__body">
              <div className="form__personal-information d-flex flex-column">
                <div className="form__personal-information__header">
                  <h4>1. {t("sexsimelumatlar")}</h4>
                </div>
                <div className="form__personal-information__body d-flex justify-content-between flex-row">
                  <div className="form__personal-information__body__input-field">
                    <div className="form__personal-information__body__input-field__name--input d-flex flex-row flex-wrap justify-content-between">
                      <div className="form__personal-information__body__input-field__name--input__name d-flex flex-column">
                        <label htmlFor="name">*{t("ad")}</label>
                        <input
                          type="text"
                          id="name"
                          {...register("firstname", { required: true })}
                        />
                      </div>
                      <div className="form__personal-information__body__input-field__name--input__surname d-flex flex-column">
                        <label htmlFor="surname">*{t("soyad")}</label>
                        <input
                          type="text"
                          id="surname"
                          {...register("surname", { required: true })}
                        />
                      </div>
                      <div className="form__personal-information__body__input-field__name--input__patronymic d-flex flex-column">
                        <label htmlFor="patronymic">*{t("ataadi")}</label>
                        <input
                          type="text"
                          id="patronymic"
                          {...register("patronymic", { required: true })}
                        />
                      </div>
                    </div>

                    <div className="form__personal-information__body__input-field__birth--input d-flex flex-row flex-wrap justify-content-between">
                      <div className="form__personal-information__body__input-field__birth--input__b-place d-flex flex-column">
                        <label htmlFor="b-place">*{t("dogumyeri")}</label>
                        <input
                          type="text"
                          id="b-place"
                          {...register("bplace", { required: true })}
                        />
                      </div>
                      <div className="form__personal-information__body__input-field__birth--input__b-date d-flex flex-column">
                        <label htmlFor="b-date">*{t("dogumtarixi")}</label>
                        <input
                          type="date"
                          id="b-date"
                          {...register("bdate", { required: true })}
                        />
                      </div>
                      <div className="form__personal-information__body__input-field__birth--input__citizenship d-flex flex-column">
                        <label>*{t("vetendasliq")}</label>
                        <Controller
                          control={control}
                          rules={{ required: true }}
                          name="citizenship"
                          render={({ field }) => (
                            <select
                              {...field}
                              style={{ padding: "5px 10px 5px" }}
                            >
                              <option value="">Sec</option>
                              <option value="azerbaycanli">Azerbaycanli</option>
                            </select>
                          )}
                        />
                      </div>
                    </div>

                    <div className="form__personal-information__body__input-field__address d-flex flex-wrap flex-column">
                      <label htmlFor="address">*{t("yasayisunvani")}</label>
                      <input
                        type="text"
                        id="address"
                        {...register("address", { required: true })}
                      />
                    </div>

                    <div className="form__personal-information__body__input-field__marital-other-status d-flex flex-row flex-wrap justify-content-between">
                      <div className="form__personal-information__content__input-field__marital-other-status__marital d-flex flex-column">
                        <label>*{t("aileveziyyeti")}</label>
                        <Controller
                          control={control}
                          name="familysituation"
                          rules={{ required: true }}
                          render={({ field }) => (
                            <select {...field}>
                              <option value=""></option>
                              <option value="subay">Subay</option>
                              <option value="evli">Evli</option>
                            </select>
                          )}
                        />
                      </div>
                      <div className="form__personal-information__body__input-field__marital-other-status__military d-flex flex-column">
                        <label>*{t("herbimukellefiyyet")}</label>
                        <Controller
                          control={control}
                          rules={{ required: true }}
                          name="army"
                          render={({ field }) => (
                            <select {...field}>
                              <option value=""></option>
                              <option value="var">Var</option>
                            </select>
                          )}
                        />
                        <option value="Herbi mukellefiyyet"></option>
                      </div>
                      <div className="form__personal-information__body__input-field__marital-other-status__driver-license d-flex flex-column">
                        <label>*{t("suruculukvesiqesi")}</label>
                        <Controller
                          control={control}
                          rules={{ required: true }}
                          name="drivelisence"
                          render={({ field }) => (
                            <select {...field}>
                              <option value="">{t("suruculukvesiqesi")}</option>
                              <option value="var">Var</option>
                              <option value="yox"></option>
                            </select>
                          )}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form__personal-information__body__photo">
                    {img === "" && (
                      <div className="form__personal-information__photo__download">
                        <p>{t("sekiliyukle")}</p>
                      </div>
                    )}
                    <p className="imgPath">
                      {imgPath !== null ? (
                        <img src={imgPath} />
                      ) : (
                        "JPEG,JPG,PNG, maks 10MB"
                      )}
                    </p>

                    <input
                      {...register("file")}
                      accept="image/png, image/jpg,image/jpeg"
                      type="file"
                      className="file"
                      onChange={(e) => {
                        setImg(e.target);
                        setForceUpdate(Math.floor(Math.random(1) * 10));
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="form__contact-information d-flex flex-column ">
                <div className="form__contact-information__header">
                  <h4>2. {t("elaqe")}</h4>
                  <p>*{t("elaqenomresienazbirinigoster")}</p>
                </div>
                <div className="form__contact-information__input-field d-flex flex-row justify-content-between">
                  <div className="form__contact-information__input-field__phone">
                    <label>{t("seherdaxilinomre")}</label>
                    <div>
                      <Controller
                        control={control}
                        name="phonecity"
                        rules={{ required: false }}
                        render={({ field }) => (
                          <select {...field}>
                            <option value=""></option>
                            <option value="012">012</option>
                          </select>
                        )}
                      />
                      <input
                        type="number"
                        {...register("phonecitychildren", {
                          required: true,
                          minLength: 7,
                        })}
                      />
                    </div>
                  </div>
                  <div className="form__contact-information__input-field__mobile">
                    <label>{t("mobilnomre")}</label>
                    <div>
                      <Controller
                        control={control}
                        name="phonemobile"
                        render={({ field }) => (
                          <select {...field}>
                            <option value=""></option>
                            <option value="+994">+994</option>
                          </select>
                        )}
                      />
                      <input
                        type="number"
                        {...register("phonemobilechildren", {
                          required: true,
                          minLength: 9,
                        })}
                      />
                    </div>
                  </div>
                  <div className="form__contact-information__input-field__email">
                    <label>{t("email")}</label>
                    <div>
                      <input
                        type="email"
                        {...register("emailperson", {
                          required: true,
                          pattern:
                            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        })}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="form__education d-flex flex-column">
                <div className="form__education__header">
                  <h4>3. {t("tehsil")}</h4>
                </div>
                <div className="form__education__input-field d-flex flex-column">
                  <div className="form__education__input-field__secondary d-flex flex-row justify-content-between">
                    <div className="form__education__input-field__secondary__name">
                      <label>{t("mekteb")}</label>
                      <div>
                        <input
                          type="text"
                          {...register("education", { required: true })}
                        />
                      </div>
                    </div>
                    <div className="form__education__input-field__secondary__city">
                      <label>{t("region")}</label>
                      <div>
                        <input
                          type="text"
                          {...register("cityperson", { required: true })}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form__education__input-field__high d-flex flex-column">
                    <div className="form__education__input-field__high__first-line d-flex flex-row justify-content-between w-100">
                      <div className="form__education__input-field__high__name">
                        <label>{t("alitehsilmuessisesininadi")}</label>
                        <div>
                          <input
                            type="text"
                            {...register("educationname", { required: true })}
                          />
                        </div>
                      </div>
                      <div className="form__education__input-field__high__faculty">
                        <label>{t("fakulte")}</label>
                        <div>
                          <input
                            type="text"
                            {...register("faculty", { required: true })}
                          />
                        </div>
                      </div>
                      <div className="form__education__input-field__high__major">
                        <label>{t("ixtisas")}</label>
                        <div>
                          <input
                            type="text"
                            {...register("specialty", { required: true })}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form__education__input-field__high__second-line d-flex flex-row justify-content-between w-100">
                      <div className="form__education__input-field__high__entrance-year">
                        <label>{t("qebulolunduguil")}</label>
                        <div>
                          <input
                            type="text"
                            {...register("eduationstart", { required: true })}
                          />
                        </div>
                      </div>
                      <div className="form__education__input-field__high__graduate-year">
                        <label>{t("bitmeili")}</label>
                        <div>
                          <input
                            type="text"
                            {...register("educationend", { required: true })}
                          />
                        </div>
                      </div>
                      <div className="form__education__input-field__high__degree">
                        <label>{t("derece")}</label>
                        <div>
                          <input
                            type="text"
                            {...register("degree", { required: true })}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="form__it-skills d-flex flex-column">
                <div className="form__it-skills__header">
                  <h4>4.{t("komputerbiliyi")}</h4>
                </div>
                <div className="form__it-skills__input-field">
                  <input
                    type="text"
                    {...register("compeducation", { required: false })}
                  />
                </div>
              </div>

              <div className="form__language">
                <div className="form__language__header">
                  <h4>5.{t("dilbiliyi")}</h4>
                </div>
                <div className="form__language__input-field">
                  <input
                    type="text"
                    {...register("languageskills", { required: false })}
                  />
                </div>
              </div>
              <div className="form__experience d-flex flex-column ">
                <div className="form__experience__header">
                  <h4>6.{t("istecrubesi")}</h4>
                </div>
                <div className="form__experience__input-field d-flex flex-column">
                  <div className="form__experience__input-field__first-line d-flex flex-row justify-content-between">
                    <div className="form__experience__input-field__first-line__ex-job">
                      <label>{t("evvelkiisyeri")}</label>
                      <div>
                        <input
                          type="text"
                          {...register("workskills", { required: false })}
                        />
                      </div>
                    </div>
                    <div className="form__experience__input-field__first-line__ex-position">
                      <label>{t("vezife")}</label>
                      <div>
                        <input type="text" />
                      </div>
                    </div>
                    <div className="form__experience__input-field__first-line__ex-boss">
                      <label>{t("rehberinadiveelaqevasitesi")}</label>
                      <div>
                        <input
                          type="text"
                          {...register("workname", { required: false })}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form__experience__input-field__second-line d-flex flex-row justify-content-between">
                    <div className="form__experience__input-field__second-line__ex-startEnd-date">
                      <label>{t("work")}</label>
                      <div>
                        <input
                          type="text"
                          {...register("workdate", { required: false })}
                        />
                      </div>
                    </div>
                    <div className="form__experience__input-field__second-line__ex-resign-reason">
                      <label>{t("isdencixmasebebi")}</label>
                      <div>
                        <input
                          type="text"
                          {...register("workendreason", { required: false })}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="form__reference-person d-flex flex-column ">
                <div className="form__reference-person__header">
                  <h4>7. {t("sizitovsiyeedebileceksexs")}</h4>
                </div>
                <div className="form__reference-person__input-field d-flex flex-row justify-content-between">
                  <div className="form__reference-person__input-field__name">
                    <label>{t("ad")}</label>
                    <div>
                      <input
                        type="text"
                        {...register("referencename", { required: true })}
                      />
                    </div>
                  </div>
                  <div className="form__reference-person__input-field__surname">
                    <label>{t("soyad")}</label>
                    <div>
                      <input
                        type="text"
                        {...register("referencelastname", { required: true })}
                      />
                    </div>
                  </div>
                  <div className="form__reference-person__input-field__acquaintance-degree">
                    <label>{t("tanisliqderecesi")}</label>
                    <div>
                      <input
                        type="text"
                        {...register("referencerelationsipdegree", {
                          required: true,
                        })}
                      />
                    </div>
                  </div>
                  <div className="form__reference-person__input-field__number">
                    <label>{t("elaqenomresi")}</label>
                    <div>
                      <input
                        type="text"
                        {...register("referencecontact", {
                          required: true,
                        })}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="form__btn-send d-flex  justify-content-center align-items-center">
                <button type="submit">{t("gonder")}</button>
              </div>
            </div>
          </Container>
        </form>
      </div>
    </>
  );
};

export default Form;

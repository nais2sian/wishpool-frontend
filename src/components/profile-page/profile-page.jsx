import { useContext, useState } from "react";

import { UserContext } from "../../utils/context";
import { Button, Input, Textarea } from "../ui";

import { updateProfile, refreshUser } from "../../utils/api";

import {
  MAXIMUM_DESCRIPTION_LENGTH,
  MAXIMUM_USERNAME_LENGTH,
} from "../../utils/constants";

import styles from "./profile-page.module.css";

export const ProfilePage = ({ extraClass = "" }) => {
  const [userCtx, setUserCtx] = useContext(UserContext);
  const [profileData, setProfileData] = useState({});
  const [personalData, setPersonalData] = useState({});
  const [updateMessages, setUpdateMessages] = useState({
    successProfile: "",
    successPersonal: "",
    failProfile: "",
    failPersonal: "",
  });

  const changeProfileData = (event) => {
    const field = event.target.name;

    setProfileData({
      ...profileData,
      [field]: event.target.value,
    });
  };

  const changePersonalData = (event) => {
    const field = event.target.name;

    setPersonalData({
      ...personalData,
      [field]: event.target.value,
    });
  };

  const submitFormData = (event) => {
    const { value: submitKey } = event.nativeEvent.submitter;
    event.preventDefault();

    setUpdateMessages({
      successProfile: "",
      successPersonal: "",
      failProfile: "",
      failPersonal: "",
    });

    if (submitKey === "profileData") {
      updateProfile(profileData)
        .then(() => {
          refreshUser(setUserCtx);
          setUpdateMessages({
            successProfile: "Changes saved successfully!",
          });
        })
        .catch((err) => {
          setUpdateMessages({
            failProfile: err.message,
          });
        });
    }

    if (submitKey === "personalData") {
      updateProfile(personalData)
        .then(() => {
          refreshUser(setUserCtx);
          setUpdateMessages({
            successPersonal: "Changes saved successfully!",
          });
        })
        .catch((err) => {
          setUpdateMessages({
            failPersonal: err.message,
          });
        });
    }
  };

  return (
    <section className={`${styles.content} ${extraClass}`}>
      <h1 className={`text text_type_h1 text_color_primary ${styles.title}`}>
        Profile {userCtx.username}
      </h1>
      <h2 className={`text text_type_h2 text_color_primary mb-20`}>
        Profile settings
      </h2>
      <form className={styles.form} onSubmit={submitFormData}>
        <label htmlFor="image" className={styles.img_box}>
          <div className={styles.avatar}>
            <img className={styles.img} src={userCtx.avatar} />
          </div>
        </label>
        <Input
          name="avatar"
          type="url"
          id="avatar"
          defaultValue={userCtx.avatar}
          placeholder="Please provide a link to your avatar here"
          label="Avatar"
          onChange={changeProfileData}
          extraClass="mb-16"
          required={true}
        />
        <Textarea
          name="about"
          type="text"
          id="about"
          defaultValue={userCtx.about}
          placeholder="A few sentences about yourself"
          label="About me"
          onChange={changeProfileData}
          maxLength={MAXIMUM_DESCRIPTION_LENGTH}
        />
        <p className={`text text_type_small mt-4 mb-16 ${styles.caption}`}>
          {`${
            profileData?.about?.length || userCtx?.about.length || 0
          }/${MAXIMUM_DESCRIPTION_LENGTH} symbols`}
        </p>
        {updateMessages.successProfile && (
          <span className={styles.success_message}>
            {updateMessages.successProfile}
          </span>
        )}
        {updateMessages.failProfile && (
          <span className={styles.fail_message}>
            {updateMessages.failProfile}
          </span>
        )}
        <Button
          type="submit"
          kind="secondary"
          text="Save changes"
          name="profileData"
          extraClass={styles.btn}
          value="profileData"
        />
        <h2
          className={`text text_type_h2 text_color_primary mb-16 ${styles.h2}`}
        >
        Personal information
        </h2>
        <Input
          name="email"
          type="email"
          id={4}
          placeholder="Specify here"
          label="E-mail"
          onChange={changePersonalData}
          extraClass="mb-12"
          defaultValue={userCtx.email}
        />
        <Input
          name="password"
          type="password"
          id="password"
          placeholder="*******"
          label="Password"
          onChange={changePersonalData}
          extraClass="mb-16"
        />
        <Input
          name="username"
          type="text"
          id={5}
          placeholder="username"
          label="Username"
          onChange={changePersonalData}
          extraClass="mb-16"
          defaultValue={userCtx.username}
          maxLength={MAXIMUM_USERNAME_LENGTH}
        />
        {updateMessages.successPersonal && (
          <span className={styles.success_message}>
            {updateMessages.successPersonal}
          </span>
        )}
        {updateMessages.failPersonal && (
          <span className={styles.fail_message}>
            {updateMessages.failPersonal}
          </span>
        )}
        <Button
          type="submit"
          kind="secondary"
          text="Save changes"
          name="personalData"
          extraClass={styles.btn}
          value="personalData"
        />
      </form>
    </section>
  );
};

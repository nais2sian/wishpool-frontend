import { useState, useEffect, useRef, useContext } from "react";
import { NavLink } from "react-router-dom";

import { Button, Input, Modal } from "../ui";

import trashIcon from "../../images/icons/trash-red.svg";

import { UserContext } from "../../utils/context";

import {
  addCollection,
  deleteCollection,
  getCollections,
} from "../../utils/api";

import styles from "./main-page.module.css";

export const CollectionsView = ({ url, ownWishes }) => {
  const [isCollectionPopupOpen, setIsCollectionPopupOpen] = useState(false);
  const [isRemovePopupOpen, setIsRemovePopupOpen] = useState(false);
  const [idToRemove, setIdToRemove] = useState("");
  const [collectionsList, setCollectionsList] = useState([]);
  const [errorRemoveMessage, setErrorRemoveMessage] = useState("");

  const [user] = useContext(UserContext);

  useEffect(() => {
    getCollections().then((res) => setCollectionsList(res));
  }, []);

  const handleCollectionPopupOpen = () => {
    setIsCollectionPopupOpen(true);
  };

  const handlePopupClose = () => {
    isCollectionPopupOpen && setIsCollectionPopupOpen(false);
    isRemovePopupOpen && setIsRemovePopupOpen(false);
    errorRemoveMessage && setErrorRemoveMessage("");
  };

  const handleRemoveClick = (e) => {
    e.preventDefault();
    setIdToRemove(e.target.closest("a").name);
    setIsRemovePopupOpen(true);
  };

  const handleRemoveCollection = () => {
    deleteCollection(idToRemove)
      .then(() => {
        getCollections().then((res) => {
          setCollectionsList(res);
          handlePopupClose();
        });
      })
      .catch((err) => setErrorRemoveMessage(err.message));
  };

  return (
    <section className={styles.collections}>
      <Button
        kind="primary"
        text="Add collection"
        onClick={handleCollectionPopupOpen}
      />
      <div className={styles.cards_box}>
        {collectionsList.map((card) => {
          return (
            <NavLink
              key={card.id}
              className={styles.card}
              name={card.id}
              to={`${url}/collections/${card.id}`}
              style={{
                backgroundImage: `url(${card.image})`,
              }}
            >
              <h3
                className={`text text_type_cardh3 text_color_secondary ${styles.text}`}
              >
                {card.name}
              </h3>
              {user.id === card.owner?.id && (
                <button
                  type="button"
                  className={styles.remove_btn}
                  onClick={handleRemoveClick}
                >
                  <img src={trashIcon} alt="Delete." />
                </button>
              )}
            </NavLink>
          );
        })}
      </div>
      {isCollectionPopupOpen && (
        <CollectionAddModal
          ownWishes={ownWishes}
          onClose={handlePopupClose}
          collectionsList={collectionsList}
          setCollectionsList={setCollectionsList}
        />
      )}
      {isRemovePopupOpen && (
        <Modal onClose={handlePopupClose} extraClass={styles.modal}>
          <div className={styles.popup}>
            <p className="text text_type_main mb-10">Delete collection?</p>
            {errorRemoveMessage && (
              <span className={styles.error}>{errorRemoveMessage}</span>
            )}
            <div className={styles.popup_btn_box}>
              <Button
                type="button"
                extraClass={styles.popup_btn}
                kind="support"
                text="Cancel"
                onClick={handlePopupClose}
              />
              <Button
                type="button"
                extraClass={styles.popup_btn}
                kind="secondary"
                onClick={handleRemoveCollection}
                text="Delete"
              />
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
};

const CollectionAddModal = ({
  ownWishes,
  onClose,
  collectionsList,
  setCollectionsList,
}) => {
  const [collectionData, setCollectionData] = useState({ wishes: {} });
  const [valid, setValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const formRef = useRef(null);

  const submitCollection = (e) => {
    e.preventDefault();
    errorMessage && setErrorMessage("");

    const { name, image } = collectionData;
    const itemsId = Object.entries(collectionData.wishes).map(([key, val]) => {
      if (val) {
        return +key;
      }
    });

    addCollection({ name, image, itemsId })
      .then((res) => {
        const { name, image, id, owner } = res;
        setCollectionsList([...collectionsList, { name, image, id, owner }]);
        onClose();
      })
      .catch((err) => {
        setErrorMessage(err.message);
      });
  };

  const onFormChange = (e) => {
    const isValid = formRef.current.checkValidity();
    setValid(isValid);

    const name = e.target.name;
    const value = e.target.value;

    if (name.startsWith("wish")) {
      const [, key] = name.split(" ");
      setCollectionData({
        ...collectionData,
        wishes: {
          ...collectionData.wishes,
          [key]: e.target.checked,
        },
      });
    } else {
      setCollectionData({
        ...collectionData,
        [name]: name === "price" ? parseInt(value) : value,
      });
    }
  };

  return (
    <Modal
      onClose={onClose}
      extraClass={styles.collection_modal}
      isCloseBtn={true}
    >
      <form
        className={styles.collection_form}
        onSubmit={submitCollection}
        ref={formRef}
      >
        <h2 className="text text_type_h2 mb-16">Add a gift</h2>
        <Input
          type="text"
          id={20}
          extraClass="mb-12"
          label="Collection name"
          name="name"
          onChange={onFormChange}
          placeholder="Please provide the name of the collection"
          required
        />
        <Input
          type="url"
          extraClass="mb-12"
          name="image"
          label="Link to image"
          onChange={onFormChange}
          placeholder="Please provide a link"
          required
        />
        <p
          className={`text text_type_main text_color_black mb-4 ${styles.wishes_text}`}
        >
          Select products from your wishlist:
        </p>
        <div className={styles.wishes}>
          {ownWishes.map((item) => {
            return (
              <div key={item.id} className="mb-4">
                <input
                  className={styles.checkbox}
                  type="checkbox"
                  id={item.id}
                  name={`wish ${item.id}`}
                  checked={collectionData.wishes[item.id] ?? false}
                  onChange={onFormChange}
                />
                <label className={styles.checkbox} htmlFor={item.id}>
                  {item.name}
                </label>
              </div>
            );
          })}
        </div>
        {errorMessage && <span className={styles.error}>{errorMessage}</span>}
        <Button
          type="submit"
          extraClass={styles.collection_btn}
          text="Add collection"
          kind="secondary"
          disabled={!valid}
        />
      </form>
    </Modal>
  );
};

import React, { useEffect, useRef } from "react";
import _ from "lodash";
import { useFormik } from "formik";
import { Modal, FormGroup, FormControl, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const Add = ({ show, handleClose, addChannel, filter }) => {
  const channelInput = useRef(null);
  const { t } = useTranslation();

  useEffect(() => channelInput.current.focus());

  const formik = useFormik({
    initialValues: {
      id: _.uniqueId(),
      name: "",
    },
    onSubmit: ({ id, name }) => {
      const data = {
        id,
        name: filter.clean(name),
      };
      addChannel(data);
      handleClose();
    },
  });

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t("channels.addHeader")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <FormControl
              type="text"
              placeholder={t("channels.addPlaceholder")}
              required=""
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              ref={channelInput}
            />
          </FormGroup>
          <div className="mt-3">
            <Button variant="secondary" onClick={handleClose}>
              {t("cancelButton")}
            </Button>{" "}
            <Button type="submit">{t("channels.addButton")}</Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default Add;

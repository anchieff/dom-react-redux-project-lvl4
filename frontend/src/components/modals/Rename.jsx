import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import {
  Modal,
  FormGroup,
  FormControl,
  Button,
  FloatingLabel,
} from "react-bootstrap";
import { selectors as channelsSelector } from "../../slices/channelsSlice";
import { useTranslation } from "react-i18next";

const Rename = ({ show, handleClose, renameChannel, channelId, filter }) => {
  const channelInput = useRef(null);
  const { t } = useTranslation();
  const allChannels = useSelector(channelsSelector.selectAll);
  const channel = allChannels.find((item) => item.id === channelId);

  useEffect(() => channelInput.current.focus(), []);

  const formik = useFormik({
    initialValues: {
      id: channelId,
      name: channel.name,
    },
    onSubmit: ({ id, name }) => {
      renameChannel({ id, name: filter.clean(name) });
      handleClose();
    },
  });

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t("channels.renameHeader")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <FloatingLabel
              label={t("channels.addPlaceholder")}
              controlId="name"
            >
              <FormControl
                name="name"
                required=""
                onChange={formik.handleChange}
                value={formik.values.name}
                ref={channelInput}
              />
            </FloatingLabel>
          </FormGroup>
          <div className="mt-3">
            <Button variant="secondary" onClick={handleClose}>
              {t("cancelButton")}
            </Button>{" "}
            <Button type="submit">{t("channels.renameButton")}</Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default Rename;

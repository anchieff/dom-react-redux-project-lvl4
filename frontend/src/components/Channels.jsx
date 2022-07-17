import React from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";

const Channels = () => {
  const channels = useSelector((state) => state.chat.channels);
  const { t } = useTranslation();

  const renderChannels = () => {
    if (channels.length === 0) return null;

    return (
      <ul className="nav flex-column nav-pills nav-fill px-2">
        {channels.map((channel) => {
          if (channel.removable) {
            return (
              <li key={channel.id} className="nav-item w-100">
                <Dropdown as={ButtonGroup}>
                  <Button variant="secondary">
                    <span className="me-1">#</span>
                    channel.name
                  </Button>

                  <Dropdown.Toggle
                    split
                    variant="secondary"
                    id="dropdown-split-basic"
                  />

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">
                      {t("channels.remove")}
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-2">
                      {t("channels.rename")}
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </li>
            );
          } else {
            return (
              <li key={channel.id} className="nav-item w-100">
                <Button
                  variant="light"
                  className="w-100 rounded-0 text-start btn"
                >
                  <span className="me-1">#</span>
                  {channel.name}
                </Button>
              </li>
            );
          }
        })}
      </ul>
    );
  };

  return (
    <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>{t("channels.header")}</span>
        <Button
          variant="outline-primary"
          className="p-0"
          style={{ width: "26px", height: "26px" }}
        >
          <span>+</span>
        </Button>
      </div>
      {renderChannels()}
    </div>
  );
};

export default Channels;

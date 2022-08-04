import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import { selectors } from '../slices/channelsSlice.js';
import getModal from './modals/index';

function Channels({
  socket, changeChannel, channelId, filter,
}) {
  const channels = useSelector(selectors.selectAll);
  const { t } = useTranslation();

  const [modal, setModal] = useState(null);
  const [removedId, setRemovedId] = useState(null);

  const Add = getModal('adding');
  const Remove = getModal('removing');
  const Rename = getModal('renaming');

  // TODO едет верстка, если удалить активный канал
  // TODO добавить ошибку при получении данных

  const notify = (text, status) => {
    toast[status](text, {
      position: toast.POSITION.TOP_RIGHT,
      theme: 'colored',
    });
  };

  const addChannel = (channel) => {
    socket.createChannel(channel);
    if (!socket.error) notify(t('channels.addSuccess'), 'success');
    else notify(t('error'), 'error');
  };
  const deleteChannel = () => {
    socket.deleteChannel(removedId);
    if (!socket.error) notify(t('channels.removeSuccess'), 'success');
    else notify(t('error'), 'error');
  };
  const renameChannel = (channel) => {
    socket.renameChannel(channel);
    if (!socket.error) notify(t('channels.renameSuccess'), 'success');
    else notify(t('error'), 'error');
  };

  const renderAddModal = () => {
    if (modal !== 'adding') return null;
    return (
      <Add
        show={modal === 'adding'}
        handleClose={() => setModal(null)}
        addChannel={addChannel}
        filter={filter}
      />
    );
  };

  const renderRenameModal = () => {
    if (modal !== 'renaming') return null;
    return (
      <Rename
        show={modal === 'renaming'}
        handleClose={() => setModal(null)}
        channelId={removedId}
        renameChannel={renameChannel}
        filter={filter}
      />
    );
  };

  const renderRemoveModal = () => {
    if (modal !== 'removing') return null;
    return (
      <Remove
        show={modal === 'removing'}
        handleClose={() => setModal(null)}
        removeChannel={deleteChannel}
      />
    );
  };

  const showRemoveModal = (id) => {
    setRemovedId(id);
    setModal('removing');
  };

  const showRenameModal = (id) => {
    setRemovedId(id);
    setModal('renaming');
  };

  const renderChannels = () => {
    if (channels.length === 0) return null;

    return (
      <ul className="nav flex-column nav-pills nav-fill px-2">
        {channels.map((channel) => {
          if (channel.removable) {
            return (
              <li key={channel.id} className="nav-item w-100">
                <Dropdown as={ButtonGroup} className="w-100">
                  <Button
                    variant={channel.id === channelId ? 'secondary' : 'light'}
                    className="w-100 rounded-0 text-start btn"
                    onClick={() => changeChannel(channel.id)}
                  >
                    <span className="me-1">
                      #
                      {channel.name}
                    </span>
                  </Button>

                  <Dropdown.Toggle
                    split
                    variant={channel.id === channelId ? 'secondary' : 'light'}
                    id="dropdown-split-basic"
                  >
                    <span className="visually-hidden">
                      {t('channels.control_channel')}
                    </span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => showRemoveModal(channel.id)}>
                      {t('channels.remove')}
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => showRenameModal(channel.id)}>
                      {t('channels.rename')}
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </li>
            );
          }
          return (
            <li key={channel.id} className="nav-item w-100">
              <Button
                variant={channel.id === channelId ? 'secondary' : 'light'}
                className="w-100 rounded-0 text-start btn"
                onClick={() => changeChannel(channel.id)}
              >
                <span className="me-1">#</span>
                {channel.name}
              </Button>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <>
      <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
        <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
          <span>{t('channels.header')}</span>
          <Button
            variant="outline-primary"
            className="p-0"
            style={{ width: '26px', height: '26px' }}
            onClick={() => setModal('adding')}
          >
            <span>+</span>
          </Button>
        </div>
        {renderChannels()}
      </div>

      {renderAddModal()}
      {renderRenameModal()}
      {renderRemoveModal()}
    </>
  );
}

export default Channels;

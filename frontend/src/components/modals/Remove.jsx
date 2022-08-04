import React from 'react';
import { Modal, Button, FormGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

function Remove({ show, handleClose, removeChannel }) {
  const { t } = useTranslation();

  const handleRemove = () => {
    removeChannel();
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('channels.removeHeader')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleRemove}>
          <FormGroup>
            <Button variant="secondary" onClick={handleClose}>
              {t('cancelButton')}
            </Button>
            {' '}
            <Button onClick={handleRemove} variant="danger">
              {t('channels.removeButton')}
            </Button>
          </FormGroup>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default Remove;

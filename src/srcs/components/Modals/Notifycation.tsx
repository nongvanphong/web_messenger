import { type } from "os";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";

type showModal = {
  showmd: boolean;
  handleClose: () => void;
  title: string;
  msg: string;
  titlebnt: string;
};

const Notifycation = (props: showModal) => {
  return (
    <div style={{ zIndex: 999 }}>
      <Modal
        show={props.showmd}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{props.msg}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.handleClose}>{props.titlebnt}</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Notifycation;

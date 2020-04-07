import React from "react";
import style from "./listModal.module.scss";
import { Modal, Button } from "react-bootstrap";
import { IParticipant } from "../CreateProject";
import * as _ from "lodash";

interface IListModal {
  isOpen: boolean;
  toggleFn: () => void;
  participantList: IParticipant[];
  selectedIndex: number;
}

export const ListModal: React.FC<IListModal> = (props) => {
  const handleChange = (participant: IParticipant) => {
    const i = isChecked(participant._id);
    if (i === -1) {
      const ratee = {
        _id: participant._id,
        name: participant.name,
        email: participant.email,
        position: participant.position,
        answers: [],
      };
      props.participantList[props.selectedIndex]?.raters?.push(ratee);
    } else {
      props.participantList[props.selectedIndex]?.raters?.splice(i, 1);
    }
  };

  const isChecked = (val: any) => {
    const i = _.findIndex(
      props.participantList[props.selectedIndex]?.raters,
      (o: any) => {
        return o._id === val;
      }
    );
    return i;
  };

  return (
    <Modal show={props.isOpen} onHide={props.toggleFn}>
      <Modal.Header closeButton>
        <Modal.Title>Add Ratees</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <table className={style.table}>
          <thead>
            <tr>
              <th>Select</th>
              <th>Name</th>
              <th>Email</th>
              <th>Position</th>
            </tr>
          </thead>
          <tbody>
            {props.participantList.map((participant, i) => (
              <tr key={`${participant}-${i}`}>
                <td>
                  <input
                    type="checkbox"
                    defaultChecked={isChecked(participant._id) !== -1}
                    onChange={() => handleChange(participant)}
                  />
                </td>
                <td>{participant.name}</td>
                <td>{participant.email}</td>
                <td>{participant.position}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.toggleFn}>
          Close
        </Button>
        <Button variant="primary" onClick={props.toggleFn}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

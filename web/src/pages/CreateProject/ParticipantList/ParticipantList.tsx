import React from "react";
import { IParticipant } from "../CreateProject";
import { Accordion, Card } from "react-bootstrap";
import { faChevronRight, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./participantList.module.scss";
import { ListModal } from "../ListModal/ListModal";
import { useHistory } from "react-router-dom";
import { CREATE_PROJECT_URL } from "../../../contants/routerContants";

interface IParticipantList {
  list: IParticipant[];
}

export const ParticipantList: React.FC<IParticipantList> = (props) => {
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [selected, setSelected] = React.useState<number>(0);
  const history = useHistory();

  const handleClose = (index: number) => {
    setIsModalOpen((t) => !t);
    setSelected(index);
  };

  const isNotCreate = () => {
    return history.location.pathname !== CREATE_PROJECT_URL;
  };

  return (
    <Accordion>
      {props.list?.map((participant, i) => (
        <Card key={`${participant.name}-${i}`}>
          <Accordion.Toggle as={Card.Header} eventKey={i.toString()}>
            <div className="row">
              <div className="col-4">
                {isNotCreate() && <FontAwesomeIcon icon={faChevronRight} />}{" "}
                {participant.name}
              </div>
              <div className="col-4">{participant.email}</div>
              <div className="col-4">{participant.position}</div>
            </div>
          </Accordion.Toggle>
          {isNotCreate() && (
            <Accordion.Collapse eventKey={i.toString()}>
              <Card.Body>
                <div className="d-flex">
                  <h5>
                    Ratee{" "}
                    <span className={style.add} onClick={() => handleClose(i)}>
                      <FontAwesomeIcon icon={faPlus} />
                    </span>
                  </h5>
                </div>
                {participant.ratees.map((ratee, i) => (
                  <div className={"d-flex"} key={`${ratee.name}-${i}`}>
                    <div className={"flex-fill"}>{++i}.</div>
                    <div className={"flex-fill"}>{ratee.name}</div>
                    <div className={"flex-fill"}>{ratee.email}</div>
                    <div className={"flex-fill"}>{ratee.position}</div>
                    <div className={"flex-fill"}>Invite</div>
                  </div>
                ))}
              </Card.Body>
            </Accordion.Collapse>
          )}
        </Card>
      ))}
      <ListModal
        isOpen={isModalOpen}
        selectedIndex={selected}
        toggleFn={() => handleClose(selected)}
        participantList={props.list}
      />
    </Accordion>
  );
};

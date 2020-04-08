import React from "react";
import { IParticipant } from "../CreateProject";
import { Accordion, Card } from "react-bootstrap";
import { faChevronRight, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./participantList.module.scss";
import { ListModal } from "../ListModal/ListModal";
import { useHistory, Link } from "react-router-dom";
import {
  CREATE_PROJECT_URL,
  VIEW_REPORT,
} from "../../../contants/routerContants";
import { generateLink } from "../../../utils/generatePath";

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
              <div className="col-3">
                {isNotCreate() && <FontAwesomeIcon icon={faChevronRight} />}{" "}
                {participant.name}
              </div>
              <div className="col-3">{participant.email}</div>
              <div className="col-3">{participant.position}</div>
              {isNotCreate() && <div className="col-3">
                <Link to={{
                  pathname: generateLink(VIEW_REPORT, {candidateId: participant._id}),
                  state: participant
                }}>View Report</Link>
              </div>}
            </div>
          </Accordion.Toggle>
          {isNotCreate() && (
            <Accordion.Collapse eventKey={i.toString()}>
              <Card.Body>
                <div className="d-flex">
                  <h5>
                    Raters{" "}
                    <span className={style.add} onClick={() => handleClose(i)}>
                      <FontAwesomeIcon icon={faPlus} />
                    </span>
                  </h5>
                </div>
                {participant.raters.map((rater, i) => (
                  <div className={"d-flex"} key={`${rater.name}-${i}`}>
                    <div className={"flex-fill"}>{i + 1}.</div>
                    <div className={"flex-fill"}>{rater.name}</div>
                    <div className={"flex-fill"}>{rater.email}</div>
                    <div className={"flex-fill"}>{rater.position}</div>
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

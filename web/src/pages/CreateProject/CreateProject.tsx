import React from "react";
import style from "./createProject.module.scss";
import DatePicker from "react-datepicker";
import { Button } from "react-bootstrap";
import { axiosInstance } from "../../utils/api";
import { toast } from "react-toastify";
import { useHistory, useParams } from "react-router-dom";
import { HOME_URL } from "../../contants/routerContants";
import * as _ from "lodash";
import { USER_ID } from "../../contants/storageContants";
import { ParticipantList } from "./ParticipantList/ParticipantList";

export interface IProject {
  _id?: string;
  name: string;
  description: string;
  startDate: string | null;
  endDate: string | null;
  participants?: IParticipant[];
}



export interface IParticipant {
  _id?: any;
  name: string;
  email: string;
  position: string;
  ratees:  IRatee[];
}

interface IRatee{
  name: string;
  email: string;
  position: string;
  answers: any[];
};

export const CreateProject: React.FC = (props) => {
  const [project, setProject] = React.useState<IProject>({
    name: "",
    description: "",
    startDate: null,
    endDate: null,
    participants: [],
  });
  const [participant, setParticipant] = React.useState<IParticipant>({
    name: "",
    email: "",
    position: "",
    ratees: []
  });

  const history = useHistory();
  const { projectId } = useParams();

  const handleChange = (value: string, key: string) => {
    const proj = Object.assign({}, project) as any;
    proj[key] = value;
    setProject(proj);
  };

  React.useEffect(() => {
    if (history.location.state) {
      const proj = history.location.state as any;
      proj.startDate = new Date(proj.startDate);
      proj.endDate = new Date(proj.endDate);
      delete proj.__v;
      setProject(proj);
    }
  }, [history.location.state]);

  const handleParticipantChange = (value: string, key: string) => {
    const part = Object.assign({}, participant) as any;
    part[key] = value;
    setParticipant(part);
  };

  const createProject = () => {
    let showError = false;
    _.forEach(project, (value, key) => {
      if (!value && !Array.isArray(value)) {
        showError = true;
      }
    });

    if (showError) {
      toast.error("All fields are required");
    } else {
      const url = projectId ? "project/update" : "project/create";
      axiosInstance
        .post(url, {
          ...project,
          userId: localStorage.getItem(USER_ID),
        })
        .then((res) => {
          history.push(HOME_URL);
          toast.success("Successfully created project");
        })
        .catch((err) => {
          toast.error(
            err.response.data.message || err.response.data.error.message
          );
        });
    }
  };

  const addParticipant = () => {
    const re = /\S+@\S+\.\S+/;
    if (
      re.test(participant.email) &&
      participant.name.length !== 0 &&
      participant.position.length !== 0
    ) {
      const proj = Object.assign({}, project) as any;
      proj.participants.push(participant);
      setProject(proj);
      setParticipant({
        name: "",
        email: "",
        position: "",
        ratees: []
      });
    } else {
      toast.error("Fill in proper details");
    }
  };

  return (
    <div className={`container ${style.content}`}>
      <h3>{projectId ? "Update" : "Create"} Project</h3>
      <div className={`row`}>
        <div className="col-md-6 col-12">
          <label>Project Name</label>
          <input
            type="text"
            placeholder="name..."
            value={project.name}
            onChange={(e) => handleChange(e.target.value, "name")}
          />
        </div>
        <div className="col-md-6 col-12">
          <label>Project Description</label>
          <input
            type="text"
            placeholder="description..."
            value={project.description}
            onChange={(e) => handleChange(e.target.value, "description")}
          />
        </div>
        <div className="col-md-6 col-12">
          <label>Review Start Date</label>
          <DatePicker
            selected={project.startDate as any}
            placeholderText="Select Start Date"
            dateFormat="dd MMM yyyy"
            onChange={(date: any) => handleChange(date, "startDate")}
            selectsStart
            startDate={project.startDate as any}
            endDate={project.endDate as any}
          />
        </div>
        <div className="col-md-6 col-12">
          <label>Review End Date</label>
          <DatePicker
            selected={project.endDate as any}
            placeholderText="Select End Date"
            dateFormat="dd MMM yyyy"
            onChange={(date: any) => handleChange(date, "endDate")}
            selectsEnd
            startDate={project.startDate as any}
            endDate={project.endDate as any}
          />
        </div>
        <div className="col-12 mt-3">
          <div className="d-flex">
            <h4>Participant List</h4>
          </div>
        </div>
        <div className="col-12">
          <div className="row">
            <div className="col-md-3 col-12">
              <label>Name</label>
              <input
                type="text"
                value={participant.name}
                onChange={(e) =>
                  handleParticipantChange(e.target.value, "name")
                }
              />
            </div>
            <div className="col-md-3 col-12">
              <label>Email</label>
              <input
                type="text"
                value={participant.email}
                onChange={(e) =>
                  handleParticipantChange(e.target.value, "email")
                }
              />
            </div>
            <div className="col-md-3 col-12">
              <label>Position</label>
              <input
                type="text"
                value={participant.position}
                onChange={(e) =>
                  handleParticipantChange(e.target.value, "position")
                }
              />
            </div>
            <div className="col-md-3 col-12 d-flex align-items-center">
              <Button
                variant="outline-info"
                className={"m-auto"}
                onClick={addParticipant}
              >
                Add Participants
              </Button>
            </div>
          </div>
        </div>
        <div className="col-12">
              <ParticipantList list={project?.participants || []}/>
        </div>
        <div className="col-12 text-center mt-5">
          <Button variant="primary" onClick={createProject}>
            {projectId ? "Update" : "Create"}
          </Button>
        </div>
      </div>
    </div>
  );
};

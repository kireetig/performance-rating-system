import React from "react";
import styles from "./home.module.scss";
import { Button, Card } from "react-bootstrap";
import { CREATE_PROJECT_URL, PROJECT_DETAILS_URL } from "../../contants/routerContants";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../utils/api";
import { toast } from "react-toastify";
import { IProject } from "../CreateProject/CreateProject";
import moment from 'moment';
import { generateLink } from "../../utils/generatePath";

export const Home: React.FC = (props) => {
  const [projects, setProjects] = React.useState<IProject[]>([]);

  React.useEffect(() => {
    axiosInstance
      .get("/project/getAll")
      .then((res) => res.data)
      .then((res) => {
        setProjects(res.data);
      })
      .catch((e) => {
        toast.error("Some error occured");
      });
  }, []);

  return (
    <div className="container-fluid">
      <div className="d-flex mt-3">
          <h3>Projects</h3>
        <div className="ml-auto">
          <Link to={CREATE_PROJECT_URL}>
            <Button variant="primary">New Project</Button>
          </Link>
        </div>
      </div>
      <div className={styles.grid}>
        {projects.map((project) => (
          <Card key={project._id} className={`${styles.card} col`}>
            <Card.Body>
              <Card.Title>{project.name}</Card.Title>
              <Card.Text className={styles.description}>{project.description}</Card.Text>
              <div className="row">
                  <div className="col-6">
                     <h6 className={'mb-0'}>Start Date</h6> 
                    {moment(project.startDate as any).format('DD MMM YYYY')}
                  </div>
                  <div className="col-6">
                     <h6 className={'mb-0'}>End Date</h6> 
                    {moment(project.endDate as any).format('DD MMM YYYY')}
                  </div>
              </div>
              <div className="text-center">
                <Link to={{ pathname: generateLink(PROJECT_DETAILS_URL, {projectId: project._id}), state: project}}>View</Link>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

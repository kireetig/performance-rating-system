import React from "react";
import style from "./rating.module.scss";
import { useHistory } from "react-router-dom";
import { axiosInstance } from "../../utils/api";
import moment from "moment";
import { questions, answers } from "./question";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { LOGIN_URL } from "../../contants/routerContants";

export const Rating: React.FC = (props) => {
  const history = useHistory();
  const [data, setData] = React.useState<any>();
  const [show, setShow] = React.useState<boolean>(false);

  React.useEffect(() => {
    const token = new URLSearchParams(history.location.search).get("token");
    axiosInstance
      .get(`/project/rating?token=${token}`)
      .then((res) => res.data.data)
      .then((res) => {
        console.log(res);
        setData(res);
      });
  }, []);

  const handleAnswer = (
    value: string,
    rateeIndex: number,
    answerIndex: number
  ) => {
    const ratees = data?.ratees;
    ratees[rateeIndex].answers[answerIndex] = value;
  };

  const handleClose = () => {
    setShow(false);
    history.push(LOGIN_URL);
  }

  const handleSubmit = () => {
    let isSubmitable = true;
    for (let ratee of data?.ratees) {
      if (ratee.answers.length !== 10) {
        isSubmitable = false;
        break;
      }
    }
    if (isSubmitable) {
      console.log(data?.ratees);
      const token = new URLSearchParams(history.location.search).get("token");
      const payload = {
        token,
        ratees: data?.ratees
      }
      axiosInstance.post('/project/ratingSubmit', payload).then(res => {
        setShow(true);
      }).catch(err=> {
        toast.error("Something went wrong. Please contact admin");
      });
    } else {
      toast.error("Need to answer all questions to submit");
    }
  };

  return (
    <div className="container mt-2">
      <h4>Welcome {data?.rater?.name}</h4>
      <p className="mt-3">
        you have been invited by <b>{data?.invitedBy.name}</b> to performance
        review for perriod{" "}
        <b>
          {moment(data?.startDate).format("DD MMM YYYY")} -{" "}
          {moment(data?.endDate).format("DD MMM YYYY")}
        </b>{" "}
        of following people
      </p>
      <div className="mt-2">
        <ul>
          {data?.ratees.map((ratee: any, i: number) => (
            <li key={`${ratee.name}-${i}`}>
              {ratee.isSelf ? "Self" : `${ratee.name} (${ratee.email})`}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h5>Questions</h5>
        <div className="mt-3">
          {questions.map((ques, i) => (
            <div key={ques._id} className={style.question}>
              <p>
                {i + 1}. {ques.question}
              </p>
              {data?.ratees.map((ratee: any, rateeIndex: number) => (
                <div key={ratee.email}>
                  <h6>
                    Answering for {ratee.isSelf ? "Self" : `${ratee.name}`}
                  </h6>
                  <div className="d-flex">
                    {answers.map((ans) => (
                      <div className="flex-fill text-center" key={ans.label}>
                        <input
                          type="radio"
                          name={`${ratee.name}-${i}`}
                          value={ans.value}
                          onChange={(e) =>
                            handleAnswer(e.target.value, rateeIndex, i)
                          }
                        />
                        <p>{ans.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="text-center mb-5">
        <Button variant="primary" className="mt-3" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thanks You</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Thanks for giving your valuable feedback. Have a nice day;
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

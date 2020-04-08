import React from "react";
import style from "./report.module.scss";
import { useHistory } from "react-router-dom";
import { questions, answers } from "../Rating/question";

export const Report: React.FC = (props) => {
  const history = useHistory();
  const [ratees, setRatees] = React.useState([]);

  React.useEffect(() => {
    const data = history.location.state as any; 
    setRatees(data?.raters);
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h5>Questions & Answers</h5>
          <div className="mt-3">
            {questions.map((ques, i) => (
              <div key={ques._id} className={style.question}>
                <p>
                  {i + 1}. {ques.question}
                </p>
                {ratees.map((ratee: any, rateeIndex: number) => (
                  <div key={ratee.email}>
                    <h6>
                      <span className={style.label}>{ratee.isSelf ? "Self" : `${ratee.name}`} answer:</span>  {answers[rateeIndex].label}
                    </h6>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

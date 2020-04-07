import React from "react";
import style from "./rating.module.scss";
import { useHistory } from "react-router-dom";
import { axiosInstance } from "../../utils/api";

export const Rating: React.FC = (props) => {
  const history = useHistory();
  const [data, setData] = React.useState<any>();

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
  return (
    <div className="container">
      <p className="mt-3">
        Hello <b>{data?.rater?.name}</b> you have been invited by{" "}
        <b>{data?.invitedBy.name}</b> to review performance of following people
      </p>
      <div className="mt-2">
        <ul>
          {data?.ratees.map((ratee: any, i: number) => (
            <li key={`${ratee.name}-${i}`}>{ratee.name} ({ratee.email})</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

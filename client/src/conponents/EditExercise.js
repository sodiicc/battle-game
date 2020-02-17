import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";

export const EditExercise = (props) => {
  const [exercise, setExercise] = useState({
    username: "",
    description: "",
    duration: 0,
    date: new Date()
  });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("/heroes/" + props.match.params.id)
      .then(res => {
        const data = res.data
        setExercise({
          username: data.username,
          description: data.description,
          duration: data.duration,
          date: new Date(data.date)
        });
      })
      .catch(err => console.log(err))

      axios.get("/items").then(res => {
      if (res.data.length > 0) {
        setUsers(
          res.data.map(user => {
            return user.username;
          })
        );        
      }
    });

  }, [props.match.params.id]);

  useEffect(() => {
    setExercise({
      ...exercise,
      username: users[0]
    })
    // eslint-disable-next-line 
  }, [users])

  const onChangeUsername = e => {
    setExercise({
      ...exercise,
      username: e.target.value
    });
    console.log('exercise', exercise)
  };
  const onChangeDescription = e => {
    setExercise({
      ...exercise,
      description: e.target.value
    });
  };
  const onChangeDuration = e => {
    setExercise({
      ...exercise,
      duration: e.target.value
    });
  };
  const onChangeDate = date => {
    setExercise({
      ...exercise,
      date
    });
  };
  const onSubmit = e => {
    e.preventDefault();

    axios
      .post("/heroes/update/"+ props.match.params.id, exercise)
      .then(res => console.log(res.data));

      props.history.push('/')
  };

  return (
    <div>
      <h3>Edit Exercise Log</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <select
            required
            className="form-control"
            value={exercise.username}
            onChange={onChangeUsername}
          >
            {users.map(user => {
              return (
                <option key={user} value={user}>
                  {user}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <label>Description: </label>
          <input
            typr="text"
            required
            className="form-control"
            value={exercise.description}
            onChange={onChangeDescription}
          />
        </div>
        <div className="form-group">
          <label>Duration: </label>
          <input
            typr="text"
            required
            className="form-control"
            value={exercise.duration}
            onChange={onChangeDuration}
          />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker selected={exercise.date} onChange={onChangeDate} />
          </div>
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Edit Exercise Log"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};

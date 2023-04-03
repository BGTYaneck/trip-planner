import React from "react";
import { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import DatePicker from "react-datepicker";
import Modal from "react-bootstrap/Modal";
import "./App.css";
import Trip from "./components/Trip";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import tripData from "./data/tripData";
import * as Yup from "yup";

const App = () => {
  const [list, setList] = useState<tripData[]>(
    JSON.parse(localStorage.getItem("data")!) ?? []
  );
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(list));
  }, [list]);

  function sortTrips(tripsToSort: tripData[]) {
    const sortedTrips = tripsToSort.sort(
      (a, b) => Date.parse(b.dateStart) - Date.parse(a.dateStart)
    );
    setList(sortedTrips);
  }

  function handleAdd(dest: string, start: string, end: string) {
    const newList = [...list];
    newList.push({
      id: list.length == 0 ? 0 : list[list.length - 1].id + 1,
      destination: dest,
      dateStart: start,
      dateEnd: end,
      persons: [{ person: "Jack", items: ["Toothbrush", "Hamster"] }],
    });
    sortTrips(newList);
  }

  function handleRemove(id: Number) {
    const newList = list.filter((item: tripData) => item.id !== id);
    sortTrips(newList);
  }

  const validationSchema = Yup.object({
    destination: Yup.string()
      .required("Field required!")
      .max(32, "Destination name too long!"),
    dateStart: Yup.date()
      .typeError("Please enter a valid date!")
      .required("This field is required!")
      .min("2023-01-01", "Too early!!"),
    dateEnd: Yup.date()
      .typeError("Please enter a valid date!")
      .required("This field is required!")
      .min("2023-01-01", "Too early!"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmitHandler = (data: any) => {
    handleAdd(
      data.destination,
      data.dateStart.toLocaleDateString(),
      data.dateEnd.toLocaleDateString()
    );
    reset();
  };

  return (
    <div className="d-flex flex-column mx-auto gap-3 w-75">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a trip</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <div className="d-flex flex-column">
              <label htmlFor="destination">Destination: </label>
              <input
                className="bg-white text-black border-1"
                placeholder="Destination name..."
                {...register("destination")}
                type="text"
                required
              />
              <p>{errors.destination?.message?.toString()}</p>
              <br />
            </div>
            <div className="d-flex justify-content-evenly">
              <div className="d-flex flex-column align-items-center">
                <label htmlFor="dateStart">Start date: </label>
                <input
                  className="bg-white text-black border-1"
                  {...register("dateStart")}
                  type="date"
                  required
                />
                <p>{errors.dateStart?.message?.toString()}</p>
              </div>
              -
              <div className="d-flex flex-column align-items-center">
                <label htmlFor="dateEnd">Finish date: </label>
                <input {...register("dateEnd")} type="date" required />
                <p>{errors.dateEnd?.message?.toString()}</p>
              </div>
            </div>
            <div className="d-flex justify-content-evenly">
              <button
                onClick={() => handleClose()}
                style={{
                  color: "black",
                  backgroundColor: "white",
                }}
              >
                Close
              </button>
              <button type="submit">Confirm</button>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      <div className="d-flex flex-row gap-5 align-self-center">
        <span
          className="btn btn-lg"
          onClick={() => {
            sortTrips(list);
          }}
        >
          My Trips
        </span>
        <button onClick={() => handleShow()}>Add a Trip +</button>
      </div>
      <div className="d-flex flex-column gap-2">
        {list == null
          ? ""
          : list.map((item: tripData, i: any) => {
              return (
                <Trip
                  key={i}
                  destination={item.destination}
                  dateStart={item.dateStart}
                  dateEnd={item.dateEnd}
                  persons={item.persons}
                  onClick={() => handleRemove(item.id)}
                />
              );
            })}
      </div>
    </div>
  );
};

export default App;

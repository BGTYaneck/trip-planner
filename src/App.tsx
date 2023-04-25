import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import ToastContainer from "react-bootstrap/ToastContainer";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-bootstrap/Modal";
import Toast from "react-bootstrap/Toast";
import tripData from "./data/tripData";
import { IconCheck, IconX } from "@tabler/icons-react";
import Trip from "./components/Trip";
import * as Yup from "yup";
import "./App.css";

const App = () => {
  const [list, setList] = useState<tripData[]>(
    JSON.parse(localStorage.getItem("data")!) ?? []
  );

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(list));
  }, [list]);

  const [showToast, setShowToast] = useState(false);

  const displayToast = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function sortTrips(tripsToSort: tripData[]) {
    const sortedTrips = tripsToSort.sort(function (a, b) {
      return a.dateStart.localeCompare(b.dateStart);
    });
    displayToast();
    setList(sortedTrips);
  }

  //Persons and items get added in Trip.tsx
  const empty: string[] = [];
  function handleAdd(dest: string, start: string, end: string) {
    const highestId = Math.max(...list.map((o) => o.id), 0);
    const newList = [...list];
    newList.push({
      id: list.length == 0 ? 0 : highestId + 1,
      destination: dest,
      dateStart: start,
      dateEnd: end,
      persons: [{ itemsId: 0, person: "", items: empty }],
    });
    handleClose();
    sortTrips(newList);
  }

  function handleRemove(id: Number) {
    const newList = list.filter((item: tripData) => item.id !== id);
    sortTrips(newList);
  }

  function handleEdit(id: Number) {}

  const validationSchema = Yup.object({
    destination: Yup.string()
      .required("This field is required!")
      .min(3, "Destination name too short!")
      .max(32, "Destination name too long!"),
    dateStart: Yup.date()
      .typeError("Please enter a valid date!")
      .required("This field is required!"),
    dateEnd: Yup.date()
      .typeError("Please enter a valid date!")
      .required("This field is required!")
      .min(Yup.ref("dateStart"), "Inocrrect end date!"),
    person: Yup.array().of(Yup.string()),
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
          <Modal.Title>Trip Manager</Modal.Title>
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
              />
              <p className="errorText">
                {errors.destination?.message?.toString()}
              </p>
              <br />
            </div>
            <div className="d-flex justify-content-evenly">
              <div className="d-flex flex-column align-items-center">
                <label htmlFor="dateStart">Start date: </label>
                <input
                  className="bg-white text-black border-1"
                  {...register("dateStart")}
                  type="date"
                />
                <p className="errorText">
                  {errors.dateStart?.message?.toString()}
                </p>
              </div>
              -
              <div className="d-flex flex-column align-items-center">
                <label htmlFor="dateEnd">Finish date: </label>
                <input
                  className="bg-white text-black border-1"
                  type="date"
                  {...register("dateEnd")}
                />
                <p className="errorText">
                  {errors.dateEnd?.message?.toString()}
                </p>
              </div>
            </div>
            <div className="d-flex justify-content-evenly m-2">
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
        <span className="btn btn-lg" onClick={() => sortTrips(list)}>
          Refresh
        </span>
        <button onClick={() => handleShow()}>Add a Trip +</button>
      </div>
      <div className="d-flex flex-column gap-2">
        {list.length != 0 ? (
          list.map((item: tripData, i: any) => {
            return (
              <Trip
                key={i}
                id={item.id}
                trip={item}
                tripsList={list}
                setTripsList={sortTrips}
                handleRemove={() => handleRemove(item.id)}
                handleEdit={() => handleEdit(item.id)}
              />
            );
          })
        ) : (
          <p className="text-center opacity-50">
            No trips yet. To get Started add trips using the button above ^
          </p>
        )}
      </div>
      <ToastContainer>
        <Toast show={showToast} onClose={() => setShowToast(false)}>
          <Toast.Header>
            <strong className="me-auto text-success">
              <IconCheck />
              Success!
            </strong>
            <small>Notification</small>
          </Toast.Header>
          <Toast.Body>Operation successful!</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default App;

import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-bootstrap/Modal";
import tripData from "./data/tripData";
import Trip from "./components/Trip";
import * as Yup from "yup";
import "./App.css";

const App = () => {
  const [data, setData] = useState({ person: "", items: [] });
  const [id, setId] = useState(1);

  useEffect(() => {
    if (id < list.length) handleAddPersons(id, data);
  }, [data]);

  const [list, setList] = useState<tripData[]>(
    JSON.parse(localStorage.getItem("data")!) ?? []
  );

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(list));
  }, [list]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //Not working for now
  function sortTrips(tripsToSort: tripData[]) {
    const sortedTrips = tripsToSort.sort(function (a, b) {
      //@ts-ignore
      return new Date(b.dateStart) - new Date(a.dateStart);
    });
    console.log(sortedTrips);
    setList(sortedTrips);
  }

  function handleAddPersons(
    id: any,
    data: { person: string; items: string[] }
  ) {
    const newList = [...list];
    newList[id].persons.push(data);
    console.log(data);
    setList(newList);
  }

  //Persons and items get added in different components
  const empty: string[] = [];
  function handleAdd(dest: string, start: string, end: string, person: string) {
    const newList = [...list];
    newList.push({
      id: list.length == 0 ? 0 : list[list.length - 1].id + 1,
      destination: dest,
      dateStart: start,
      dateEnd: end,
      persons: [{ person: "", items: empty }],
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
      data.dateEnd.toLocaleDateString(),
      data.person
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
                  handleRemove={() => handleRemove(item.id)}
                  handleEdit={() => handleEdit(item.id)}
                  data={data}
                  setData={setData}
                  id={item.id}
                  setId={setId}
                />
              );
            })}
      </div>
    </div>
  );
};

export default App;

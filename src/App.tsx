import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import ToastContainer from "react-bootstrap/ToastContainer";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { IconCheck, IconPlus, IconSearch } from "@tabler/icons-react";
import { yupResolver } from "@hookform/resolvers/yup";
import Tooltip from "react-bootstrap/Tooltip";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-bootstrap/Modal";
import Toast from "react-bootstrap/Toast";
import tripData from "./data/tripData";
import Trip from "./components/Trip";
import * as Yup from "yup";
import "./App.css";

const App = () => {
  const [list, setList] = useState<tripData[]>(
    JSON.parse(localStorage.getItem("data")!) ?? []
  );

  const [showToast, setShowToast] = useState(false);
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(list));
  }, [list]);

  const displayToast = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 1500);
  };

  useEffect(() => {
    if (search !== "") {
      list.filter(
        (item: tripData) =>
          item.destination.includes(search!) ||
          item.dateStart.includes(search!) ||
          item.dateEnd.includes(search!)
      );
    }
  }, [search]);

  function sortTrips(tripsToSort: tripData[]) {
    const sortedTrips = tripsToSort.sort(function (a, b) {
      return a.dateStart.localeCompare(b.dateStart);
    });
    displayToast();
    setList(sortedTrips);
  }

  //Participants and items get added in Trip.tsx
  const empty: string[] = [];
  function handleAdd(
    dest: string,
    start: string,
    end: string,
    tripType: string
  ) {
    const highestId = Math.max(...list.map((o) => o.id), 0);
    const newList = [...list];
    newList.push({
      id: list.length == 0 ? 0 : highestId + 1,
      destination: dest,
      dateStart: start,
      dateEnd: end,
      type: tripType,
      persons: [{ itemsId: 0, person: "", items: empty }],
    });
    handleClose();
    sortTrips(newList);
  }

  function handleRemove(id: Number) {
    const newList = list.filter((item: tripData) => item.id !== id);
    sortTrips(newList);
  }

  const tripsSchema = Yup.object({
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
    type: Yup.string().required("Please select one of the available options!"),
    person: Yup.array().of(Yup.string()),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(tripsSchema),
  });

  const onSubmitHandler = (data: any) => {
    handleAdd(
      data.destination,
      data.dateStart.toLocaleDateString(),
      data.dateEnd.toLocaleDateString(),
      data.tripType
    );
    reset();
  };

  return (
    <div className="d-flex flex-column mx-auto gap-3 autoSize">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Trip Manager</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <div className="d-flex flex-column">
              <label htmlFor="destination">Destination:</label>
              <input
                className="form-control"
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
                  className="form-control"
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
                  className="form-control"
                  type="date"
                  {...register("dateEnd")}
                />
                <p className="errorText">
                  {errors.dateEnd?.message?.toString()}
                </p>
              </div>
            </div>
            <label htmlFor="tripType">Trip type: </label>
            <select
              className="custom-select form-control mt-1"
              placeholder="Hej"
              {...register("type")}
            >
              <option>Beach & Relaxation</option>
              <option>Active</option>
              <option>City Breaks</option>
              <option>Culture & History</option>
              <option>Cycling</option>
              <option>Expedition cruising</option>
              <option>Escorted</option>
            </select>
            <p className="errorText">{errors.type?.message?.toString()}</p>
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn w-100">
                Confirm
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      <div className="d-flex flex-row justify-content-center align-self-center gap-3">
        <input
          className="form-control"
          type="text"
          placeholder="🔎 Search..."
          //@ts-ignore
          onChange={(e) => setSearch(e.target.value)}
        />
        <OverlayTrigger
          placement="bottom"
          overlay={
            <Tooltip id="tooltip" style={{ position: "fixed" }}>
              <strong>Add a trip</strong>
            </Tooltip>
          }
        >
          <div className="d-flex flex-row gap-5 align-self-center">
            <button onClick={() => handleShow()}>
              <IconPlus />
            </button>
          </div>
        </OverlayTrigger>
      </div>
      <div className="d-flex flex-column gap-2">
        {list.length != 0 ? (
          search != "" ? (
            list
              .filter(
                (item: tripData) =>
                  item.destination
                    .toUpperCase()
                    //@ts-ignore
                    .includes(search!.toUpperCase()) ||
                  //@ts-ignore
                  item.dateStart
                    .toUpperCase()
                    .includes(search!.toUpperCase()) ||
                  //@ts-ignore
                  item.dateEnd.toUpperCase().includes(search!.toUpperCase())
              )
              .map((item: tripData, i: any) => {
                console.log(Date.parse(item.dateStart));
                return (
                  <Trip
                    key={i}
                    id={item.id}
                    trip={item}
                    tripsList={list}
                    setTripsList={sortTrips}
                    handleRemove={() => handleRemove(item.id)}
                  />
                );
              })
          ) : (
            list.map((item: tripData, i: any) => {
              return (
                <Trip
                  key={i}
                  id={item.id}
                  trip={item}
                  tripsList={list}
                  setTripsList={sortTrips}
                  handleRemove={() => handleRemove(item.id)}
                />
              );
            })
          )
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

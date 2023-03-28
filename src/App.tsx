import React from "react";
import { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage, useField } from "formik";
import Modal from "react-bootstrap/Modal";
import "./App.css";
import Trip from "./components/Trip";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import tripData from "./data/tripData";
import * as Yup from "yup";
import parse from "date-fns/parse";

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

  function sortTrips(tripsToSort: tripData[]) {
    const sortedTrips = tripsToSort.sort(
      (a, b) => Date.parse(b.dateStart) - Date.parse(a.dateStart)
    );
    setList(sortedTrips);
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        marginLeft: "auto",
        marginRight: "auto",
        height: "100vh",
        flexDirection: "column",
        gap: "15px",
      }}
    >
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a trip</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{ destination: "", dateStart: "", dateEnd: "" }}
            validationSchema={Yup.object({
              destination: Yup.string()
                .required("Field required!")
                .max(32, "Destination name too long!"),
              dateStart: Yup.date()
                .transform(function (value, originalValue) {
                  if (this.isType(value)) {
                    return value;
                  }
                  const result = parse(originalValue, "dd.MM.yyyy", new Date());
                  return result;
                })
                .typeError("Please enter a valid date!")
                .required("This field is required!")
                .min("2023-01-01", "To early!!"),
              dateEnd: Yup.date()
                .transform(function (value, originalValue) {
                  if (this.isType(value)) {
                    return value;
                  }
                  const result = parse(originalValue, "dd.MM.yyyy", new Date());
                  return result;
                })
                .typeError("Please enter a valid date!")
                .required("This field is required!")
                .min("2023-01-01", "Too early!"),
            })}
            onSubmit={(values) =>
              handleAdd(values.destination, values.dateStart, values.dateEnd)
            }
          >
            <div>
              <div style={{ margin: "20px" }}>
                <label htmlFor="destination">Destination</label>
                <Field
                  type="text"
                  id="destination"
                  name="destination"
                  placeholder="Destination..."
                  style={{
                    background: "white",
                    color: "black",
                    width: "100%",
                  }}
                />
                <ErrorMessage name="destination" />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: "10px",
                  margin: "20px",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label htmlFor="start-date">Start Date</label>
                  <Field
                    id="start-date"
                    name="dateStart"
                    placeholder="dd.mm.yyyy"
                    style={{
                      background: "white",
                      color: "black",
                      width: "100%",
                    }}
                  />
                  <ErrorMessage name="dateStart" />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label htmlFor="end-date">End date</label>
                  <Field
                    id="end-date"
                    name="dateEnd"
                    placeholder="dd.mm.yyyy"
                    style={{
                      background: "white",
                      color: "black",
                      width: "100%",
                    }}
                  />
                  <ErrorMessage name="dateEnd" />
                </div>
              </div>
            </div>
          </Formik>
        </Modal.Body>
        <Modal.Footer>
          <button
            onClick={() => handleClose()}
            style={{
              color: "black",
              backgroundColor: "white",
            }}
          >
            Close
          </button>
          <button type="submit"> Confirm</button>
        </Modal.Footer>
      </Modal>

      <p style={{ display: "flex", gap: "20px" }}>
        <span style={{ fontSize: "2rem", fontWeight: "bolder" }}>My trips</span>
        <button onClick={() => handleShow()}>Add a trip + </button>
      </p>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: "5rem",
          justifyContent: "center",
        }}
      >
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

import React from "react";
import { IconTrash, IconEdit, IconChecks, IconX } from "@tabler/icons-react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { yupResolver } from "@hookform/resolvers/yup";
import Tooltip from "react-bootstrap/Tooltip";
import { useForm } from "react-hook-form";
import Modal from "react-bootstrap/Modal";
import tripData from "../data/tripData";
import { useState } from "react";
import Items from "./Items";
import * as Yup from "yup";
import "../App.css";

type Props = {
  id: any;
  trip: tripData;
  tripsList: tripData[];
  setTripsList: Function;
  handleRemove: Function;
};

const Trip = (props: Props) => {
  const [show, setShow] = useState(false);
  const [editing, setEditing] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const itemsSchema = Yup.object({
    person: Yup.string()
      .min(3, "Name too short!")
      .max(24, "Name too long!")
      .required("Name cannot be empty!"),
    items: Yup.string().max(64, "Too many charactes!"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(itemsSchema),
  });

  const onSubmitHandler = (data: any) => {
    const newList = [...props.tripsList];
    //Finding the object with the right id
    const object = newList.find((e) => {
      return e.id == props.id;
    });
    //@ts-ignore - Removing the first "empty" person
    object!.persons = object!.persons.filter((item: any) => item.person !== "");
    //Adding the data;
    data.items = data.items.split(",");
    const highestId = Math.max(...object!.persons.map((o) => o.itemsId), 0);
    object!.persons.push({
      itemsId: highestId + 1,
      person: data.person,
      items: data.items,
    });
    props.setTripsList(newList);
    reset();
    handleClose();
    console.log(newList);
  };

  //Delete
  const handlePersonDelete = (itemsId: number) => {
    const newList = [...props.tripsList];
    const object = props.tripsList.find((e) => {
      return e.id == props.id;
    });
    object!.persons = object!.persons.filter(
      (item: any) => item.itemsId !== itemsId
    );
    props.setTripsList(newList);
  };

  //Edit
  const validationSchemaEdit = Yup.object({
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
  });

  //Check if the day is smaller than 10, if so add a 0 (required format for intialValues)
  const convertDates = (date: string) => {
    if (parseInt(date.split(".")[0]) < 10) {
      return ("0" + date).split(".").reverse().join("-");
    } else return date.split(".").reverse().join("-");
  };

  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    formState: { errors: errorsEdit },
    reset: resetEdit,
  } = useForm({
    resolver: yupResolver(validationSchemaEdit),
    defaultValues: {
      destination: props.trip.destination,
      dateStart: convertDates(props.trip.dateStart),
      dateEnd: convertDates(props.trip.dateEnd),
    },
  });

  const onSubmitHandlerEdit = (data: any) => {
    const newList = [...props.tripsList];
    const object = newList.find((e) => {
      return e.id == props.id;
    });
    object!.destination = data.destination;
    object!.dateStart = data.dateStart.toLocaleDateString();
    object!.dateEnd = data.dateEnd.toLocaleDateString();
    props.setTripsList(newList);
    resetEdit({
      destination: props.trip.destination,
      dateStart: convertDates(props.trip.dateStart),
      dateEnd: convertDates(props.trip.dateEnd),
    });
    setEditing(!editing);
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Participants Manager</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <div className="d-flex flex-column">
              <label htmlFor="destination">Add a participant</label>
              <input
                className="form-control"
                placeholder="Participant name..."
                {...register("person")}
                type="text"
              />
              <p className="errorText">{errors.person?.message?.toString()}</p>
              <br />
              <label htmlFor="destination">Items (Optional)</label>
              <input
                className="form-control"
                placeholder="First Item, Second Item, Third Item"
                {...register("items")}
                type="text"
              />
              <p className="errorText">{errors.items?.message?.toString()}</p>
              <br />
              <button type="submit" className="btn">
                Confirm
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      <div className="card p-3">
        {editing ? (
          <form
            className="d-flex flex-wrap align-items-center justify-content-between mb-2"
            onSubmit={handleSubmitEdit(onSubmitHandlerEdit)}
          >
            <div className="d-flex flex-row gap-2 fw-bold align-items-center justify-center">
              <div className="d-flex flex-column align-self-baseline">
                <input
                  className="form-control"
                  placeholder="Destination..."
                  {...registerEdit("destination")}
                  type="text"
                />
                <p className="errorText ">
                  {errorsEdit.destination?.message?.toString()}
                </p>
              </div>
              <OverlayTrigger
                placement="bottom"
                overlay={
                  <Tooltip id="tooltip" style={{ position: "fixed" }}>
                    <strong>Confirm</strong>
                  </Tooltip>
                }
              >
                <button
                  type="submit"
                  className="btn btn-transparent align-self-baseline"
                >
                  <IconChecks className="clickIcon" />
                </button>
              </OverlayTrigger>
              <OverlayTrigger
                placement="bottom"
                overlay={
                  <Tooltip id="tooltip" style={{ position: "fixed" }}>
                    <strong>Cancel</strong>
                  </Tooltip>
                }
              >
                <button className="btn btn-transparent align-self-baseline">
                  <IconX
                    className="clickIcon"
                    onClick={() => {
                      setEditing(!editing), resetEdit();
                    }}
                  />
                </button>
              </OverlayTrigger>
            </div>
            <div className="d-flex flex-row gap-2">
              <div className="d-flex flex-column align-self-baseline">
                <input
                  className="form-control"
                  type="date"
                  {...registerEdit("dateStart")}
                />
                <p className="errorText">
                  {errorsEdit.dateStart?.message?.toString()}
                </p>
              </div>
              <p className="align-self-baseline">-</p>
              <div className="d-flex flex-column align-self-baseline">
                <input
                  className="form-control"
                  type="date"
                  {...registerEdit("dateEnd")}
                />
                <p className="errorText">
                  {errorsEdit.dateEnd?.message?.toString()}
                </p>
              </div>
            </div>
          </form>
        ) : (
          <div className="d-flex flex-wrap align-items-center justify-content-between">
            <div className="d-flex flex-row gap-2 fw-bold align-items-center justify-center">
              <h3>{props.trip.destination} </h3>
              <OverlayTrigger
                placement="bottom"
                overlay={
                  <Tooltip id="tooltip" style={{ position: "fixed" }}>
                    <strong>Delete Trip</strong>
                  </Tooltip>
                }
              >
                <IconTrash
                  className="clickIcon"
                  onClick={() => props.handleRemove()}
                />
              </OverlayTrigger>
              <OverlayTrigger
                placement="bottom"
                overlay={
                  <Tooltip id="tooltip" style={{ position: "fixed" }}>
                    <strong>Edit Trip</strong>
                  </Tooltip>
                }
              >
                <IconEdit
                  className="clickIcon"
                  onClick={() => {
                    setEditing(!editing), resetEdit();
                  }}
                />
              </OverlayTrigger>
            </div>
            <span style={{ opacity: "40%" }}>
              {props.trip.dateStart} - {props.trip.dateEnd}
            </span>
          </div>
        )}
        <div className="d-flex gap-3 flex-column flex-wrap">
          {(props.trip.persons.length == 1 &&
            props.trip.persons[0].person == "") ||
          //@ts-ignore
          props.trip.persons.length == 0 ? (
            <p
              className="opacity-50 text-center display-6 mb-1"
              style={{
                fontSize: "14px",
              }}
            >
              No participants have been added yet! Use the button below to add
              people and add items for them to take!
            </p>
          ) : (
            props.trip.persons.map((item, i) => {
              return (
                <Items
                  key={i}
                  id={props.id}
                  itemsId={item.itemsId}
                  personName={item.person}
                  itemsList={item.items}
                  handleItemDelete={handlePersonDelete}
                  tripsList={props.tripsList}
                  setTripsList={props.setTripsList}
                />
              );
            })
          )}
        </div>
        <button
          className="d-flex mt-2 btn justify-content-center"
          onClick={() => handleShow()}
        >
          Add a participant +
        </button>
      </div>
    </div>
  );
};

export default Trip;

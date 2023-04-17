import React from "react";
import { IconTrash, IconEdit } from "@tabler/icons-react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import Items from "./Items";
import * as Yup from "yup";
import "../App.css";

type Props = {
  destination: string;
  dateStart: string;
  dateEnd: string;
  persons: { person: string; items: string[] }[];
  handleRemove: Function;
  handleEdit: Function;
  data: any;
  setData: Function;
  id: Number;
  setId: Function;
};

const Trip = (props: Props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const validationSchema = Yup.object({
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
    resolver: yupResolver(validationSchema),
  });

  const onSubmitHandler = (data: any) => {
    props.setId(props.id);
    data.items = data.items.split(",");
    props.setData(data);
    reset();
    handleClose();
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Persons Manager</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <div className="d-flex flex-column">
              <label htmlFor="destination">Add a person</label>
              <input
                className="bg-white text-black border-1"
                placeholder="Person name..."
                {...register("person")}
                type="text"
              />
              <p className="errorText">{errors.person?.message?.toString()}</p>
              <br />
              <label htmlFor="destination">Items (Optional)</label>
              <input
                className="bg-white text-black border-1"
                placeholder="First Item, Second Item, Third Item"
                {...register("items")}
                type="text"
              />
              <p className="errorText">{errors.items?.message?.toString()}</p>
              <br />
              <button className="btn">Confirm</button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      <div className="card p-3">
        <div className="d-flex flex-wrap align-items-center justify-content-between">
          <div className="d-flex flex-row gap-2 align-items-center justify-center">
            <h3>{props.destination} </h3>
            <IconTrash
              className="clickIcon"
              onClick={() => props.handleRemove()}
            />
            <IconEdit
              className="clickIcon"
              onClick={() => props.handleEdit()}
            />
          </div>
          <span style={{ opacity: "40%" }}>
            {props.dateStart} - {props.dateEnd}
          </span>
        </div>
        <div className="d-flex flex-row gap-5 flex-wrap">
          {props.persons.map((item, i) => {
            return (
              <Items key={i} personName={item.person} itemsList={item.items} />
            );
          })}
        </div>
        <button
          className="d-flex mt-2 btn justify-content-center"
          onClick={() => handleShow()}
        >
          Add a person +
        </button>
      </div>
    </div>
  );
};

export default Trip;

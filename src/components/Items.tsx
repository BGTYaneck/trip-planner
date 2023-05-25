import React from "react";
import { IconEraser, IconBallpen } from "@tabler/icons-react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { IconChecks, IconX } from "@tabler/icons-react";
import { yupResolver } from "@hookform/resolvers/yup";
import Tooltip from "react-bootstrap/Tooltip";
import { useForm } from "react-hook-form";
import tripData from "../data/tripData";
import { useState } from "react";
import * as Yup from "yup";
import "../App.css";

type Props = {
  id: any;
  itemsId: number;
  personName: string;
  itemsList: string[];
  handleItemDelete: Function;
  tripsList: tripData[];
  setTripsList: Function;
};

const Items = (props: Props) => {
  const [editing, setEditing] = useState(false);

  const itemsSchemaEdit = Yup.object({
    person: Yup.string()
      .min(3, "Name too short!")
      .max(24, "Name too long!")
      .required("Name cannot be empty!"),
    items: Yup.string().max(64, "Too many charactes!"),
  });

  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    formState: { errors: errorsEdit },
    reset: resetEdit,
  } = useForm({
    resolver: yupResolver(itemsSchemaEdit),
    defaultValues: {
      person: props.personName,
      items: props.itemsList.toString(),
    },
  });

  const onSubmitHandlerEdit = (data: any) => {
    const newList = [...props.tripsList];
    const object = newList.find((e) => {
      return e.id == props.id;
    });
    const objectItems = object!.persons.find((e) => {
      return e.itemsId == props.itemsId;
    });
    objectItems!.person = data.person;
    objectItems!.items = data.items.split(",");
    props.setTripsList(newList);
    resetEdit({ person: props.personName, items: props.itemsList.toString() });
    setEditing(!editing);
  };

  return (
    <div>
      {editing ? (
        <form
          className="mb-1 fw-bold text-capitalize gap-2 d-flex flex-column align-items-center mt-2"
          onSubmit={handleSubmitEdit(onSubmitHandlerEdit)}
        >
          <div className="d-flex flex-row w-100">
            <div className="d-flex flex-column w-100">
              <input
                className="form-control"
                placeholder="Participant name..."
                {...registerEdit("person")}
                type="text"
              />
              <p className="errorText">
                {errorsEdit.person?.message?.toString()}
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
                <IconChecks className="smallIcon" />
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
                  className="smallIcon"
                  onClick={() => {
                    setEditing(!editing), resetEdit();
                  }}
                />
              </button>
            </OverlayTrigger>
          </div>
          <div className="d-flex flex-column w-100">
            <input
              className="form-control"
              placeholder="First Item, Second Item, Third Item"
              {...registerEdit("items")}
              type="text"
            />
            <p className="errorText">{errorsEdit.items?.message?.toString()}</p>
          </div>
        </form>
      ) : (
        <div>
          <div className="mb-1 fw-bold text-capitalize gap-2 d-flex flex-row align-items-center mt-2">
            {props.personName}
            <div className="d-flex flex-row gap-1 w-25">
              <OverlayTrigger
                placement="bottom"
                overlay={
                  <Tooltip id="tooltip" style={{ position: "fixed" }}>
                    <small>Delete participant</small>
                  </Tooltip>
                }
              >
                <IconEraser
                  className="smallIcon"
                  onClick={() => props.handleItemDelete(props.itemsId)}
                />
              </OverlayTrigger>
              <OverlayTrigger
                placement="bottom"
                overlay={
                  <Tooltip id="tooltip" style={{ position: "fixed" }}>
                    <small>Edit participant</small>
                  </Tooltip>
                }
              >
                <IconBallpen
                  className="smallIcon"
                  onClick={() => setEditing(!editing)}
                />
              </OverlayTrigger>
            </div>
          </div>
          {props.itemsList.map((item: string, index: any) => {
            return (
              <span key={index} className="text-capitalize opacity-50">
                {(index ? ", " : "") + item}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Items;

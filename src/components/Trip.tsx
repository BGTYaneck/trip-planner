import React from "react";
import { IconTrash, IconEdit } from "@tabler/icons-react";
import Items from "./Items";
import "../App.css";

type Props = {
  destination: string;
  dateStart: string;
  dateEnd: string;
  persons: { person: string; items: string[] }[];
  handleRemove: Function;
  handleEdit: Function;
};

const Trip = (props: Props) => {
  return (
    <div className="card p-3">
      <div className="d-flex flex-wrap align-items-center justify-content-between">
        <div className="d-flex flex-row gap-2 align-items-center justify-center">
          <h3>{props.destination} </h3>
          <IconTrash
            className="clickIcon"
            onClick={() => props.handleRemove()}
          />
          <IconEdit className="clickIcon" onClick={() => props.handleEdit()} />
        </div>
        <span style={{ opacity: "40%" }}>
          {props.dateStart} - {props.dateEnd}
        </span>
      </div>
      <div className="d-flex flex-row gap-5 flex-wrap">
        {props.persons.map((item) => {
          return <Items personName={item.person} itemsList={item.items} />;
        })}
      </div>
    </div>
  );
};

export default Trip;

import React from "react";
import Items from "./Items";
import { IconTrash } from "@tabler/icons-react";

type Props = {
  destination: string;
  dateStart: string;
  dateEnd: string;
  persons: { person: string; items: string[] }[];
  onClick: Function;
};

const Trip = (props: Props) => {
  return (
    <div className="card">
      <p
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "15px",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span
          style={{
            fontSize: "1.7rem",
            fontWeight: "bolder",
          }}
        >
          {props.destination} <IconTrash onClick={() => props.onClick()} />
        </span>
        <span style={{ opacity: "40%" }}>
          {props.dateStart} - {props.dateEnd}
        </span>
      </p>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "15px",
          flexWrap: "wrap",
        }}
      >
        {props.persons.map((item) => {
          return <Items personName={item.person} itemsList={item.items} />;
        })}
      </div>
    </div>
  );
};

export default Trip;

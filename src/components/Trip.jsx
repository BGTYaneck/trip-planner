import React from "react";
import Items from "./Items";

const Trip = (props) => {
  return (
    <div
      style={{
        background: "#F7F7F9",
        width: "400px",
        borderRadius: "5px",
        minHeight: "200px",
        padding: "1%",
        display: "flex",
        justifyContent: "left",
        flexDirection: "column",
        boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
      }}
    >
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
          {props.destination}
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

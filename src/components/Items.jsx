import React from "react";

const Items = (props) => {
  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <p style={{ fontWeight: "bold", marginBottom: "-5px" }}>
        {props.personName}
      </p>
      {props.itemsList.map((item, index) => {
        return (
          <span key={index} className="text-capitalize">
            {(index ? ", " : "") + item}
          </span>
        );
      })}
    </div>
  );
};

export default Items;

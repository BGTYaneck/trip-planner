import React from "react";

type Props = {
  personName: string;
  itemsList: string[];
};

const Items = (props: Props) => {
  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <p style={{ fontWeight: "bold", marginBottom: "-5px" }}>
        {props.personName}
      </p>
      {props.itemsList.map((item: string, index: any) => {
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

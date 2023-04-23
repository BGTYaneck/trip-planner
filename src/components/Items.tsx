import React from "react";
import { IconSquareRoundedMinus } from "@tabler/icons-react";
import "../App.css";

type Props = {
  personName: string;
  itemsList: string[];
};

const Items = (props: Props) => {
  return (
    <div>
      <p className="mb-1 fw-bold text-capitalize">
        {props.personName}
        {<IconSquareRoundedMinus />}
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

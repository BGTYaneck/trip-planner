import React from "react";
import { IconBackspaceFilled } from "@tabler/icons-react";
import "../App.css";

type Props = {
  itemsId: number;
  personName: string;
  itemsList: string[];
  handleItemDelete: Function;
};

const Items = (props: Props) => {
  return (
    <div>
      <p className="mb-1 fw-bold text-capitalize gap-2">
        {props.personName}
        {
          <IconBackspaceFilled
            className="clickIcon smallIcon"
            onClick={() => props.handleItemDelete(props.itemsId)}
          />
        }
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

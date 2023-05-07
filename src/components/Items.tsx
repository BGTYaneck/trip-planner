import React from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { IconEraser, IconBallpen } from "@tabler/icons-react";
import Tooltip from "react-bootstrap/Tooltip";
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
      <div className="mb-1 fw-bold text-capitalize gap-2 d-flex flex-row align-items-center mt-2">
        {props.personName}

        {
          <div className="d-flex flex-row gap-1 w-25">
            <OverlayTrigger
              placement="bottom"
              overlay={
                <Tooltip id="tooltip" style={{ position: "fixed" }}>
                  <small>Delete person</small>
                </Tooltip>
              }
            >
              <IconEraser
                className="clickIcon smallIcon"
                onClick={() => props.handleItemDelete(props.itemsId)}
              />
            </OverlayTrigger>
            <OverlayTrigger
              placement="bottom"
              overlay={
                <Tooltip id="tooltip" style={{ position: "fixed" }}>
                  <small>Edit person</small>
                </Tooltip>
              }
            >
              <IconBallpen
                className="clickIcon smallIcon"
                onClick={() => props.handleItemDelete(props.itemsId)}
              />
            </OverlayTrigger>
          </div>
        }
      </div>
      {props.itemsList.map((item: string, index: any) => {
        return (
          <span key={index} className="text-capitalize opacity-50">
            {(index ? ", " : "") + item}
          </span>
        );
      })}
    </div>
  );
};

export default Items;

import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import Trip from "./components/Trip";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import tripData from "./data/tripData";

const App = () => {
  const [list, setList] = useState(JSON.parse(localStorage.getItem("data")!));

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(list));
  }, [list]);

  function handleAdd() {
    const newList = [...list];
    newList.push({
      id: list.length,
      destination: "Madrid",
      dateStart: "13.12.2005",
      dateEnd: "15.12.2005",
      persons: [{ person: "Jack", items: ["Toothbrush", "Hamster"] }],
    });
    sortTrips(newList);
  }

  function handleRemove(id) {
    const newList = list.filter((item) => item.id !== id);
    sortTrips(newList);
  }

  function sortTrips(tripsToSort: tripData[]) {
    const sortedTrips = tripsToSort.sort(
      (a, b) => Date.parse(b.dateStart) - Date.parse(a.dateStart)
    );
    setList(sortedTrips);
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        marginLeft: "auto",
        marginRight: "auto",
        height: "100vh",
        flexDirection: "column",
        gap: "15px",
      }}
    >
      <p style={{ display: "flex", gap: "20px" }}>
        <span style={{ fontSize: "2rem" }}>My trips </span>
        <button onClick={() => handleAdd()}>Add a trip + </button>
      </p>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: "5rem",
          justifyContent: "center",
        }}
      >
        {list.map((item, i) => {
          return (
            <Trip
              key={i}
              destination={item.destination}
              dateStart={item.dateStart}
              dateEnd={item.dateEnd}
              persons={item.persons}
              onClick={() => handleRemove(item.id)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default App;

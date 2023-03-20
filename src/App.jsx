import { useState } from "react";
import "./App.css";
import Trip from "./components/Trip";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

const Trips = [
  {
    id: "0",
    destination: "Barcelona",
    dateStart: "16.10.2022",
    dateEnd: "24.10.2022",
    persons: [
      {
        person: "Jack",
        items: ["Toothbrush", "Socks", "Hamster", "Air Fryer"],
      },
      { person: "Adam", items: ["Soap", "Shoes"] },
      { person: "Adam", items: ["Soap", "Shoes"] },
      {
        person: "Walter",
        items: [
          "alongwordtotest",
          "ashor",
          "averylongwordtotestwhoknows",
          "item",
          "second item",
        ],
      },
      {
        person: "Anna",
        items: ["Food", "clothes", "vegetables"],
      },
    ],
  },
  {
    id: "1",
    destination: "Barcelona",
    dateStart: "16.12.2022",
    dateEnd: "24.10.2022",
    persons: [
      {
        person: "Jack",
        items: ["Toothbrush", "Socks", "Hamster", "Air Fryer"],
      },
      { person: "Adam", items: ["Soap", "Shoes"] },
      {
        person: "Walter",
        items: [
          "alongwordtotest",
          "ashor",
          "averylongwordtotestwhoknows",
          "item",
          "second item",
        ],
      },
      {
        person: "Anna",
        items: ["Food", "clothes", "vegetables"],
      },
    ],
  },
  {
    id: "2",
    destination: "Barcelona",
    dateStart: "16.01.2022",
    dateEnd: "24.10.2022",
    persons: [
      {
        person: "Jack",
        items: ["Toothbrush", "Socks", "Hamster", "Air Fryer"],
      },
      { person: "Adam", items: ["Soap", "Shoes"] },
      {
        person: "Walter",
        items: [
          "alongwordtotest",
          "ashor",
          "averylongwordtotestwhoknows",
          "item",
          "second item",
        ],
      },
      {
        person: "Walter",
        items: [
          "alongwordtotest",
          "ashor",
          "averylongwordtotestwhoknows",
          "item",
          "second item",
        ],
      },
      {
        person: "Walter",
        items: [
          "alongwordtotest",
          "ashor",
          "averylongwordtotestwhoknows",
          "item",
          "second item",
        ],
      },
      {
        person: "Anna",
        items: ["Food", "clothes", "vegetables"],
      },
    ],
  },
  {
    id: "3",
    destination: "Barcelona",
    dateStart: "16.10.2022",
    dateEnd: "24.10.2022",
    persons: [
      {
        person: "Jack",
        items: ["Toothbrush", "Socks", "Hamster", "Air Fryer"],
      },
      { person: "Adam", items: ["Soap", "Shoes"] },
      {
        person: "Walter",
        items: [
          "alongwordtotest",
          "ashor",
          "averylongwordtotestwhoknows",
          "item",
          "second item",
        ],
      },
      {
        person: "Anna",
        items: ["Food", "clothes", "vegetables"],
      },
    ],
  },
  {
    id: "4",
    destination: "Barcelona",
    dateStart: "16.11.2022",
    dateEnd: "24.10.2022",
    persons: [
      {
        person: "Jack",
        items: ["Toothbrush", "Socks", "Hamster", "Air Fryer"],
      },
      { person: "Adam", items: ["Soap", "Shoes"] },
      {
        person: "Walter",
        items: [
          "alongwordtotest",
          "ashor",
          "averylongwordtotestwhoknows",
          "item",
          "second item",
        ],
      },
      {
        person: "Anna",
        items: ["Food", "clothes", "vegetables"],
      },
    ],
  },
];

const App = () => {
  const [list, setList] = useState(Trips);

  var sortedTrips = list.sort(
    (a, b) => Date.parse(b.dateStart) - Date.parse(a.dateStart)
  );

  function handleRemove(id) {
    const newList = list.filter((item) => item.id !== id);
    setList(newList);
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
        <button>Add a trip + </button>
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
        {sortedTrips.map((item, i) => {
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

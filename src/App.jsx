import "./App.css";
import Trip from "./components/Trip";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

const Trips = [
  {
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
];

const App = () => {
  return (
    <div
      style={{
        marginTop: "0px",
        display: "flex",
        alignItems: "center",
        borderRight: "1px solid black",
        borderLeft: "1px solid black",
        marginLeft: "auto",
        marginRight: "auto",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
      }}
    >
      <h2>My trips</h2>
      {Trips.map((item, i) => {
        return (
          <Trip
            key={i}
            destination={item.destination}
            dateStart={item.dateStart}
            dateEnd={item.dateEnd}
            persons={item.persons}
          />
        );
      })}
      <button>Add a trip + </button>
    </div>
  );
};

export default App;

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
// import { TrafficLightWithHook } from "./02-useEffect/TrafficLightWithHook";
// import { PokemonPage } from "./03-examples/PokemonPage";
// import { FocusScreen } from "./04-useRef/FocusScreen";
import { TasksApp } from "./05-useReducer/TaskApp";
// import { TrafficLight } from "./01-useState/TrafficLight";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <TrafficLight /> */}
    {/* <TrafficLightWithHook /> */}
    {/* <PokemonPage /> */}
    {/* {<FocusScreen />} */}
    <TasksApp />
  </StrictMode>,
);

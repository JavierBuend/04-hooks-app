import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import { TrafficLight } from "./01-useState/TrafficLight";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TrafficLight />
  </StrictMode>,
);

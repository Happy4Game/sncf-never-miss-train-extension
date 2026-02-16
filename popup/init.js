import { appliesLocales } from "./appliesLocales.js";

export function init() {
  appliesLocales();
  if (
    localStorage.getItem("trainStationCity") !== null &&
    localStorage.getItem("trainStationCity") !== undefined
  ) {
    document.querySelector("#station").value =
      localStorage.getItem("trainStationCity");
  }

  if (localStorage.getItem("serviceWorkerRunning") === "running") {
    document
      .querySelector("#tracking-infos")
      .setAttribute("style", "display: block");
  }
}

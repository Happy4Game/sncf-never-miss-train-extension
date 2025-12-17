import { init } from "./init.js";
import {
  fetchDepartures,
  fetchStationList,
  parseDateToHourMinSec,
} from "./utils.js";

window.onload = (event) => {
  init();

  // Set trainStationCityCode when #set-train-station-city-btn is clicked
  document
    .querySelector("#set-train-station-city-btn")
    .addEventListener("click", (ev) => {
      const inputCity = document.querySelector("#station");
      const datalist = document.querySelector("datalist");
      // Check if option is already in datalist
      for (const o of datalist.options) {
        if (o.value == inputCity.value) {
          window.localStorage.setItem("trainStationCityCode", o.dataset.code);
        }
      }
    });

  // Refresh and feed departure list
  document
    .querySelector("#refresh-departures-btn")
    .addEventListener("click", (ev) => {
      if (window.localStorage.getItem("trainStationCityCode") !== "") {
        fetchDepartures(
          window.localStorage.getItem("trainStationCityCode")
        ).then((list) => {
          const departureListDiv = document.querySelector("#list-departures");
          while (departureListDiv.firstChild) {
            departureListDiv.removeChild(departureListDiv.firstChild);
          }
          for (const l of list) {
            const departureDiv = document.createElement("div");
            const destination = l.traffic.destination;
            const track = l.platform.track;
            const detailsURL = l.TrafficDetailsUrl;
            const scheduledTime = new Date(l.scheduledTime);
            const actualTime = new Date(l.actualTime);
            const informationStatus = l.informationStatus;
            departureDiv.innerHTML = `
            <p>${destination} scheduled at ${parseDateToHourMinSec(
              scheduledTime
            )}, real time ${parseDateToHourMinSec(actualTime)}<p>
            `;
            departureListDiv.appendChild(departureDiv);
          }
        });
      }
    });

  // Set trainStationCity and set
  document.querySelector("#station").addEventListener("input", (ev) => {
    const datalist = document.querySelector("datalist");
    window.localStorage.setItem("trainStationCity", ev.target.value);
    window.localStorage.setItem("trainStationCityCode", "");
    fetchStationList(ev.target.value).then((list) => {
      while (datalist.firstChild) {
        datalist.removeChild(datalist.firstChild);
      }
      for (const l of list) {
        const option = document.createElement("option");
        option.dataset.code = l.code;
        option.value = l.libelle;
        datalist.appendChild(option);
      }
    });
  });
};

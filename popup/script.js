import { init } from "./init.js";
import {
  fetchDepartures,
  fetchStationList,
  parseDateToHourMin,
  parseDateToHourMinSec,
} from "./utils.js";

window.onload = (event) => {
  init();

  // Refresh and feed departure list
  document
    .querySelector("#refresh-departures-btn")
    .addEventListener("click", (ev) => {
      const inputCity = document.querySelector("#station");
      const datalist = document.querySelector("datalist");
      // Check if option is already in datalist
      for (const o of datalist.options) {
        if (o.value == inputCity.value) {
          window.localStorage.setItem("trainStationCityCode", o.dataset.code);
        }
      }

      if (window.localStorage.getItem("trainStationCityCode") !== "") {
        document.querySelector("#last-refresh-time").innerHTML = "pending";
        fetchDepartures(
          window.localStorage.getItem("trainStationCityCode")
        ).then((list) => {
          window.localStorage.setItem(
            "lastRefresh",
            parseDateToHourMinSec(new Date())
          );

          document.querySelector("#last-refresh-time").innerHTML =
            window.localStorage.getItem("lastRefresh");

          const departureListDiv = document.querySelector(
            "#list-departures > tbody"
          );
          while (departureListDiv.firstChild) {
            departureListDiv.removeChild(departureListDiv.firstChild);
          }
          for (const l of list) {
            const departureDiv = document.createElement("tr");
            const destination = l.traffic.destination;
            const track = l.platform.track;
            const detailsURL = l.TrafficDetailsUrl;
            const scheduledTime = new Date(l.scheduledTime);
            const actualTime = new Date(l.actualTime);
            const informationStatus = l.informationStatus;
            const presentation = l.presentation;
            const platform = l.platform;
            departureDiv.innerHTML = `
              <td>${destination}</td>
              <td>
                ${parseDateToHourMin(scheduledTime)}
              </td>
              <td>
                ${informationStatus?.trainStatus}
              </td>
              <td>
                ${platform.isTrackactive ? platform.track : ""}
              </td>
              <td>
                ${
                  informationStatus.delay !== null
                    ? `${informationStatus.delay}min`
                    : ""
                }
              </td>
              <td style="background-color: #e5e5e5; cursor: pointer;">🚆
              </td>
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

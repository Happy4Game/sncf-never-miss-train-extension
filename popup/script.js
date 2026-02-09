import { init } from "./init.js";
import {
  fetchDepartures,
  fetchStationList,
  parseDateToHourMin,
  parseDateToHourMinSec,
} from "./utils.js";

const addEventListenerToTrackingBtn = () => {
  const allBtn = document.querySelectorAll(".set-tracking-btn");
  allBtn.forEach((e) => {
    e.addEventListener("click", (ev) => {
      chrome.runtime.sendMessage(e.dataset);
    });
  });
};

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
          localStorage.setItem("trainStationCityCode", o.dataset.code);
        }
      }

      if (localStorage.getItem("trainStationCityCode") !== "") {
        document.querySelector("#last-refresh-time").innerHTML = "pending";
        fetchDepartures(
          localStorage.getItem("trainStationCityCode")
        ).then((list) => {
          localStorage.setItem(
            "lastRefresh",
            parseDateToHourMinSec(new Date())
          );

          document.querySelector("#last-refresh-time").innerHTML =
            localStorage.getItem("lastRefresh");

          const departureListDiv = document.querySelector(
            "#list-departures > tbody"
          );
          while (departureListDiv.firstChild) {
            departureListDiv.firstChild.remove();
          }
          for (const l of list) {
            const departureDiv = document.createElement("tr");
            const destination = l.traffic.destination;
            const scheduledTime = new Date(l.scheduledTime);
            const informationStatus = l.informationStatus;
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
                  informationStatus.delay === null
                    ? ""
                    : `${informationStatus.delay}min`
                }
              </td>
              <td class="set-tracking-btn" 
                data-destination="${destination}"
                data-scheduled-time="${parseDateToHourMin(scheduledTime)}"
                data-status="${informationStatus?.trainStatus}"
                data-track="${platform.isTrackactive ? platform.track : ""}"
                data-delay="${
                  informationStatus.delay === null
                    ? ""
                    : `${informationStatus.delay}min`
                }"
              style="background-color: #e5e5e5; cursor: pointer;">🚆
              </td>
            `;
            departureListDiv.appendChild(departureDiv);
          }
          addEventListenerToTrackingBtn();
        });
      }
    });

  // Set trainStationCity and set
  document.querySelector("#station").addEventListener("input", (ev) => {
    const datalist = document.querySelector("datalist");
    localStorage.setItem("trainStationCity", ev.target.value);
    localStorage.setItem("trainStationCityCode", "");
    fetchStationList(ev.target.value).then((list) => {
      while (datalist.firstChild) {
        datalist.firstChild.remove()
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

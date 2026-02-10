import {
  fetchDepartures,
  parseDateToHourMin,
  setChromeBadgeGreen,
  setChromeBadgeOrangeAndLate,
  setChromeBadgeRed,
} from "./utils.js";

let trainToTrack = null;
let trainStationCityCode = null;

chrome.runtime.onMessage.addListener((e) => {
  console.log("received", e);
  trainStationCityCode = e.trainStationCityCode;
  trainToTrack = e.trainToTrack;
  return true;
});

setInterval(
  async () => {
    if (trainToTrack !== null && trainStationCityCode !== null) {
      let departureList = await fetchDepartures(trainStationCityCode);
      let mappedDepartureList = departureList.map((e) => {
        return {
          delay:
            e.informationStatus.delay === null
              ? ""
              : `${e.informationStatus.delay}min`,
          destination: e.traffic.destination,
          scheduledTime: parseDateToHourMin(new Date(e.scheduledTime)),
          status: e.informationStatus.trainStatus,
          track: e.platform.isTrackactive ? e.platform.track : "",
        };
      });
      let matchedDeparture = mappedDepartureList.find(
        (e) =>
          e.scheduledTime === trainToTrack.scheduledTime &&
          e.destination === trainToTrack.destination,
      );
      console.log("fetch by service worker", matchedDeparture);

      if (matchedDeparture) {
        const timeCropped = matchedDeparture.delay.substring(
          0,
          matchedDeparture.delay.length - 2,
        );
        if (matchedDeparture.status === "Ontime") {
          setChromeBadgeGreen();
        } else if (matchedDeparture.status === "RETARD") {
          setChromeBadgeOrangeAndLate(timeCropped);
        } else if (
          matchedDeparture.status === "SUPPRESSION_TOTALE" ||
          matchedDeparture.status === "SUPPRESSION_PARTIELLE"
        ) {
          setChromeBadgeRed();
        }
      }
    }
  },
  15 * 1000 * 1,
);

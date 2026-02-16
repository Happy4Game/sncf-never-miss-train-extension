/**
 * Fetch departures
 * @param {string} idStation Id of the station (fetchable with fetchStationList)
 * @returns {Promise<Array<Train>>}
 */
export async function fetchDepartures(idStation) {
  const request = await fetch(
    `https://www.garesetconnexions.sncf/schedule-table/Departures/${idStation}`,
  );
  const departureList = await request.json();
  return departureList;
}

/**
 * Fetch station list
 * @param {string} search City name
 * @returns {Promise<Array<{code: string, libelle: string}>>}
 */
export async function fetchStationList(search = "%") {
  const param = new URLSearchParams({ libelle: search });
  const request = await fetch(
    `https://www.sncf-voyageurs.com/api/bff/locations?${param}&typeEmplacement=ZONE_ARRET&component=schedule`,
  );
  const result = await request.json();
  const response = [];
  for (const r of result) {
    const code = r.infosZoneArret.listeCodes.valeur.find(
      (e) => e.type === "UIC",
    )?.valeur;
    response.push({ libelle: r.libelle, code: code.padStart(10, "0") });
  }
  return response;
}
/**
 * Parse date into HH:mm:ss
 * @param {Date} date Date to convert
 * @returns
 */
export function parseDateToHourMinSec(date) {
  const hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  const minutes =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  const seconds =
    date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();

  return `${hour}:${minutes}:${seconds}`;
}

/**
 * Parse date into HH:mm
 * @param {Date} date Date to convert
 * @returns
 */
export function parseDateToHourMin(date) {
  const hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  const minutes =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();

  return `${hour}:${minutes}`;
}

/**
 * Define chrome badge to green
 */
function setChromeBadgeGreen() {
  chrome.action.setBadgeBackgroundColor({ color: [0, 255, 0, 255] });
  chrome.action.setBadgeTextColor({ color: [0, 255, 0, 255] });
  chrome.action.setBadgeText({ text: "-" });
}

/**
 * Define chrome badge to orange with text in it
 * @param {String} time Text to show
 */
function setChromeBadgeOrangeAndLate(time) {
  chrome.action.setBadgeBackgroundColor({ color: [252, 244, 15, 255] });
  chrome.action.setBadgeTextColor({ color: [0, 0, 0, 255] });
  chrome.action.setBadgeText({ text: time });
}

/**
 * Define chrome badge to red
 */
function setChromeBadgeRed() {
  chrome.action.setBadgeBackgroundColor({ color: [255, 0, 0, 255] });
  chrome.action.setBadgeTextColor({ color: [255, 0, 0, 255] });
  chrome.action.setBadgeText({ text: "-" });
}

/**
 * Clear chrome badge
 */
function clearChromeBadge() {
  chrome.action.setBadgeBackgroundColor({ color: [0, 0, 0, 1] });
  chrome.action.setBadgeTextColor({ color: [0, 0, 0, 1] });
  chrome.action.setBadgeText({ text: "" });
}

/**
 * Define chrome badge depends of train
 * @param {Train} train
 */
export function setChromeBadge(train) {
  if (train === null || train === undefined) {
    clearChromeBadge();
  } else {
    const timeCropped = train.delay.substring(0, train.delay.length - 2);
    if (train.status === "Ontime") {
      setChromeBadgeGreen();
    } else if (train.status === "RETARD") {
      setChromeBadgeOrangeAndLate(timeCropped);
    } else if (
      train.status === "SUPPRESSION_TOTALE" ||
      train.status === "SUPPRESSION_PARTIELLE"
    ) {
      setChromeBadgeRed();
      showTrainNotification(train, `${train.destination} is deleted!`);
    }
  }
}

/**
 * Show notification to the user
 * @param {Train} train
 * @param {string} message
 */
export async function showTrainNotification(
  train,
  message = `${train.destination} is tracked!`,
) {
  await chrome.notifications.create(null, {
    contextMessage: `${train.status}`,
    iconUrl: "../icons/icon128.png",
    message: message,
    title: "Never miss your train anymore!",
    type: "basic",
  });
}

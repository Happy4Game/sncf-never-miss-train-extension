/**
 * Fetch departures
 * @param {string} idStation Id of the station (fetchable with fetchStationList)
 * @returns
 */
export async function fetchDepartures(idStation) {
  const request = await fetch(
    `https://www.garesetconnexions.sncf/schedule-table/Departures/${idStation}`
  );
  const departureList = await request.json();
  return departureList;
}

/**
 * Fetch station list
 * @param {string} search City name
 * @returns {Array<{code: string, libelle: string}>}
 */
export async function fetchStationList(search = "%") {
  const param = new URLSearchParams({ libelle: search });
  const request = await fetch(
    `https://www.sncf-voyageurs.com/api/bff/locations?${param}&typeEmplacement=ZONE_ARRET&component=schedule`
  );
  const result = await request.json();
  const response = [];
  for (const r of result) {
    const code = r.infosZoneArret.listeCodes.valeur.find(
      (e) => e.type === "UIC"
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

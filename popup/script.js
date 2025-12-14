async function fetchDeparture(idStation) {
  const request = await fetch(
    `https://www.garesetconnexions.sncf/schedule-table/Departures/${idStation}`
  );
  const departureList = await request.json();
  return departureList;
}

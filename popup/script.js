async function fetchDeparture(idStation) {
  const request = await fetch(
    `https://www.garesetconnexions.sncf/schedule-table/Departures/${idStation}`
  );
  const departureList = await request.json();
  return departureList;
}

async function fetchStationList(search = "%") {
  const param = new URLSearchParams({ libelle: search });
  const request = await fetch(
    `https://www.sncf-voyageurs.com/api/bff/locations?${param}&typeEmplacement=ZONE_ARRET&component=schedule`
  );
  return await request.json();
}

window.onload = (event) => {
  document.querySelector("#station").addEventListener("input", (ev) => {
    const datalist = document.querySelector("datalist");
    // Check if option is already in datalist
    for (const o of datalist.options) {
      if (o.value == ev.target.value) {
        alert(o.dataset.code);
      }
    }
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

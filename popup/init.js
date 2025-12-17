export function init() {
  if (
    window.localStorage.getItem("trainStationCity") !== null &&
    window.localStorage.getItem("trainStationCity") !== undefined
  ) {
    document.querySelector("#station").value =
      window.localStorage.getItem("trainStationCity");
  }
}

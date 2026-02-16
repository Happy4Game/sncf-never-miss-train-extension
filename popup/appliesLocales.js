export function appliesLocales() {
  document.querySelector("#title").innerText = chrome.i18n.getMessage("title");
  document.querySelector("body > search > label").innerText =
    chrome.i18n.getMessage("city");
  document.querySelector("#station").placeholder =
    chrome.i18n.getMessage("searchPlaceHolder");
  document.querySelector("#refresh-departures-btn").innerText =
    document.querySelector("#station").placeholder = chrome.i18n.getMessage(
      "refreshStationListBtn",
    );
  document.querySelector("#set-untrack-btn").innerText =
    chrome.i18n.getMessage("stopTrackingBtn");
  document.querySelector(
    "#list-departures > thead > tr > th:nth-child(1)",
  ).innerText = chrome.i18n.getMessage("destination");
  document.querySelector(
    "#list-departures > thead > tr > th:nth-child(2)",
  ).innerText = chrome.i18n.getMessage("when");
  document.querySelector(
    "#list-departures > thead > tr > th:nth-child(3)",
  ).innerText = chrome.i18n.getMessage("status");
  document.querySelector(
    "#list-departures > thead > tr > th:nth-child(4)",
  ).innerText = chrome.i18n.getMessage("track");
  document.querySelector(
    "#list-departures > thead > tr > th:nth-child(5)",
  ).innerText = chrome.i18n.getMessage("delay");
  document.querySelector("body > p:nth-child(5)").innerHTML = document
    .querySelector("body > p:nth-child(5)")
    .innerHTML.replace("Last refresh: ", chrome.i18n.getMessage("lastRefresh"));
}

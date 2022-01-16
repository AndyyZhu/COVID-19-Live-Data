window.onload = function () {
  getStats();
};

function getStats() {
  fetch("https://coronavirus-tracker-api.herokuapp.com/v2/locations/49")
    .then(function (resp) {
      return resp.json();
    })
    .then(function (data) {
      let update = data.location.last_updated;
      let confirmedCases = data.location.latest.confirmed;
      let deaths = data.location.latest.deaths;

      document.getElementById("update").innerHTML = update.substr(0, 10);
      document.getElementById("cases").innerHTML =
        confirmedCases.toLocaleString("en");
      document.getElementById("deaths").innerHTML = deaths.toLocaleString("en");
      document.getElementById("percent").innerHTML =
        ((Number(deaths) / Number(confirmedCases)) * 100).toLocaleString("en", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }) + "%";
    })
    .catch(function () {
      console.log("error");
    });
  setTimeout(getStats, 43200000);
}

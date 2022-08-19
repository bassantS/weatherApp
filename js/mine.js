async function search(q) {
    var response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=5829c6b118134944b2081720220106&q=${q}&days=3`);
    var q = await response.json();
    console.log(q);
    displayCurrent(q.location, q.current), displayAnother(q.forecast.forecastday);

}
document.getElementById("search").addEventListener('keyup', function (e) {
    search(e.target.value);
});
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function displayCurrent(location, current) {
    if (current != null) {
        // console.log(current.last_updated);
        var e = new Date(current.last_updated.replace(" ", "T"));
        // console.log(e);
        let content = `
        <div class="today forecast">
            <div class="forecast-header" id="today">
                <div class="day">${days[e.getDay()]}</div>
                <div class=" date">${e.getDate() + months[e.getMonth()]}</div>
            </div>
            <div class="forecast-content" id="current">
                <div class="location">${location.name}</div>
                <div class="degree">
                    <div class="temp">${current.temp_c}<sup>o</sup>C</div>
                    <div class="forecast-icon">
                        <img src="https:${current.condition.icon}" alt="" width=90>
                    </div>
                </div>
                <div class="custom">${current.condition.text}</div>
                <span><img src="images/icon-umberella.png" alt="">20%</span>
                <span><img src="images/icon-wind.png" alt="">18km/h</span>
                <span><img src="images/icon-compass.png" alt="">East</span>
            </div>
        </div>`;
        document.getElementById("forecast").innerHTML = content;
    }
}
function displayAnother(nextDays) {
    let response = "";
    for (let i = 1; i < nextDays.length; i++)
        response += `
        <div class="forecast">
            <div class="forecast-header">
                <div class="day">${days[new Date(nextDays[i].date.replace(" ", "T")).getDay()]}</div>
            </div> 
            <div class="forecast-content">
                <div class="forecast-icon">
                    <img src="https:${nextDays[i].day.condition.icon}" alt="" width=48>
                </div>
                <div class="degree">${nextDays[i].day.maxtemp_c}<sup>o</sup>C</div>
                <small>${nextDays[i].day.mintemp_c}<sup>o</sup></small>
                <div class="custom">${nextDays[i].day.condition.text}</div>
            </div>
        </div>`;
    document.getElementById("forecast").innerHTML += response;
}
//default
search("cairo");
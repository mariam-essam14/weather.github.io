
var days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const months=["January","February","March","April","May","June","July","August","September","October","November","December"];

let weather=[]
document.getElementById("search").addEventListener("keyup",el=>{getData(el.target.value)});
async function getData(cityName){
    let data =await fetch(`https://api.weatherapi.com/v1/forecast.json?key=03073d827acb400ab94205329231602&q=${cityName}&days=3`)
    let forecast = await data.json()
    weather =forecast
    displayToday(forecast.current,forecast.location)
    displayTomorrow(forecast.forecast.forecastday)
   


}
getData("cairo")

function displayToday(curr,loc){
    let today =new Date(curr.last_updated)
    let temp=`<div class="today col-lg-4 col-md-12   border-end border-1 border-secondary border-opacity-25">
    <div class="todayHeader p-2  d-flex justify-content-between text-center ">
      <div class="day ">
      ${days[today.getDay()]}
      </div>
      <div class="date ">
      ${today.getDate()+months[today.getDay()]}
      </div>
    </div>
    <div class="todayBody text-left" id="cityName ">
       <div class="cityName">${loc.name}</div> 
      <div class="degree text-white">
        <div class="degreeNum d-inline-block  align-middle"> ${curr.temp_c} <sup>o</sup> c  </div>
        <div class="icon d-inline-block align-middle" id="icon">
          <img src="${curr.condition.icon} " >
        </div> 
      </div>
      <div class="special">${curr.condition.text}</div>
      <span><img src="image/icon-umberella.png">20%</span>
      <span><img src="image/icon-wind.png">18km/h</span>
      <span><img src="image/icon-compass.png">East</span>
    </div>
  </div>`
 
  document.getElementById("forecast").innerHTML=temp
   console.log("hello")
}

function displayTomorrow(y){
 let temp=""
 for(let i=1;i<y.length;i++){
    temp+=`<div class="tomorrow  col-lg-4 col-md-12  border-end border-1 border-secondary border-opacity-25">
    <div class="Header p-2   text-center">
      <div class="day ">
      ${days[new Date(y[i].date).getDay()]}
      </div>
    </div>
      
    <div class="content text-center">
       <div class="icon">  <img src="${y[i].day.condition.icon}"> </div>
       <div class="degree text-white">23 <sup>o</sup> c </div>
       <small>${y[i].day.maxtemp_c}<sup>o</sup></small>
       <div class="special">${y[i].day.condition.text}</div>
    </div>

  </div>`
 }
 document.getElementById("forecast").innerHTML+=temp
}


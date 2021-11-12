const container=document.querySelector(".container-fluid");
//console.log(container);
const card=document.querySelector(".card");
// $(window).on("load",function(){
//   document.querySelector(".loader-wrapper").style.display="none";
// });
var create=function(){
  fetch("https://restcountries.com/v3/all")
  .then(function(data){
    return data.json();
  })
  .then(function(countries){
    var rows=Math.floor(countries.length/3);
    // console.log(rows);

    var c=0;
    console.log(countries);
    document.querySelector(".loader-wrapper").style.visibility="hidden";
    for(var i=0;i<rows;i++)
    {
      var row=document.createElement('div');
      row.className="row justify-content-center m-5";
      container.appendChild(row);
      for(var j=0;j<3;j++)
      {
        // console.log(c);
        // console.log(countries[c].name.common);
        var capital=countries[c].capital;

        if(!capital||(typeof capital==="undefined")){
          capital="None";
        }
        var cardHTML=`<div class="col-lg-4 col-sm-12"><div class="d-flex justify-content-center"><div class="card shadows text-center"><p id=`+c+` class="card-header">`+countries[c].name.common+`</p><div class="d-flex justify-content-center color-grey p-3 mt-3 w-75 shadows ml-auto mr-auto"><img class="card-img-top w-75" src="`+countries[c].flags[0]+`" alt="flags"></div><div class="card-body"><p><span class="heading">Capital-</span> `+capital+`</p><p><span class="heading">Region-</span> `+countries[c].region+`</p><p><span class="heading">Country Code-</span> `+countries[c].altSpellings[0]+`</p><button id="`+countries[c].altSpellings[0]+`" class="btn btn-primary `+countries[c].name.common+`" onClick="popup(this.id,this.classList[2])" value="Click">Weather</button></div></div></div></div>`;
        row.innerHTML+=cardHTML;
        c++;

      }
    }
  })
  .catch(function(err){
    console.log(err);
  })
}
const timeConvert=function(unix_timestamp){
  var date = new Date(unix_timestamp * 1000);
// Hours part from the timestamp
var hours = date.getHours();
// Minutes part from the timestamp
var minutes = "0" + date.getMinutes();

  return hours + ":" + minutes.substr(-2);
}
const popup=function(id,name){
  console.log(id);
  console.log(name);
  const url=`https://api.openweathermap.org/data/2.5/weather?q=,,`+id+`&appid=7efabb514883dd5b2b8b5d8fc318dec0&units=metric`
  fetch(url)
  .then(function(weatherData){
    return weatherData.json();
  })
  .then(function(weatherData){
    //console.log(weatherData);
    var popup = document.getElementById("mypopup");
    // console.log(popup);

    var span = document.getElementById("close");
    var countryName=document.getElementById("countryName")
    var weatherMain=weatherData.weather[0].main;
    var report=weatherData.weather[0].description;
    var temp=Math.floor(weatherData.main.temp);
    var humidity=weatherData.main.humidity;
    var wind=Math.floor(weatherData.wind.speed);
    console.log(weatherData.sys.sunrise);
    var sunrise=timeConvert(weatherData.sys.sunrise);
    var maxtemp=Math.floor(weatherData.main.temp_max);
    var mintemp=Math.floor(weatherData.main.temp_min);
  //  console.log(weatherData.weather[0].icon);
    var cloudimg="http://openweathermap.org/img/w/"+weatherData.weather[0].icon+".png";
  //  console.log(cloudimg);
    var img;
    if(weatherMain==="Clouds")
    {
      img="images/cloudy.jfif";
    }
    if(weatherMain==="Rain")
    {
      img="images/rainy.jpg";
    }
    if(weatherMain==="Clear")
    {
      img="images/sunny.jpg";
    }
    if(weatherMain==="Snow")
    {
      img="images/snow.jpg";
    }
    if(weatherMain==="Mist" ||weatherMain==="Fog"||weatherMain==="Smoke")
    {
      img="images/mist.jpg";
    }
    var tempdiv=`<div class="temp-div"><p><span class="temp">  `+temp+String.fromCharCode(176)+`</span>`+name+`</div><div class="conditionImg"><img src=`+cloudimg+`></div></p>`;
    countryName.innerHTML=tempdiv;
    document.querySelector(".feelslike").innerText=report;
    document.querySelector(".hvalue").innerText=humidity+"%";
    document.querySelector(".wvalue").innerText=wind+"Km/h";
    document.querySelector(".svalue").innerText=sunrise;
    document.querySelector(".maxvalue").innerText=maxtemp+String.fromCharCode(176)+"C";
    document.querySelector(".minvalue").innerText=mintemp+String.fromCharCode(176)+"C";
    document.querySelector(".tempdiv").style=`background-image:url(${img});`;
    popup.style.display = "block";

  span.onclick = function() {
    popup.style.display = "none";
  }
  // When the user clicks anywhere outside of the popup, close it
  window.onclick = function(event) {
    if (event.target == popup) {
      popup.style.display = "none";
    }
  }
})
.catch(function(err){
  console.log(err);
})

}

create();

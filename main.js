// Google geocode API key = AIzaSyAUITaspI_99zAkcMU0t2jZ9eHbVFlWoeg
// Google geocode API url = https://maps.googleapis.com/maps/api/geocode/json?address=Your_address&key=API_Key
// Proxy to run for on local server = https://cors-anywhere.herokuapp.com/
// Dark sky API key = d25c605ff880d056bde653af9c1bf99d
// Dark sky API Url = https://api.darksky.net/forecast/[key]/[latitude],[longitude]
let lat1 = '';
let form = document.querySelector('.searchForm');
form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {   
    event.preventDefault();
    const input = document.querySelector('.searchForm-input').value;
    // remove whitespace from the input
    const searchQuery = input.split(' ').join('+');
    // print `searchQuery` to the console
    // console.log(searchQuery);

    let geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${searchQuery}&key=AIzaSyAUITaspI_99zAkcMU0t2jZ9eHbVFlWoeg`;

    fetch(geocodeURL)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                   
                  let max = data.results[0].geometry.location;
                //   console.log(max);

                  let max1 = max.lat+',' + max.lng;
                //   console.log(max1);
                   lat1 = max1;
				//   console.log(lat1);
				  

				  let temperatureDegree = document.querySelector('.temperature-degree');
				  let locationTimezone = document.querySelector('.location-timezone');
				  let temperatureDescription = document.querySelector('.temperature-description');
				  let minTemp = document.querySelector('.temp-min');
				  let maxTemp = document.querySelector('.temp-max');
				  let proSpeed = document.querySelector('.wind-speed');
				  let proHumidity = document.querySelector('.humidity');
				//   let hTime = document.querySelector('.h-time');
				  let echos = document.querySelector('.echo');
				  echos.textContent = input;
						  
						  const proxy = 'https://cors-anywhere.herokuapp.com/';
						  const api = `${proxy}https://api.darksky.net/forecast/d25c605ff880d056bde653af9c1bf99d/${lat1}`;
			   
						  fetch(api)
							  .then(response => {
								  return response.json();
							  })
							  .then(data => {
								  console.log(data);
								  const {temperature, summary, icon, time, humidity, windSpeed, uvIndex} = data.currently;
								  temperatureDegree.textContent = temperature;
								
								  locationTimezone.textContent = data.timezone;
								  maxTemp.textContent = data.daily.data[0].temperatureMax;
								  minTemp.textContent = data.daily.data[0].temperatureMin;
								  proSpeed.textContent = windSpeed;
								  proHumidity.textContent = humidity;
								  temperatureDescription.textContent = summary;


								
								listItems = data.hourly.data.reduce((result1, item ) => {
									
									result1 += `<li>${item.temperature}</li>`;

									return result1;
								  }, '');

								  resultElement = document.getElementById('result1');
								
								// Set the inner HTML
								resultElement.innerHTML = listItems;

								listItems2 = data.hourly.data.reduce((result2, item ) => {
									var d = new Date(item.time);
									var h = d.getHours();
									var m = d.getMinutes();

								
									result2 += `<li>${h}: ${m}</li>`;
									
									return result2;
								  }, ''); 

								// for (let item of data.hourly.data) {
								// 	console.log(item.time); 
								// }
								  resultElement = document.getElementById('result2');
								
								// Set the inner HTML
								resultElement.innerHTML = listItems2;

								listItems3 = data.hourly.data.reduce((result3, item ) => {
								
									result3 += `<li>${item.humidity}</li>`;
									
									return result3;
								  }, ''); 
								  resultElement = document.getElementById('result3');
								
								// Set the inner HTML
								resultElement.innerHTML = listItems3;

								//////////////////////////////////////////////////////////////
								// 1

								

								////////////////////////////////////////////////
								dailyItem1 = data.daily.data.reduce((dailyresult1, item11 ) => {
									
									dailyresult1 += `<li>${item11.humidity}</li>`;

									return dailyresult1;
								  }, '');

								  resultElement = document.getElementById('dailyhum');
								
								// Set the inner HTML
								resultElement.innerHTML = dailyItem1;
								////////////////////////////////////////////////
								dailyItem1 = data.daily.data.reduce((dailyresult1, item11 ) => {
									
									dailyresult1 += `<li>${item11.temperatureHigh}</li>`;

									return dailyresult1;
								  }, '');

								  resultElement = document.getElementById('dailyhigh');
								
								// Set the inner HTML
								resultElement.innerHTML = dailyItem1;
								////////////////////////////////////////////////
								dailyItem1 = data.daily.data.reduce((dailyresult1, item11 ) => {
									
									dailyresult1 += `<li>${item11.temperatureLow}</li>`;

									return dailyresult1;
								  }, '');

								  resultElement = document.getElementById('dailylow');
								
								// Set the inner HTML
								resultElement.innerHTML = dailyItem1;
								 
							  })
				})
				
						// console.log(geocodeURL);


   
			}


	









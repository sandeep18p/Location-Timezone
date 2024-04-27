var requestOptions = {
    method: 'GET',
};

let lat;
let long;

async function getLocation() {
    console.log(navigator);
    if (navigator.geolocation) {
        const position = await getCurrentPosition();
        showPosition(position);
    } else { 
        console.log('Geolocation is not supported by this browser.');
    }
}

function getCurrentPosition() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}

function showPosition(position) {
    lat = position.coords.latitude;
    long = position.coords.longitude;
}

(async () => {
    try {
        await getLocation();

        const response = await fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${long}&apiKey=25b51ff65c8740299ca78587081c4eb4`, requestOptions);
        const result = await response.json();
        console.log(result);

        const { properties } = result.features[0];
        console.log("2",properties)
        document.getElementById('name').innerText = `Name Of Time Zone: ${properties.timezone.name}`;
        document.getElementById('lat').innerText = `Lat: ${properties.lat}`;
        document.getElementById('long').innerText = `Long: ${properties.lon}`;
        document.getElementById('offset').innerText = `Offset STD: ${properties.timezone.offset_STD}`;
        document.getElementById('stds').innerText = `Offset STD Seconds: ${properties.timezone.offset_STD_seconds}`;
        document.getElementById('offd').innerText = `Offset DST: ${properties.timezone.offset_DST}`;
        document.getElementById('offds').innerText = `Offset DST Seconds: ${properties.timezone.offset_DST_seconds}`;
        document.getElementById('country').innerText = `Country: ${properties.country}`;
        document.getElementById('postcode').innerText = `Postcode: ${properties.postcode}`;
        document.getElementById('city').innerText = `City: ${properties.city}`;
    } catch (error) {
        console.log('Error:', error);
    }
})();


function fetchData() {
    var address = document.getElementById('address').value;
    if (!address) {
       
        document.getElementById('no').innerText = "Please enter an address!";
        document.getElementById('start1').style.display = 'none';
        return;
    }

    var encodedAddress = encodeURIComponent(address);
    var apiKey = "25b51ff65c8740299ca78587081c4eb4"; // Your API key

    var requestOptions = {
        method: 'GET',
    };

    fetch(`https://api.geoapify.com/v1/geocode/search?text=${encodedAddress}&apiKey=${apiKey}`, requestOptions)
        .then(response => response.json())
        .then(result => {
            if (result.features.length === 0) {
              
                document.getElementById('no').innerText = "Timezone could not be found!";
                document.getElementById('start1').style.display = 'none';
                document.getElementById('name11').style.display = 'none';

                return;
            }else{

                document.getElementById("address").value = "";
                var timezone = result.features[0].properties.timezone.name;
                var lat = result.features[0].properties.lat;
                var lon = result.features[0].properties.lon;
                var offsetSTD = result.features[0].properties.timezone.offset_STD;
                var offsetSTDSec = result.features[0].properties.timezone.offset_STD_seconds;
                var offsetDST = result.features[0].properties.timezone.offset_DST;
                var offsetDSTSec = result.features[0].properties.timezone.offset_DST_seconds;
                var country = result.features[0].properties.country;
                var postcode = result.features[0].properties.postcode;
                var city = result.features[0].properties.city;
    
               
                document.getElementById('name1').textContent = "Name Of Time Zone: " + timezone;
                document.getElementById('lat1').textContent = "Lat: " + lat;
                document.getElementById('long1').textContent = "Long: " + lon;
                document.getElementById('offset1').textContent = "Offset STD: " + offsetSTD;
                document.getElementById('stds1').textContent = "Offset STD Seconds: " + offsetSTDSec;
                document.getElementById('offd1').textContent = "Offset DST: " + offsetDST;
                document.getElementById('offds1').textContent = "Offset DST Seconds: " + offsetDSTSec;
                document.getElementById('country1').textContent = "Country: " + country;
                document.getElementById('postcode1').textContent = "Postcode: " + postcode;
                document.getElementById('city1').textContent = "City: " + city;
    
                
                document.getElementById('no').innerText = "";
                
                document.getElementById('start1').style.display = 'block';
                document.getElementById('name11').style.display = 'block';
                document.getElementById('name11').innerHTML = "Your Results";
            }

         
           
        })
        .catch(error => console.log('error', error));
}



document.getElementById('idn').addEventListener('click', fetchData);

  
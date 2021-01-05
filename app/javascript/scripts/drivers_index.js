// document.addEventListener('turbolinks:load', initMap)

// let map, marker, lat, lng;
// function initMap() {

//   // 載入路線服務與路線顯示圖層
//   let directionsService = new google.maps.DirectionsService();
//   let directionsDisplay = new google.maps.DirectionsRenderer({polylineOptions:{strokeColor:"#EF4444",strokeWeight:5}, suppressMarkers: true});

//   // 客製化使用者定位icon
//   const icons = {
//     start: {
//       url: 'https://i.imgur.com/5UTYP4Q.png',
//       scaledSize: new google.maps.Size(50, 50),
//       origin: new google.maps.Point(0,0),
//       anchor: new google.maps.Point(0, 0)
//     },
//     end: {
//       url: 'https://www.flaticon.com/svg/static/icons/svg/610/610365.svg',
//       scaledSize: new google.maps.Size(20, 20),
//       origin: new google.maps.Point(0,0),
//       anchor: new google.maps.Point(0, 0)
//     }
//   };

//   // 使用者定位
//   navigator.geolocation.watchPosition((position) => {
//     lat = position.coords.latitude;
//     lng = position.coords.longitude;
//     // 初始化地圖
//     map = new google.maps.Map(document.getElementById('map'), {
//         zoom: 18,
//         center: { lat: lat, lng: lng },
//         mapId: 'c57b36ae7dbc5a40'
//     });
//     marker = new google.maps.Marker({
//         position: { lat: lat, lng: lng },
//         map: map,
//         animation: google.maps.Animation.BOUNCE,
//         icon: icons.start
//     });

//     const btn = document.querySelector(".calc-btn")
//     const destinationInput = document.getElementById("destination-input");
//     const destinationAutocomplete = new google.maps.places.Autocomplete(destinationInput);
//     destinationAutocomplete.setFields(["place_id"]);
//     btn.addEventListener("click", (e) => {
//       const place = destinationAutocomplete.getPlace();
//       console.log(place)
//       const service = new google.maps.DistanceMatrixService();
//       service.getDistanceMatrix(
//         {
//           origins: [{ lat: lat, lng: lng }],
//           destinations: [place.place_id],
//           travelMode: google.maps.TravelMode.DRIVING,
//           unitSystem: google.maps.UnitSystem.METRIC,
//           avoidHighways: true,
//           avoidTolls: true,
//         },
//         (response, status) => {
//           if (status !== "OK") {
//             console.log(status);
//           } else {
//             console.log(response);
//           }
//         }
//       )
//     })
  
//     // 放置路線圖層
//     directionsDisplay.setMap(map);

//     // 路線相關設定
//     let request = {
//       origin: { lat: lat, lng: lng },
//       destination: { lat: 25.037906, lng: 121.549781 },
//       travelMode: 'DRIVING'
//     };

//     // 繪製路線
//     directionsService.route(request, function (result, status) {
//       if (status == 'OK') {
//         // 回傳路線上每個步驟的細節
//         console.log(result.routes[0].legs[0].steps);
//         const steps = result.routes[0].legs[0].steps;
//         const distance = steps.reduce((sum, step) => sum + step.distance.value, 0);
//         document.querySelector('.distance').innerText = `距離：${(distance / 1000).toFixed(2)}公里`
//         const leg = result.routes[0].legs[0];
//         function makeMarker(step, icon, map) {
//           new google.maps.Marker({
//             position: step,
//             map: map,
//             icon: icon
//           })
//         };
//         makeMarker(leg.start_location, icons.start, map);
//         makeMarker(leg.end_location, icons.end, map);
//         directionsDisplay.setDirections(result);
//       } else {
//         console.log(status);
//       }
//     });
//   });
// }
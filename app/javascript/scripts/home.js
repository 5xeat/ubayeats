window.currentPos = {
  latitude: null,
  longitude: null
}
document.addEventListener('turbolinks:load', () => {
  console.log('hihi');
    geoFindMe()
})

function geoFindMe() {
  function success(position) {
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;
    window.currentPos = {latitude: latitude, longitude: longitude}
    document.querySelector('#latitude').value = latitude
    document.querySelector('#longitude').value = longitude
    document.querySelector('#href').value = window.location.href
    document.querySelector('#position_form').submit()
  }
  function error() {
    status.textContent = '無法取得您的目前位置';
  }

  if(!navigator.geolocation) {
    status.textContent = '您的瀏覽器不支援定位服務!';
  } else {
    status.textContent = '正在取得定位…';
    navigator.geolocation.getCurrentPosition(success, error);
  }
}

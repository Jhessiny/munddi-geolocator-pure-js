const Icon = L.Icon.extend({
  options: {
    shadowUrl: "",
    iconSize: [25, 41],
    iconAnchor: [12.5, 21],
    popupAnchor: [0, -41],
  },
});
const blueIcon = new Icon({
  iconUrl:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPqF55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uyh6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXrz8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBqtKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHtLs5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+HEa73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ezNFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eEiU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZeK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1blQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEvKkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXWfh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkbuPA19nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BWm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII=",
});
const userIcon = new Icon({
  iconUrl: "img/person.png",
  iconSize: [50, 50],
});

let userPosition;
var map = L.map("map").setView([-23.48245598922627, -46.61293029785156], 12);

if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition((pos) => {
    userPosition = [pos.coords.latitude, pos.coords.longitude];
    map.setView(userPosition, 12);
    L.marker(userPosition, { icon: userIcon })
      .addTo(map)
      .bindPopup("Você está aqui.");
  });
}

let message;
let currentStore = null;

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

const fetchStores = async (ne_lat, ne_lng, sw_lat, sw_lng) => {
  const url = `https://munddi.com/dev/pdvs?ne_lat=${ne_lat}&ne_lng=${ne_lng}&sw_lat=${sw_lat}&sw_lng=${sw_lng}`;
  fetch(url)
    .then((res) => res.json())
    .then((res) => {
      if (res.code === 200) {
        let fetchedStores = res.data;
        const storesListDiv = document.getElementById("storesList");
        storesListDiv.innerHTML =
          '<p id="storesMessage" class="stores-message"></p>';
        fetchedStores.forEach((store) => {
          document.getElementById("storesList").innerHTML += `
          <div
          class="store-item"
         
          onClick="setCenter([${store.lat}, ${store.lng}])"
        >
        <h2>${store.name}</h2>
          <p>
            ${store.street} - ${store.city}/${store.uf}
          </p>
          </div>`;

          L.marker([store.lat, store.lng]).addTo(map).bindPopup(
            `
            <img
            src="${store.image_url}"
            alt=""
            class="popup-store__image"
          />
          <h2>${store.name}</h2>
          <p>
            ${store.street} - ${store.city}/${store.uf}
          </p>`
          );
        });
        if (fetchedStores.length) {
          message = `${fetchedStores.length} lojas encontradas.`;
        } else {
          message =
            "Nenhuma loja encontrada próxima a você. Tente diminuir o zoom ou arrastar o mapa para encontrar lojas em outras regiões.";
        }
      } else {
        message = "Oops! Algo deu errado. Tente novamente.";
      }
      document.getElementById("storesMessage").innerHTML = message;
    });
};

const getBoundsCoords = () => {
  let northEast = map.getBounds()._northEast;
  let southWest = map.getBounds()._southWest;
  let ne_lat = northEast.lat;
  let ne_lng = northEast.lng;
  let sw_lat = southWest.lat;
  let sw_lng = southWest.lng;
  fetchStores(ne_lat, ne_lng, sw_lat, sw_lng);
};

if ("geolocation" in navigator) {
  if (map) {
    getBoundsCoords();
    navigator.geolocation.getCurrentPosition((pos) => {
      userPosition = [pos.coords.latitude, pos.coords.longitude];
      map.setView(userPosition, 10);
    });
  }
}

const setCenter = (coords) => {
  map.setView(coords, 12);
};

map.on("moveend", () => getBoundsCoords());

const locateUserBtn = document.getElementById("locateUser");
locateUserBtn.addEventListener("click", () => setCenter(userPosition));

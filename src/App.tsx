import "./styles/index.css";
import { useEffect, useState, useRef } from "react";
import MobileBackground from "./assets/pattern-bg-mobile.png";
import DesktopBackground from "./assets/pattern-bg-desktop.png";
import ArrowRightIcon from "./assets/icon-arrow.svg";

import * as L from "leaflet";
import axios from "axios";

interface Details {
  ip: string;
  location: {
    region: string;
    city: string;
    postalCode: string;
    timezone: string;
    lat: number;
    lng: number;
  };
  isp: string;
}

function App() {
  const [result, setResult] = useState<Details | null>(null);
  const [ip, setIp] = useState("");
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    axios
      .get(`https://geo.ipify.org/api/v2/country,city?apiKey=${import.meta.env.VITE_API_KEY}&ipAddress=${ip}`)
      .then((result) => setResult(result.data))
      .catch((err) => console.error(err));

    // set up the map
    if (!document.querySelector("#map_container .leaflet-pane")) {
      mapRef.current = L.map("map_container").setView(
        [result?.location.lat || 51.0, result?.location.lng || -0.09],
        13
      );
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(mapRef.current);
    }
  }, []);

  useEffect(() => {
    if (result?.location.lat && result.location.lng && mapRef.current) {
      mapRef.current.setView(new L.LatLng(result.location.lat, result.location.lng));
    }
  }, [result]);

  function getResultLocationString(): string {
    if (result) {
      if (result.location.city === "" && result.location.city === "" && result.location.region === "") {
        return "-";
      }

      return `${result.location.city ? `${result.location.city},` : ""} ${result.location.region} ${
        result.location.postalCode
      }`;
    } else {
      return "-";
    }
  }

  function onChangeSetIp(event: React.ChangeEvent<HTMLInputElement>) {
    let newValue = event.currentTarget.value;
    if (/^[0-9.]*$/.test(newValue)) {
      setIp(newValue);
    }
  }

  function getIpAddressLocation(event: React.FormEvent) {
    event.preventDefault();
    const ipInput: HTMLInputElement | null = event.currentTarget.querySelector("#ip_address");
    if (ipInput) ipInput.value = "";

    axios
      .get(`https://geo.ipify.org/api/v2/country,city?apiKey=${import.meta.env.VITE_API_KEY}&ipAddress=${ip}`)
      .then((result) => setResult(result.data))
      .catch((err) => console.error(err));
  }

  return (
    <>
      <img src={MobileBackground} alt="background" className="w-full md:hidden " />
      <img src={DesktopBackground} alt="background" className="w-full h-64 hidden md:inline-block z-10" />

      <div className="w-full z-50 flex flex-col items-center gap-8 absolute top-8">
        <p className="text-white font-medium text-3xl">IP Address Tracker</p>

        <form
          className="flex flex-row justify-between bg-white rounded-xl w-[90%] md:max-w-lg"
          onSubmit={getIpAddressLocation}
        >
          <input
            type="text"
            className="outline-none mx-4 w-full"
            id="ip_address"
            name="ip_address"
            placeholder="Search for any IP address or domain"
            value={ip}
            onChange={onChangeSetIp}
          />
          <button type="submit" className="bg-black rounded-r-xl p-6">
            <img src={ArrowRightIcon} />
          </button>
        </form>

        <div
          className="flex flex-col gap-3 justify-center items-center bg-white rounded-xl w-[90%] p-6 
                     md:flex-row md:gap-0 md:justify-between md:items-start md:h-fit md:divide-x
                     lg:w-fit lg:max-w-full"
        >
          <div id="located_ip" className="flex flex-col items-center gap-1 md:items-start md:pr-6">
            <p className="uppercase text-dark-gray-2 font-medium text-xs tracking-widest min-w-max">IP ADDRESS</p>
            <p className="font-medium text-2xl">{result && result.ip ? result.ip : "-"}</p>
          </div>

          <div id="located_location" className="flex flex-col items-center gap-1 md:items-start md:px-6">
            <p className="uppercase text-dark-gray-2 font-medium text-xs tracking-widest">Location</p>
            <p className="font-medium text-2xl text-center md:text-left break-words">{getResultLocationString()}</p>
          </div>

          <div id="located_timezone" className="flex flex-col items-center gap-1 md:items-start md:px-6 md:h-full">
            <p className="uppercase text-dark-gray-2 font-medium text-xs tracking-widest">Timezone</p>
            <p className="font-medium text-2xl">
              {result && result.location.timezone ? `UTC ${result.location.timezone}` : "-"}
            </p>
          </div>

          <div id="located_isp" className="flex flex-col items-center gap-1 md:items-start md:pl-6">
            <p className="uppercase text-dark-gray-2 font-medium text-xs tracking-widest">ISP</p>
            <p className="font-medium text-2xl">{result && result.isp ? result.isp : "-"}</p>
          </div>
        </div>
      </div>

      <div id="map_container" className="w-full h-[72%] z-0"></div>
    </>
  );
}

export default App;

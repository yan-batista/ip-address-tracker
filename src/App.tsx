import "./styles/index.css";
import MobileBackground from "./assets/pattern-bg-mobile.png";
import DesktopBackground from "./assets/pattern-bg-desktop.png";
import ArrowRightIcon from "./assets/icon-arrow.svg";
import * as L from "leaflet";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    if (!document.querySelector("#map_container .leaflet-pane")) {
      let map = L.map("map_container").setView([51.505, -0.09], 13);
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);
    }
  }, []);

  return (
    <>
      <img src={MobileBackground} alt="background" className="w-full md:hidden " />
      <img src={DesktopBackground} alt="background" className="w-full hidden md:inline-block z-10" />

      <div className="w-full z-10 flex flex-col items-center gap-8 absolute top-8">
        <p className="text-white font-medium text-3xl">IP Address Tracker</p>

        <div className="flex flex-row justify-between bg-white rounded-xl w-[90%]">
          <input type="text" className="outline-none mx-4 w-full" placeholder="Search for any IP address or domain" />
          <img src={ArrowRightIcon} className="bg-black rounded-r-xl p-6" />
        </div>

        <div className="flex flex-col gap-3 justify-center items-center bg-white rounded-xl w-[90%] p-6">
          <div id="located_ip" className="flex flex-col items-center gap-1">
            <p className="uppercase text-dark-gray-2 font-medium text-xs tracking-widest">IP ADDRESS</p>
            <p className="font-medium text-2xl">192.212.174.101</p>
          </div>

          <div id="located_location" className="flex flex-col items-center gap-1">
            <p className="uppercase text-dark-gray-2 font-medium text-xs tracking-widest">Location</p>
            <p className="font-medium text-2xl">Brooklyn, NY 10001</p>
          </div>

          <div id="located_timezone" className="flex flex-col items-center gap-1">
            <p className="uppercase text-dark-gray-2 font-medium text-xs tracking-widest">Timezone</p>
            <p className="font-medium text-2xl">UTC -05:00</p>
          </div>

          <div id="located_isp" className="flex flex-col items-center gap-1">
            <p className="uppercase text-dark-gray-2 font-medium text-xs tracking-widest">ISP</p>
            <p className="font-medium text-2xl">SpaceX Starlink</p>
          </div>
        </div>
      </div>

      <div id="map_container" className="w-full h-full z-0"></div>
    </>
  );
}

export default App;

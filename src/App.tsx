import React from "react";
import BgImage from "./assets/thunderstorm-countryside.jpg";
import icon from "./assets/1.png";
import icon2 from "./assets/2.png";
import icon3 from "./assets/3.png";
import icon4 from "./assets/4.png";
import icon5 from "./assets/5.png";
import icon6 from "./assets/6.png";
import { TbMapPinSearch } from "react-icons/tb";
import { BiSolidError } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Action, fetchLocation } from "./redux/slice.tsx";
import { Rootstate } from "./redux/rootstate.tsx";

export default function App() {
  const dispatch = useDispatch();
  const location = useSelector((state: Rootstate) => state.slice.location);
  const result = useSelector((state: Rootstate) => state.slice.result);
  const error = useSelector((state: Rootstate) => state.slice.error);
  const status = useSelector((state: Rootstate) => state.slice.status);

  const handleSubmit = () => {
    dispatch(fetchLocation(location));
  };

  const weatherId = {
    1: icon,
    2: icon2,
    3: icon3,
    4: icon4,
    5: icon5,
    6: icon6,
  };

  const weatherConditionId = result?.weather[0]?.id;

  const weatherIcon =
    (weatherConditionId && weatherConditionId >= 801 && weatherId[1]) ||
    (weatherConditionId && weatherConditionId === 800 && weatherId[6]) ||
    (weatherConditionId &&
      weatherConditionId >= 200 &&
      weatherConditionId < 300 &&
      weatherId[2]) ||
    (weatherConditionId &&
      weatherConditionId >= 300 &&
      weatherConditionId < 600 &&
      weatherId[3]) ||
    (weatherConditionId &&
      weatherConditionId >= 600 &&
      weatherConditionId < 700 &&
      weatherId[4]) ||
    (weatherConditionId &&
      weatherConditionId >= 700 &&
      weatherConditionId < 800 &&
      weatherId[5]) ||
    null;

  return (
    <main className="w-full h-full relative">
      <div className="w-full h-full">
        <img
          // @ts-ignore
          src={BgImage}
          alt="bg-image"
          className="w-full h-screen"
        />
      </div>
      <div className="absolute top-0 left-0 w-full h-full bg-slate-950/35 p-8 lg:p-24">
        <div className="w-full lg:w-[60%] m-auto flex items-center gap-2 rounded-lg bg-slate-950/50 backdrop-blur-md border border-white/60">
          <div className="w-[80%] lg:w-[75%]">
            <input
              className="p-3 pl-4 w-full bg-transparent outline-none text-white"
              value={location}
              placeholder="Enter Location to search here..."
              onChange={(e) => dispatch(Action.setLocation(e.target.value))}
            />
          </div>
          <div className="p-2 lg:w-[25%]">
            <button
              onClick={handleSubmit}
              className="bg-emerald-400 w-full p-2 text-center rounded-xl text-sm tracking-tighter"
            >
              <TbMapPinSearch size={25} className="w-[70%] m-auto" />
            </button>
          </div>
        </div>
        {result ? (
          <div className="bg-slate-950/50 text-white backdrop-blur-sm w-full lg:w-[60%] m-auto mt-12 rounded-lg">
            <div className="flex flex-col-reverse lg:flex-row items-center p-4 lg:p-12">
              <div className="lg:w-1/2 w-full px-8 lg:px-12">
                <p className="lg:text-6xl text-xl font-light uppercase tracking-tighter mb-2">
                  {result?.name}
                </p>
                <p className="text-6xl font-extrabold tracking-tighter mb-2">
                  {result?.main?.temp.toFixed(2)}°
                </p>
                <p className="text-lg font-light capitalize">
                  {/* @ts-ignore */}
                  {result?.weather[0]?.description}
                </p>
                <p className="text-lg font-light capitalize">
                  {/* @ts-ignore */}
                  {result?.name} - {result?.sys?.country}
                </p>
              </div>
              <div className="lg:w-1/2 w-full flex justify-center lg:justify-end p-4">
                <img
                  // @ts-ignore
                  src={weatherIcon}
                  alt="weather-icon"
                  width={250}
                  height={250}
                />
              </div>
            </div>
          </div>
        ) : !result && error ? (
          <div className="bg-slate-950/50 text-white backdrop-blur-sm text-center flex flex-col gap-4 items-center place-content-center w-full lg:w-[60%] m-auto mt-12 p-24 rounded-lg">
            <BiSolidError size={100} />
            <p className="text-2xl lg:text-4xl font-bold tracking-tighter">
              {error}
            </p>
          </div>
        ) : status === "loading" ? (
          <div className="bg-slate-950/50 text-white backdrop-blur-sm text-center flex flex-col gap-4 items-center place-content-center w-full lg:w-[60%] m-auto mt-12 p-24 rounded-lg">
            <p className="text-2xl lg:text-4xl font-bold tracking-tighter">
              Loading, please wait...
            </p>
          </div>
        ) : null}
      </div>
    </main>
  );
}

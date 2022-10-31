//github:maplibre/maplibre-gl-geocoder

import "./styles.css";
import React, { useEffect, useRef, useState, useCallback } from "react";
import Map from "react-map-gl";
import "./styles.css";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import Controls from "./components/Controls";
import {
  Heatmaplayers,
  GeoJsonPointLayers,
  GeoJsonPolygonLayers
} from "./components/RenderLayers";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import { MapboxOverlay } from "@deck.gl/mapbox";
import ListItems from "./components/ListItem";
import ToggleButtons from "./components/ToggleButton";
import Drawers from "./components/Drawer";
import Charts from "./components/Chart";
import {
  FaChartBar,
  FaLayerGroup,
  FaDownload,
  FaExchangeAlt,
  FaRegClock
} from "react-icons/fa";
import * as data from "./components/data/Data";

const mapStyle = {
  Light:
    "https://api.maptiler.com/maps/streets/style.json?key=YbCPLULzWdf1NplssEIc",
  Dark:
    "https://api.maptiler.com/maps/62ab0c0b-09b1-4c58-b0c4-2e82ca1cf5ed/style.json?key=YbCPLULzWdf1NplssEIc",
  Hybrid:
    "https://api.maptiler.com/maps/hybrid/style.json?key=YbCPLULzWdf1NplssEIc#0.8/-14.45028/20.54042"
};

const INITIAL_VIEW_STATE = {
  longitude: -73.75,
  latitude: 40.73,
  zoom: 4,
  maxZoom: 22,
  pitch: 0,
  bearing: 0,
  maxPitch: 85
};

let isHovering = false;

export default function App() {
  const [style, setStyle] = useState(mapStyle["Light"]);

  const [mapLoaded, setMapLoaded] = useState(false);
  const [openAnalytics, setOpenAnalytics] = useState(false);
  const [openLayers, setOpenLayers] = useState(false);
  const [openViews, setOpenViews] = useState(false);
  const [openDownLoad, setOpenDownLoad] = useState(false);
  const [openSliders, setOpenSliders] = useState(false);
  const [buttonList, setButtonList] = useState({});
  const mapRef = useRef();
  //const [boroughData, setBoroughData] = useState(Boroughs);

  const [layers, setLayers] = useState([
    GeoJsonPointLayers({
      id: "GeoPointLayer",
      data: data.data_url,
      beforeId: "road_label",
      getRadius: (f) => {
        if (
          f.properties.number_of_persons_injured === "0" &&
          f.properties.number_of_persons_killed === "0"
        ) {
          return 100;
        }
        return (
          (Number(f.properties.number_of_persons_injured) +
            Number(f.properties.number_of_persons_killed)) *
          100
        );
      },
      getElevation: (f) => f.properties.number_of_persons_killed * 1000,
      visible: true
    }),
    GeoJsonPolygonLayers({
      id: "GeoPolygonLayer",
      data: data.boroughs,
      beforeId: "road_label",
      getLineColor: [252, 186, 3],
      getFillColor: [252, 186, 3],
      getElevation: (f) => f.properties.boro_code * 1000,
      visible: true
    }),
    Heatmaplayers({
      id: "HeatmapLayer",
      data: data.data,
      beforeId: "road_label",
      getWeight: (d) => d[2],
      getPosition: (d) => [d[0] + 1, d[1] + 0.5],
      visible: true
    })
  ]);
  useEffect(() => {
    let IdsVis = {};

    for (let i = 0; i < layers.length; i++) {
      if (layers) {
        IdsVis[layers[i][0].id] = layers[i][0].props.visible;
      }
    }
    var sortedList = {};

    Object.keys(IdsVis)
      .sort()
      .forEach((a) => (sortedList[a] = IdsVis[a]));

    setButtonList(sortedList);
  }, [layers]);

  const DeckGL  = new MapboxOverlay({
    layers: layers,
    interleaved: true,
    getTooltip: ({ object }) =>
      object &&
      `Injured: ${object.properties.number_of_persons_injured} Killed: ${object.properties.number_of_persons_killed}
      Id:${object.properties.collision_id} `,
    //onWebGLInitialized: onDeckLoaded,
    onHover: ({ object }) => (isHovering = Boolean(object)),
    getCursor: ({ isDragging }) =>
      isDragging ? "inherit" : isHovering ? "pointer" : "inherit"
  });

  const onMapLoad = useCallback(() => {
    const map = mapRef.current.getMap();

    if (!map) {
      return;
    }
    map.addControl(DeckGL);
    setMapLoaded(true);
  });

  return (
    <div className="App">
      <div className={"MenuArea"}>
        <List
          sx={{
            bgcolor: "background.paper",
            height: "100vh",
            boxShadow: 1
          }}
        >
          <CssBaseline />
          <List key="Menu" sx={{ height: "33.3%" }}>
            <ListItems
              key={"Analytics"}
              title={"Analytics"}
              myIcon={<FaChartBar />}
              onClick={() =>
                openAnalytics === false
                  ? setOpenAnalytics(true)
                  : setOpenAnalytics(false)
              }
              height="33%"
            />
            <ListItems
              key={"Layers"}
              title={"Layers"}
              myIcon={<FaLayerGroup />}
              onClick={() =>
                openLayers === false
                  ? setOpenLayers(true)
                  : setOpenLayers(false)
              }
              height="33%"
            />
            <ListItems
              key={"Switch View"}
              title={"Switch View"}
              myIcon={<FaExchangeAlt />}
              onClick={() =>
                openViews === false ? setOpenViews(true) : setOpenViews(false)
              }
              height="33%"
            />
          </List>

          <Divider />
          <List key="BaseMap" sx={{ height: "33.3%" }}>
            <ToggleButtons
              myStyle={style}
              mapStyle={mapStyle}
              onClick={TglBasebtn}
            />
          </List>
          <Divider />
          <List sx={{ height: "33.3%" }} key="Download">
            <div style={{ height: "33%" }}> </div>
            {/* <ListItems
              key={"Reset"}
              title={"Reset"}
              myIcon={<FaRedoAlt />}
              onClick={window.location.reload()}
              height="33%"
            /> */}
            <ListItems
              key={"TimeSliders"}
              title={"Time Sliders"}
              myIcon={<FaRegClock />}
              onClick={() =>
                openSliders === false
                  ? setOpenSliders(true)
                  : setOpenSliders(false)
              }
              height="33%"
            />
            <ListItems
              myKey={"Download"}
              title={"DownLoad Data"}
              myIcon={<FaDownload />}
              onClick={() =>
                openDownLoad === false
                  ? setOpenDownLoad(true)
                  : setOpenDownLoad(false)
              }
              height="33%"
            />
          </List>
        </List>
      </div>
      <div className="MapArea">
        <Map
          className={"myMap"}
          mapLib={maplibregl}
          ref={mapRef}
          mapStyle={style}
          hash={true}
          maxPitch={85}
          onLoad={onMapLoad}
          initialViewState={INITIAL_VIEW_STATE}
          style={{
            width: "92%",
            position: "absolute",
            height: openAnalytics === true ? "60%" : "100%",
            backgroundColor:
              style ===
              "https://api.maptiler.com/maps/streets/style.json?key=YbCPLULzWdf1NplssEIc"
                ? "#BBD6DC"
                : style ===
                  "https://api.maptiler.com/maps/hybrid/style.json?key=YbCPLULzWdf1NplssEIc#0.8/-14.45028/20.54042"
                ? "#6BD1EA"
                : "#1F4E71"
          }}
        >
          <Controls />
        </Map>
      </div>

      <Drawers
        myKey={"Analytics"}
        height={"40%"}
        marginTop={"0%"}
        marginLeft={"8%"}
        width={"92%"}
        anchor={"bottom"}
        open={openAnalytics}
        onClick={() => setOpenAnalytics(false)}
        //Charts={<Charts data={processData(DATA, 0, 2)} />}
      ></Drawers>

      <Drawers
        myKey={"Layers"}
        height={"20%"}
        marginTop={"0%"}
        marginLeft={"8%"}
        width={"92%"}
        anchor={"top"}
        open={openLayers}
        onClick={() => setOpenLayers(false)}
        ButtonList={buttonList}
        ButtonClick={LayersToggle}
      />

      <Drawers
        myKey={"SwitchViews"}
        marginTop={"10%"}
        height={"20%"}
        marginLeft={"8%"}
        width={"30%"}
        anchor={"left"}
        open={openViews}
        onClick={() => setOpenViews(false)}
      />
    </div>
  );

  function getFirstTextLayerId(style) {
    const layers = style.layers;
    // Find the index of the first symbol (i.e. label) layer in the map style
    let firstSymbolId;
    for (let i = 0; i < layers.length; i++) {
      if (layers[i].type === "symbol") {
        firstSymbolId = layers[i].id;
        break;
      }
    }
    return firstSymbolId;
  }

  function TglBasebtn(e) {
    const newStyle = e.target.value;
    setStyle(newStyle);
  }

  function LayersToggle(e) {
    //const decklayers = DeckGL._props.layers;
    const map = mapRef.current.getMap();
    const currentLayers = map.__deck.layerManager.getLayers();
    let unChangedLayers = [];
    let changedLayers = [];
    let newLayerArray = [];
    const key = e.currentTarget.id;
    for (let i = 0; i < layers.length; i++) {
      if (layers && layers[i][0].id !== key) {
        unChangedLayers.push([layers[i][0]]);
      }
    }
    for (let i = 0; i < currentLayers.length; i++) {
      if (currentLayers && currentLayers[i].id === key) {
        changedLayers.push([
          currentLayers[i].clone({ visible: !currentLayers[i].props.visible })
        ]);
      }
    }
    newLayerArray = unChangedLayers.concat(changedLayers);

    map.__deck.setProps({ layers: newLayerArray });
    setLayers(newLayerArray);
  }

  function processData(data, x, y) {
    const graphData = data.map((e) => ({
      key: e[x],
      data: e[y]
    }));
    return graphData;
  }

  function getTooltip({ object }) {
    return (
      object && {
        html: `\
      <div><b>Details</b></div>
      <div>${object.properties}</div>
      `
      }
    );
  }
}

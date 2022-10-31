import { HeatmapLayer, HexagonLayer, ColumnLayer, GeoJsonLayer } from "deck.gl";
import { MVTLoader } from "@loaders.gl/mvt";
import { scaleLinear } from "d3-scale";

const COLOR_SCALE = scaleLinear()
  .domain([-3, 1, 6])
  .range([
    [0, 237, 0],
    [237, 231, 31],
    [255, 16, 16]
  ]);

export function GeoJsonPointLayers(props) {
  const { visible, data, beforeId, id, getRadius, getElevation } = props;

  const layer = [
    new GeoJsonLayer({
      id: id,
      stroked: false,
      filled: true,
      wireframe: true,
      radiusScale: 1,
      opacity: 0.5,
      getLineColor: (f) =>
        COLOR_SCALE(
          Number(f.properties.number_of_persons_injured) +
            Number(f.properties.number_of_persons_killed)
        ),
      getFillColor: (f) =>
        COLOR_SCALE(
          Number(f.properties.number_of_persons_injured) +
            Number(f.properties.number_of_persons_killed)
        ),
      getPointRadius: getRadius,
      data,
      extruded: true,
      getElevation: getElevation,
      pickable: true,
      autoHighlight: true,
      onClick: ({ object }) => console.log(object),
      beforeId: beforeId,
      visible: visible
    })
  ];

  return layer;
}

export function GeoJsonPolygonLayers(props) {
  const {
    visible,
    getFillColor,
    getLineColor,
    data,
    beforeId,
    id,
    getElevation
  } = props;

  const layer = [
    new GeoJsonLayer({
      id: id,
      stroked: true,
      filled: true,
      wireframe: true,
      opacity: 0.5,
      getLineColor: getLineColor,
      getFillColor: getFillColor,
      data,
      extruded: true,
      getElevation: getElevation,
      pickable: true,
      autoHighlight: true,
      onClick: ({ object }) => console.log(object),
      beforeId: beforeId,
      visible: visible
    })
  ];

  return layer;
}

export function Heatmaplayers(props) {
  const { visible, data, beforeId, id, getPosition } = props;

  const layer = [
    new HeatmapLayer({
      id: id,

      data,
      autoRender: true,
      opacity: 0.5,
      getPosition: getPosition,

      radiusPixels: 30,
      intensity: 10,
      threshold: 0.03,
      autoHighlight: true,
      onClick: ({ object }) => console.log(object),
      beforeId: beforeId,
      visible: visible
    })
  ];

  return layer;
}

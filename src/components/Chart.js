import { BarChart } from "reaviz";

const Charts = (props) => {
  const {
    data,
    isCategorical,
    padding,
    groupPadding,
    key,
    LinearYAxis,
    LinearXAxis,
    GridlineSeries,
    type
  } = props;
  return <BarChart height={"100%"} width={"100%"} data={data} />;
};

export default Charts;

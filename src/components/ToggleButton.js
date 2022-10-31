import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { alpha } from "@material-ui/core/styles/colorManipulator";

export default function ToggleButtons(props) {
  const { myStyle, mapStyle, onClick } = props;
  const btnStyle = {
    display: "flex",
    fontFamily: "sans-serif",
    fontSize: 12,
    textTransform: "capitalize",
    height: "33.3%",
    borderRadius: 0,
    border: 0,
    boxSizing: "border-box",

    "&:hover": {
      color: "white",
      backgroundColor: "#B7BBBA",
      opacity: 0.7
    },
    "&.Mui-selected": {
      color: "white",
      backgroundColor: alpha("#0F5644", 0.8),
      borderBottom: 2,
      borderColor: "#3C3D3D",
      boxSizing: "border-box"
    }
  };
  return (
    <ToggleButtonGroup
      value={myStyle}
      exclusive
      onClick={onClick}
      orientation={"vertical"}
      sx={{
        width: "100%",

        height: "100%",
        boxSizing: "border-box"
      }}
    >
      <ToggleButton value={mapStyle.Light} sx={btnStyle}>
        Light
      </ToggleButton>
      <ToggleButton value={mapStyle.Dark} sx={btnStyle}>
        Dark
      </ToggleButton>
      <ToggleButton value={mapStyle.Hybrid} sx={btnStyle}>
        Hybrid
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

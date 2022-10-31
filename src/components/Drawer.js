import Drawer from "@mui/material/Drawer";
import { FaRegTimesCircle, FaEyeSlash, FaEye } from "react-icons/fa";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";

import { alpha } from "@material-ui/core/styles/colorManipulator";
import Tooltip from "@mui/material/Tooltip";

const DrawerItems = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  width: "94%"
}));
const DrawerClose = styled("div")(({ theme }) => ({
  width: "6"
}));

const ButtonDescription = styled("div")(({ theme }) => ({
  padding: 5,
  fontFamily: "sans-serif",
  fontSize: 14,
  alignSelf: "center"
}));

export default function Drawers(props) {
  const {
    marginTop,
    marginLeft,
    myKey,
    height,
    width,
    anchor,
    open,
    onClick,
    ButtonList,
    Charts,
    ButtonClick
  } = props;

  return (
    <Drawer
      key={myKey}
      sx={{
        height: { height },
        width: { width },
        marginLeft: { marginLeft },
        marginTop: { marginTop },
        overflow: "hidden",
        display: "flex",
        flexDirection: "row",
        float: "left",
        "& .MuiDrawer-paper": {
          height: { height },
          width: { width },
          marginLeft: { marginLeft },
          marginTop: { marginTop },
          overflow: "hidden",
          display: "flex",
          flexDirection: "row",
          float: "left",
          backgroundColor: alpha("#0F5644", 0.3),
          color: "white"
        }
      }}
      variant="persistent"
      anchor={anchor}
      open={open}
    >
      <DrawerItems key="DrawerItems">
        {!ButtonList ? (
          <></>
        ) : (
          Object.entries(ButtonList).map(([key, value]) => (
            <ButtonDescription key={"bd" + key}>
              {key}
              <Tooltip
                key={"tt" + key}
                title={value === false ? "Show" : "Hide"}
                placement="bottom"
              >
                <IconButton id={key} onClick={ButtonClick}>
                  {value === false ? (
                    <FaEyeSlash size="22px" color="white" />
                  ) : (
                    <FaEye size="22px" color="white" />
                  )}
                </IconButton>
              </Tooltip>
            </ButtonDescription>
          ))
        )}
        {Charts}
      </DrawerItems>

      <DrawerClose key="DrawerClose">
        <IconButton key="close" onClick={onClick}>
          <FaRegTimesCircle size="17px" color="white" />
        </IconButton>
      </DrawerClose>
    </Drawer>
  );
}

import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Tooltip from "@mui/material/Tooltip";

export default function ListItems(props) {
  const { myKey, title, myIcon, onClick, height } = props;
  return (
    <Tooltip key={"tt" + myKey} title={title} placement="right-end">
      <ListItem
        key={myKey}
        disablePadding
        sx={{ display: "block", height: { height } }}
      >
        <ListItemButton
          sx={{
            minHeight: "100%",
            justifyContent: "center",
            px: 2.5
          }}
          onClick={onClick}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,

              justifyContent: "center"
            }}
          >
            {myIcon}
          </ListItemIcon>
        </ListItemButton>
      </ListItem>
    </Tooltip>
  );
}

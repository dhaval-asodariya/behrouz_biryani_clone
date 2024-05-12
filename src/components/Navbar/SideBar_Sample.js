import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Link, Typography } from "@mui/material";
import CallIcon from "@mui/icons-material/Call";

function TemporaryDrawer({ isOpen, HandleIsOpen }) {
  const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };
  // const [isOpen, setIsOpen] = useState(true);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    HandleIsOpen(open);
  };

  const list = () => (
    <Box
      sx={{ width: 300 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {[
          "Help & Support",
          "Terms & Conditions",
          "Privacy Policy",
          "Party Orders",
          "Mehfil By Behrouz",
        ].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton sx={{padding:'16px 32px',}}>
              {/* <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon> */}
              <Link sx={{color: "rgb(29, 29, 29)"}}>
              {/* <ListItemText  primary={text} /> */}
              <Typography style={{fontSize:'20px'}}>{text}</Typography>
              </Link>
              
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box sx={{ display: "flex",alignItems:'center',padding:'16px 32px'}}>
      <CallIcon
                sx={{
                  color: "#bda26e",
                  border: "1px solid #bda26e",
                  borderRadius: "50%",
                  fontSize: "30px",
                  padding: "3px",
                  marginRight: "12px",
                }}
              ></CallIcon>
              
              <Box>
              <Typography
            sx={{
                textAlign: 'left',
                fontSize: '18px',
                color: isHovered ? '#bda26e' : '#000', // Change color on mouse hover
            }}
            onMouseEnter={handleMouseEnter} // Set isHovered to true on mouse enter
            onMouseLeave={handleMouseLeave} // Set isHovered to false on mouse leave
        >
            We are here to help you.
            <br />
            <a
                style={{ color: "rgb(29, 29, 29)", textDecoration: 'none' }} // Inherit color from parent Typography component
                href="tel:2007700050050"
            >
                Call us at <strong>07700050050</strong>
            </a>
        </Typography>
              </Box>
      </Box>
      <Divider />
    
    </Box>
  );

  return (
    <div>
      <React.Fragment>
        {/* <Button onClick={toggleDrawer(true)}>right</Button> */}
        <Drawer anchor="right" open={isOpen} onClose={toggleDrawer(false)}>
          {list()}
        </Drawer>
      </React.Fragment>
    </div>
  );
}

export default TemporaryDrawer;

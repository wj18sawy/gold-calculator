import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import { Tabs, Tab, TabList, TabLink, Icon } from "bloomer";

const NavBar = () => {
  return (
    <div>
      <Tabs>
        <TabList>
          <CustomTab activeOnlyWhenExact={true} to="/" label="GoldCalc" />
          <CustomTab to="/silverform" label="SilverCalc" />
        </TabList>
      </Tabs>
    </div>
  );
};

export default NavBar;

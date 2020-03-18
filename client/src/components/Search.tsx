import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import { searchStyles } from "../common.styles";

interface SearchProps {
  [key: string]: any;
}

export default (props: SearchProps) => {
  const classes = searchStyles();
  const [searchInput, setSearchInput] = useState("");
  return (
    <Paper component="form" className={classes.root}>
      <IconButton className={classes.iconButton} aria-label="menu"></IconButton>
      <InputBase
        className={classes.input}
        placeholder="Search Github For Repositories"
        inputProps={{ "aria-label": "Search for Github repositories" }}
        value={searchInput}
        onChange={e => {
          setSearchInput(e.target.value);
        }}
      />
      <IconButton
        type="submit"
        className={classes.iconButton}
        aria-label="search"
      ></IconButton>
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton
        color="primary"
        className={classes.iconButton}
        aria-label="directions"
        onClick={e => {
          props.setQuery(searchInput);
        }}
      ></IconButton>
    </Paper>
  );
};

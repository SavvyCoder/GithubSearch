import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import CriteriaMenu from "../components/Criteria";
import { searchStyles, SearchHeading, SeachContainer } from "../common.styles";

interface ResultData {
  name: string;
  id: number;
  full_name: string;
  description?: string;
  stargazers_count: number;
  watchers: number;
  forks_count: number;
  open_issues: number;
  language: string;
}

interface SearchProps {
  setQuery: Function;
  useResults: [ResultData[] | null, Function];
}

export default (props: SearchProps) => {
  const classes = searchStyles();
  const [searchInput, setSearchInput] = useState("");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  return (
    <SeachContainer>
      <SearchHeading variant="h4">Github Search</SearchHeading>
      <Paper
        component="form"
        className={classes.root}
        onSubmit={event => {
          event.preventDefault();
          props.setQuery(searchInput);
        }}
      >
        <IconButton
          className={classes.iconButton}
          aria-label="menu"
          onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
            setAnchorEl(event.currentTarget);
          }}
        >
          <MenuIcon />
        </IconButton>
        <CriteriaMenu
          useResults={props.useResults}
          anchor={[anchorEl, setAnchorEl]}
        />
        <InputBase
          className={classes.input}
          placeholder="Search Github For Repositories"
          inputProps={{ "aria-label": "Search for Github repositories" }}
          value={searchInput}
          onChange={e => {
            setSearchInput(e.target.value);
          }}
        />
        <Divider className={classes.divider} orientation="vertical" />
        <IconButton
          color="primary"
          className={classes.iconButton}
          aria-label="search"
          onClick={e => {
            props.setQuery(searchInput);
          }}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    </SeachContainer>
  );
};

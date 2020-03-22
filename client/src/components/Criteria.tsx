import React, { useState } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import { menuSelectStyles } from "../common.styles";

interface CriteriaProps {
  useResults: [ResultData[] | null, Function];
  anchor: [HTMLElement | null, Function];
}

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

type Sort = "stars_asc" | "stars_desc" | "score_asc" | "score_desc" | "none";

export default (props: CriteriaProps) => {
  const [anchorEl, setAnchorEl] = props.anchor;
  const [results, setResults] = props.useResults;

  const [sort, setSort] = React.useState<Sort>("none");
  const [filterLanguage, setFilterLanguage] = React.useState<string>("none");

  const sortList: Sort[] = [
    "stars_asc",
    "stars_desc",
    "score_asc",
    "score_desc"
  ];

  //Build filters
  const languageOptions = results ? buildLanguageFilter(results) : null;

  //Sort options
  const sortOptions = buildSortOptions(sortList);

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Menu
      id="criteria-menu"
      elevation={0}
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center"
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center"
      }}
      style={{ marginTop: "52px" }}
    >
      <MenuItem onClick={handleClose} disabled={Boolean(results)}>
        Reset
      </MenuItem>
      <MenuItem onClick={handleClose} disabled={!Boolean(results)}>
        <SelectMenuItem
          options={sortOptions}
          label="Sort By"
          useValue={[sort, setSort]}
          helperText="Select sort option"
        />
      </MenuItem>
      <MenuItem>
        <SelectMenuItem
          options={languageOptions as Set<option>}
          label="Language"
          useValue={[filterLanguage, setFilterLanguage]}
          helperText="Select filter language"
        />
      </MenuItem>
    </Menu>
  );
};

interface option {
  value: string | number;
  text: string;
}

interface SelectMenuItemProps {
  options: option[] | Set<option> | null;
  useValue: [string | number, Function];
  label: string;
  helperText: string;
}

export const SelectMenuItem = (props: SelectMenuItemProps) => {
  const classes = menuSelectStyles();
  const { options, helperText, label } = props;
  const [value, setValue] = props.useValue;

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="select-helper-label">{label}</InputLabel>
      <Select
        labelId="select-helper-label"
        id="select-helper"
        value={value}
        onChange={event => {
          setValue(event.target.value as string | number);
        }}
      >
        <MenuItem value="none">
          <em>None</em>
        </MenuItem>
        {/* Map our options to option select components */}
        {options &&
          (Array.from(options) as option[]).map(
            (option: option, index: number) => {
              return <MenuItem value={option.value}>{option.text}</MenuItem>;
            }
          )}
      </Select>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
};

export const filterLanguage = (results: ResultData[], language: string) => {
  return results.filter((result: ResultData) => {
    return result.language === language;
  });
};

export const buildLanguageFilter = (results: ResultData[]) => {
  const languageSet = new Set();
  results.forEach((result: ResultData) => {
    languageSet.add({ value: result.language, text: result.language });
  });
  return languageSet;
};

export const buildSortOptions = (sortOptions: Sort[]) => {
  //Return string with first value uppercase
  const firstUpper = (text: string) => {
    return `${text.charAt(0).toUpperCase()}${text.slice(1)}`;
  };
  return sortOptions.map(sortVal => {
    //Convert our sort key abbreviation to full text based on formatting (key_order)
    let [key, order] = sortVal.split("_");
    let text = `${firstUpper(key)} ${firstUpper(order)}ending`;
    return {
      value: sortVal,
      text
    };
  });
};

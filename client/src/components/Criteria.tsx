import React, { useState, useEffect } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import { CriteriaForm } from "../common.styles";
import { ResultData } from "../common.types";

interface CriteriaProps {
  useResults: [ResultData[] | null, Function];
  useDetails: [ResultData | null, Function];
  anchor: [HTMLElement | null, Function];
}

type Sort =
  | "stars_asc"
  | "stars_desc"
  | "score_asc"
  | "score_desc"
  | "size_asc"
  | "size_desc"
  | "forks_asc"
  | "forks_desc"
  | "none";

// This component will build sort list and filter list based on the data and render when called by menu button.
export default (props: CriteriaProps) => {
  const [anchorEl, setAnchorEl] = props.anchor;
  const [results, setResults] = props.useResults;
  const [detail, setDetail] = props.useDetails;

  const [sort, setSort] = React.useState<Sort>("none");
  const [filterLanguage, setFilterLanguage] = React.useState<string>("none");

  const sortList: Sort[] = [
    "stars_asc",
    "stars_desc",
    "size_asc",
    "size_desc",
    "forks_asc",
    "forks_desc",
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

  //When sort changes we alter the results to reflect sort key
  useEffect(() => {
    if (results && sort) {
      setResults(sortResults(results as ResultData[], sort));
    }
  }, [sort]);

  //When filter changes we alter results to exclude filter value
  useEffect(() => {
    if (results && filterLanguage) {
      setResults(filterByLanguage(results as ResultData[], filterLanguage));
    }
  }, [filterLanguage]);

  //When results changes (this is pure results) we reset sort and filter selections, since a new query was made.
  useEffect(() => {
    setSort("none");
    setFilterLanguage("none");
  }, [results]);

  return (
    <Menu
      id="criteria-menu"
      elevation={1}
      anchorEl={anchorEl}
      keepMounted={true}
      open={Boolean(anchorEl)}
      onClose={handleClose}
      transformOrigin={{
        vertical: "top",
        horizontal: "center"
      }}
      style={{ marginTop: "52px" }}
    >
      <MenuItem
        onClick={() => {
          setSort("none");
          setFilterLanguage("none");
          setDetail(null);
          setResults(results);
          handleClose();
        }}
        disabled={!Boolean(results)}
      >
        {detail ? "Go back" : "Reset"}
      </MenuItem>
      <MenuItem
        onClick={handleClose}
        disabled={!Boolean(results) || Boolean(detail)}
      >
        <SelectMenuItem
          options={sortOptions}
          label="Sort By"
          useValue={[sort, setSort]}
          helperText="Select sort option"
        />
      </MenuItem>
      <MenuItem
        onClick={handleClose}
        disabled={!Boolean(results) || Boolean(detail)}
      >
        <SelectMenuItem
          options={languageOptions}
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
  options: option[] | null;
  useValue: [string | number, Function];
  label: string;
  helperText: string;
}

export const SelectMenuItem = (props: SelectMenuItemProps) => {
  const { options, helperText, label } = props;
  const [value, setValue] = props.useValue;

  return (
    <CriteriaForm>
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
          (options as option[]).map((option: option, index: number) => {
            return (
              <MenuItem value={option.value} key={option.value}>
                {option.text}
              </MenuItem>
            );
          })}
      </Select>
      <FormHelperText>{helperText}</FormHelperText>
    </CriteriaForm>
  );
};

//Filter method to filter by language
export const filterByLanguage = (results: ResultData[], language: string) => {
  if (language === "none") {
    return results;
  }
  return results.filter((result: ResultData) => {
    return result.language === language;
  });
};

//Sort results based on sort key and order
export const sortResults = (results: ResultData[], sort: Sort) => {
  if (sort === "none") {
    return results;
  }
  let [key, order] = sort.split("_");
  const _results: ResultData[] = JSON.parse(JSON.stringify(results));
  let isDesc = order === "desc";
  switch (key) {
    case "stars":
      return _results.sort((a: ResultData, b: ResultData) => {
        return isDesc
          ? b.stargazers_count - a.stargazers_count
          : a.stargazers_count - b.stargazers_count;
      });
    default:
      return _results.sort((a: ResultData, b: ResultData) => {
        return isDesc ? b[key] - a[key] : a[key] - b[key];
      });
  }
};

//Build language selections by populating set with unique language values returned from results
export const buildLanguageFilter = (results: ResultData[]) => {
  const languageSet: Set<string> = new Set();
  results.forEach((result: ResultData) => {
    if (!result.language) {
      return;
    }
    languageSet.add(result.language);
  });
  return Array.from(languageSet).map(language => {
    return {
      value: language,
      text: language
    };
  });
};

//Map sort values to select options text
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

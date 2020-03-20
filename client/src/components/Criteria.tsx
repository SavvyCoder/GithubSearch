import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

interface CriteriaProps {
  data: ResultData[];
}

interface ResultData {
  name: string;
  id: number;
  full_name: string;
  description?: string;
  stargazers_count: number;
  language: string;
}

export default (data: CriteriaProps) => {};

export const filterLanguage = (results: ResultData[], language: string) => {
  return results.filter((result: ResultData) => {
    return result.language === language;
  });
};

export const buildLanguageFilter = (results: ResultData[]) => {
  const languageSet = new Set();
  results.forEach((result: ResultData) => {
    languageSet.add(result.language);
  });
  return languageSet;
};

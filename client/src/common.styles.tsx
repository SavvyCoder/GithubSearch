import React from "react";
import styled from "styled-components";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Icon from "@material-ui/core/Icon";

//Our material UI style objects

export const searchStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: "2px 4px",
      display: "flex",
      alignItems: "center",
      width: "600px",
      margin: "auto"
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1
    },
    iconButton: {
      padding: 10
    },
    divider: {
      height: 28,
      margin: 4
    }
  })
);

export const resultStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
      alignItems: "center",
      justifyContent: "space-between",
      display: "flex"
    }
  })
);

export const menuSelectStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120
    }
  })
);

//Our "styled-components"

export const SearchHeading = styled(Typography)`
  padding: 25px 0 25px 0;
`;

export const SeachContainer = styled.div`
  text-align: center;
`;

export const ResultsContainer = styled.div`
  flex-grow: 1;
`;

export const ContentContainer = styled(Container)`
  padding-top: 50px;
  text-align: center;
`;

export const ResultText = styled.span``;

export const ResultItem = styled.div`
  display: flex;
  align-items: center;
  width: 20%;
  text-align: left;
`;

const CommonIconStyles = {
  fontSize: "40px",
  paddingRight: "10px"
};

export const StarIcon: React.FunctionComponent = (props: any) => {
  return <Icon style={{ color: "#FADA5E", ...CommonIconStyles }}>star</Icon>;
};

export const EyeIcon: React.FunctionComponent = (props: any) => {
  return (
    <Icon style={{ color: "#528C9E", ...CommonIconStyles }}>visibility</Icon>
  );
};

export const ForkIcon: React.FunctionComponent = (props: any) => {
  return (
    <Icon style={{ color: "black", ...CommonIconStyles }}>call_split</Icon>
  );
};

export const BugIcon: React.FunctionComponent = (props: any) => {
  return (
    <Icon style={{ color: "black", ...CommonIconStyles }}>bug_report</Icon>
  );
};

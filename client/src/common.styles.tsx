import React from "react";
import styled from "styled-components";
import {
  makeStyles,
  Theme,
  createStyles,
  createMuiTheme
} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Icon from "@material-ui/core/Icon";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";

const theme = createMuiTheme();

//Our material UI class style objects

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

//Our "styled-components"

export const PaperResults = styled(Paper)`
  padding: ${theme.spacing(2)}px;
  color: ${theme.palette.text.primary};
  align-items: center;
  justify-content: space-between;
  display: flex;
  &:hover {
    background-color: ${theme.palette.grey[300]};
    transition: background-color 200ms linear;
  }
`;

export const CriteriaForm = styled(FormControl)`
  margin: ${theme.spacing(1)}px;
  minwidth: 120px;
`;

export const DetailAvatar = styled(Avatar)`
  margin: auto;
  padding: 10px 0 10px 0;
  height: 50px;
  width: 50px;
`;

export const SearchHeading = styled(Typography)`
  padding: 25px 0 25px 0;
`;

export const DetailHeading = styled(Typography)`
  padding: 25px 0 25px 0;
  margin: auto;
`;

export const DetailItem = styled(Grid)`
  display: flex;
  flex-basis: 100%;
  &&& {
    padding: ${theme.spacing(3)}px;
  }
  align-items: center;
  justify-content: center;
  flex-direction: ${(props: { direction?: string }) =>
    props.direction ? props.direction : "row"};
`;

export const DetailText = styled.span``;

export const DetailSubHeader = styled(Typography)``;

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

export const ResultText = styled.div`
  word-break: break-word;
`;

export const ResultItem = styled.div`
  display: flex;
  align-items: center;
  flex-basis: 100%;
  text-align: left;
  padding: ${theme.spacing(1)}px;
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

import React from "react";
import {
  resultStyles,
  ResultsContainer,
  StarIcon,
  ResultText,
  ResultItem,
  EyeIcon,
  ForkIcon,
  BugIcon
} from "../common.styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

interface ResultsProps {
  data: ResultData[] | null;
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
}

interface ResultProps {
  resultData: ResultData;
}

export const Result = ({ resultData }: ResultProps) => {
  const classes = resultStyles();
  const {
    name,
    stargazers_count,
    watchers,
    forks_count,
    open_issues
  } = resultData;
  return (
    <Grid item xs={12}>
      <Paper className={classes.paper}>
        <ResultItem>
          <ResultText>{name}</ResultText>
        </ResultItem>
        <ResultItem>
          <ForkIcon />
          <ResultText>{forks_count}</ResultText>
        </ResultItem>
        <ResultItem>
          <EyeIcon />
          <ResultText>{watchers}</ResultText>
        </ResultItem>
        <ResultItem>
          <BugIcon />
          <ResultText>{open_issues}</ResultText>
        </ResultItem>
        <ResultItem>
          <StarIcon />
          <ResultText>{stargazers_count}</ResultText>
        </ResultItem>
      </Paper>
    </Grid>
  );
};

export default ({ data }: ResultsProps) => {
  return (
    <ResultsContainer>
      <Grid container spacing={3}>
        {(data as ResultData[]).map((resultData: ResultData, index: number) => {
          return <Result resultData={resultData} key={resultData.id} />;
        })}
      </Grid>
    </ResultsContainer>
  );
};

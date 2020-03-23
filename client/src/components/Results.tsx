import React from "react";
import {
  ResultsContainer,
  StarIcon,
  ResultText,
  ResultItem,
  EyeIcon,
  ForkIcon,
  BugIcon,
  PaperResults
} from "../common.styles";
import Grid from "@material-ui/core/Grid";
import { ResultData } from "../common.types";

interface ResultsProps {
  data: ResultData[] | null;
  setDetail: Function;
}

interface ResultProps {
  resultData: ResultData;
  setDetail: Function;
}

export const Result = ({ resultData, setDetail }: ResultProps) => {
  const {
    name,
    stargazers_count,
    watchers,
    forks_count,
    open_issues
  } = resultData;

  //Markup is a combination of MUI and styled(MUI_Component)
  return (
    <Grid
      item
      xs={12}
      onClick={e => {
        setDetail(resultData);
      }}
    >
      <PaperResults>
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
      </PaperResults>
    </Grid>
  );
};

//Loop over results and render
export default ({ data, setDetail }: ResultsProps) => {
  return (
    <ResultsContainer data-testid="results-container">
      <Grid container spacing={3}>
        {(data as ResultData[]).map((resultData: ResultData, index: number) => {
          return (
            <Result
              resultData={resultData}
              key={resultData.id}
              setDetail={setDetail}
            />
          );
        })}
      </Grid>
    </ResultsContainer>
  );
};

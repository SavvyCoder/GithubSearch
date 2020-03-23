import React from "react";
import { ResultData } from "../common.types";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import {
  DetailHeading,
  DetailItem,
  DetailText,
  DetailSubHeader,
  DetailAvatar,
  StarIcon,
  EyeIcon,
  BugIcon,
  ForkIcon
} from "../common.styles";

interface DetailsProps {
  result: ResultData;
}

export default ({ result }: DetailsProps) => {
  const {
    full_name,
    description,
    stargazers_count,
    forks_count,
    name,
    owner,
    open_issues,
    watchers,
    language,
    size
  } = result;
  return (
    <Paper elevation={3}>
      <Grid container spacing={3}>
        <DetailItem item xs={12} direction="column">
          <DetailHeading variant="h3">{name}</DetailHeading>
          <DetailAvatar src={owner.avatar_url} alt={owner.login} />
          <DetailText>{owner.login}</DetailText>
        </DetailItem>
        <DetailItem item xs={12} sm={6} direction="column">
          <DetailSubHeader variant="h6">Full Name</DetailSubHeader>
          <DetailText>{full_name}</DetailText>
        </DetailItem>
        <DetailItem item xs={12} sm={6} direction="column">
          <DetailSubHeader variant="h6">Description</DetailSubHeader>
          <DetailText>{description}</DetailText>
        </DetailItem>
        <DetailItem item xs={12} sm={6} direction="column">
          <DetailSubHeader variant="h6">Language</DetailSubHeader>
          <DetailText>{language}</DetailText>
        </DetailItem>
        <DetailItem item xs={12} sm={6} direction="column">
          <DetailSubHeader variant="h6">Size</DetailSubHeader>
          <DetailText>{size}KB</DetailText>
        </DetailItem>
        <DetailItem item xs={12} sm={6}>
          <StarIcon />
          <DetailText>{stargazers_count}</DetailText>
        </DetailItem>
        <DetailItem item xs={12} sm={6}>
          <ForkIcon />
          <DetailText>{forks_count}</DetailText>
        </DetailItem>
        <DetailItem item xs={12} sm={6}>
          <BugIcon />
          <DetailText>{open_issues}</DetailText>
        </DetailItem>
        <DetailItem item xs={12} sm={6}>
          <EyeIcon />
          <DetailText>{watchers}</DetailText>
        </DetailItem>
      </Grid>
    </Paper>
  );
};

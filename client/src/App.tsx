import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import Search from "./components/Search";
import Container from "@material-ui/core/Container";
import Api from "./services/Api";
import Results from "./components/Results";
import Details from "./components/Details";
import CircularProgress from "@material-ui/core/CircularProgress";
import { ContentContainer } from "./common.styles";
import { ResultData } from "./common.types";

function App() {
  //Declare app state modifiers
  const [query, setQuery] = React.useState<string | null>(null);
  const [results, setResults] = React.useState<ResultData[] | null>(null);
  const [dirtyResults, setDirtyResults] = React.useState<ResultData[] | null>(
    null
  );
  const [loading, setLoading] = React.useState<Boolean>(false);
  const [detail, setDetail] = React.useState<ResultData | null>(null);
  const [content, setContent] = React.useState<JSX.Element | null>();

  //Hook to fetch our data on search submit
  useEffect(() => {
    if (query) {
      const fetchResult = async () => {
        try {
          setLoading(true);
          const res = await Api().post("", {
            name: query
          });
          console.log(res.data);
          setResults(res.data.items);
          setDirtyResults(JSON.parse(JSON.stringify(res.data.items)));
          setDetail(null);
        } catch (err) {
          throw err;
        }
      };
      fetchResult();
    }
  }, [query]);

  //Hook to display results on fetch/change
  useEffect(() => {
    if (results) {
      setLoading(false);
    }
  }, [results]);

  //Hook to update content
  useEffect(() => {
    if (detail) {
      setContent(<Details result={detail} />);
    } else if (dirtyResults) {
      setContent(<Results data={dirtyResults} setDetail={setDetail} />);
    } else {
      setContent(<CircularProgress />);
    }
  }, [detail, dirtyResults]);

  return (
    <Container maxWidth="md">
      <Search
        setQuery={setQuery}
        useResults={[results, setDirtyResults]}
        useDetails={[detail, setDetail]}
      />
      <ContentContainer>
        {loading ? <CircularProgress /> : dirtyResults && content}
      </ContentContainer>
    </Container>
  );
}

export default App;

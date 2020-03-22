import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import Search from "./components/Search";
import Container from "@material-ui/core/Container";
import Api from "./services/Api";
import Results from "./components/Results";
import CircularProgress from "@material-ui/core/CircularProgress";
import { ContentContainer } from "./common.styles";

function App() {
  const [query, setQuery] = useState();
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

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

  return (
    <Container maxWidth="md">
      <Search setQuery={setQuery} useResults={[results, setResults]} />
      <ContentContainer>
        {loading ? <CircularProgress /> : results && <Results data={results} />}
      </ContentContainer>
    </Container>
  );
}

export default App;

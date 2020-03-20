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
  const [results, setResults] = useState();
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
          setResults(res.data);
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
      <Search setQuery={setQuery} />
      <ContentContainer>
        {loading ? (
          <CircularProgress />
        ) : (
          results && <Results data={results.items} />
        )}
      </ContentContainer>
    </Container>
  );
}

export default App;

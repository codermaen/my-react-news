import React, { useState, useEffect } from "react";
import { Link, BrowserRouter as Router, Route, Routes, useParams } from "react-router-dom";
import countries from './countries.json'

const CountriesPage = () => {

  const { country } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    fetch(`http://newsapi.org/v2/top-headlines?country=${country}&apiKey=${'45512bf52fe44ac888e6bfb092b69da0'}&pageSize=5`, {})
      .then((res) => res.json())
      .then((response) => {
        setData(response.articles);
        setIsLoading(false);
      })
      .catch((error) => console.log(error, 'custom'));
  }, [country]);

  return (
    <>
      {!isLoading && data.map((news, index) => {
        return (
          <div key={index} style={{ padding: 20, display: 'flex', flexDirection: 'row' }}>
            <img
              src={news.urlToImage}
              height={108}
              width={108}
              alt={'news'}
            />
            <div style={{ padding: 10, marginTop: -40 }}>
              <a href={news.url}><h1>{news.title}</h1></a>
              {news.description}
              <br />
              {news.publishedAt}
            </div>
          </div>
        );
      })}
    </>
  );
};

const HomePage = () => {
  return (

    <>
      <h3 style={{ alignSelf: 'center' }}>News</h3>

      <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between' }}>
        {countries.map((country, index) => {
          return (
            <div key={index}>
              <div style={{ padding: 10 }}>
                <Link to={`/country/${country}`}>{country}</Link>

              </div>
            </div>
          );
        })}
      </div>
    </>
  );

};
const App = () => {
  return (
    <div >
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/country/:country" element={<CountriesPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;

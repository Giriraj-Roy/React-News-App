import  React, { useEffect, useState } from 'react';


function App() {

  const [news, setNews] = useState([]);
  const [searchWord, setSearchWord ] = useState('politics');
  const [apiUrl, setApiUrl ] = useState(`https://gnews.io/api/v4/search?q=${searchWord}&token=f9e111081543a12f2bb5a933bac85765`)


  const fetchNews = () =>{
    fetch(apiUrl)
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data)
      setNews(data.articles)
    })
    .catch(error => console.log(error))
  }
  
  useEffect( () => {
    fetchNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[apiUrl])


  const callApi = e =>{
    setSearchWord(e.target.value)
  };
  const callSearch = e =>{
    e.preventDefault();
    setApiUrl(`https://gnews.io/api/v4/search?q=${searchWord}&token=f9e111081543a12f2bb5a933bac85765`)
    
  }

  return (
    <div className="App">          
          <form onSubmit={callSearch}>
            <input type="text" value={searchWord} onChange={callApi}/>
            <button>Search News</button>
          </form>
          {<h1>News about {searchWord}</h1>}  
          {news.map( (n,i) =>(
            <div key={i}>              
              <a href={n.url}>
                <h3>{n.title}</h3>
                <img src={n.image} alt={n.description} width={500} height={300}/>
              </a>
              
            </div>
          ))
          }
    </div>
  );
}

export default App;

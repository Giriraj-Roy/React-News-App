import  React, { useEffect, useState } from 'react';
//import 'semantic-ui-react';
//import 'semantic-ui-css';


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
            {/* <input type="text" value={searchWord} onChange={callApi}/> */}
            <div className="ui focus input">
              <input type="text" placeholder="Search..." value={searchWord} onChange={callApi}/>
                {/* <i aria-hidden="true" class="user icon"/> */}
            </div>

            {/* <button>Search News</button> */}
              <button className="ui animated button">
                <div className="visible content">
                  Search News
                </div>
                <div className="hidden content">
                  {/* <i aria-hidden="true" className="arrow right icon"></i>*/}
                  Let's Go
                </div>
              </button>
            
          </form>
          {<h1>News about {searchWord}</h1>}  
          {news.map( (n,i) =>(
            <div key={i}>              
              {/* <a href={n.url}> */}
                {/* <h3>{n.title}</h3> */}
                {/* <img src={n.image} alt={n.description} width={500} height={300}/> */}
                <div className="ui fluid card">
                  <div className="image">
                    <a href={n.url}>
                      <img src={n.image} alt={n.description} width={500}/>
                    </a>
                  </div>
                  <div className="content">
                    <div className="header">
                      {n.source.name}
                    </div>
                    <div className="meta">
                      <span className="date">{n.publishedAt}</span>
                    </div>
                    <div className="description">
                      {n.description}
                    </div>
                  </div>
                  <div className="extra content"><a><i aria-hidden="true" className="user icon"></i>{n.content}</a></div>
                </div>
              {/* </a> */}
              
            </div>
          ))
          }
    </div>
  );
}

export default App;




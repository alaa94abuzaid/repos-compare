import './App.css';
import SearchBar from './components/searchBar'
import { useEffect, useState } from 'react';
import CardsContainer from './components/cardsContainer'

function App() {
  const [urls, setUrls] = useState([])

  const handleRemove = (url) => {
    const index = urls.indexOf(url);
    console.log(index);
    if (index > -1) {
      const x = [...urls]
      x.splice(index, 1)
      console.log('z', x);
      setUrls(x)
    }
  }

  useEffect(() => {
    console.log(urls)
  })

  return (
    <div className="App">
      <SearchBar urls={urls} setUrls={setUrls}/>
      <CardsContainer handleRemove={handleRemove} setUrls={setUrls} urls={urls}/>
    </div>
  );
}

export default App;

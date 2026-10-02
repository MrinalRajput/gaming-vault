import { useState, useEffect } from "react";
import "../css/store.css";
import {Link} from 'react-router-dom'

function Store() {
  const [searchQuery, setSearchQuery] = useState("");
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetches top PC game deals without needing any API Key
    fetch("https://www.cheapshark.com/api/1.0/deals?storeID=1")
      .then((res) => res.json())
      .then((dataDeal) => {
        setGames(dataDeal);
        setLoading(false);
      })
      .catch((err) => console.error("Error fetching games:", err));
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery.trim() === "") {
    //   alert("Please enter a search query.");
        setLoading(true);
        const result = await fetch(`https://www.cheapshark.com/api/1.0/deals?storeID=1`);
        const data = await result.json();
        setGames(data);
    
    }
    else {
    setLoading(true);
    const result = await fetch(`https://www.cheapshark.com/api/1.0/deals?storeID=1&title=${searchQuery}`);
    const data = await result.json();
    if (data.length === 0) {
    //   alert("No results found for your search.");
      console.log(data);
    }
    setGames(data);
    }
    setLoading(false);
  }

  return (
    <div className="storeBox">
      <h2>Top PC Game Deals</h2>
      <form action="submit" onSubmit={handleSearch}>
        <input type="text" name="search" id="searchbox" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
        <button type="submit">Search</button>
      </form>

      {loading ? (
        <li style={{color: 'white', padding: '120px'}}>Loading...</li>
      ) : (
        <>
          {games.length === 0 ? (
              <li style={{padding:'120px'}}>No results found for your search</li>
              
            ) : (
                <ul>
        {games.map((game) => (
            <li key={game.dealID}>
            <img src={game.thumb} alt={game.title} />
            <h3><Link to={`/game?id=${game.gameID}`}>{game.title}</Link></h3>
            {/* <p>Sale Price: ${game.salePrice} <strike>${game.normalPrice}</strike></p>
            <p>Release Date: {new Date(game.releaseDate*1000).toLocaleDateString()}</p>
            <p>Rating: {game.steamRatingText}</p> */}

            <table>
                <tbody>

              <tr>
                <td>Sale Price:</td>
                <td>
                  ${game.salePrice} <strike>${game.normalPrice}</strike>
                </td>
              </tr>
              <tr>
                <td>Release Date:</td>
                <td>
                  {new Date(game.releaseDate * 1000).toLocaleDateString()}
                </td>
              </tr>
              <tr>
                <td>Rating:</td>
                <td>{game.steamRatingText}</td>
              </tr>
                </tbody>
            </table>
          </li>
        ))}
      </ul>
        )}
    </>
    )}
    </div>
  );
}

export default Store;

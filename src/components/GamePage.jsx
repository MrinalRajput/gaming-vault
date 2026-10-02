import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import "../css/gamepage.css";
import { useState } from "react";

function GamePage() {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [gameData, setGameData] = useState(null);

  useEffect(() => {
    const fetchGameData = async () => {
      const gameId = searchParams.get("id");
      const res = await fetch(
        `https://www.cheapshark.com/api/1.0/games?id=${gameId}`,
      );
      const data = await res.json();
      const response = await fetch(
        `https://www.cheapshark.com/api/1.0/deals?id=${data['deals'][0]['dealID']}`,
      );
      const dealData = await response.json();
      // let r = JSON.parse(data)
      console.log(dealData);
      setGameData(dealData);
      setLoading(false);
    };
    fetchGameData();
  }, [searchParams]);

  return (
    <>
      <div
        style={{
          color: "white",          
          textAlign: "center",
          fontFamily: "sans-serif",
          padding: "50px",
        }}
      >
        <h1>Game Page</h1>
        <p>Game ID: {searchParams.get("id")}</p>
        {loading ? (
          <>
          <p className="loader"></p>
          <p style={{margin:"0 auto"}}>Loading...</p>
          </>
        ) : (
          <>
            <br />
            <br />
            <img style={{ maxWidth: "20%", height: "auto" }}src={gameData?.gameInfo?.thumb} alt="hi" />
            <br />
            <h2>{gameData?.gameInfo?.name}</h2>
            <table style={{ margin: "0 auto", color: "white" }}>
                <tbody>
                        <tr>
                <td>Price:</td>
                <td>
                  ${gameData?.gameInfo?.salePrice}
                </td>
              </tr>
              <tr>
                <td>Critic Score:</td>
                <td>
                  {gameData?.gameInfo?.metacriticScore}/100
                </td>
              </tr>
              <tr>
                <td>Rating:</td>
                <td>{gameData?.gameInfo?.steamRatingText}</td>
              </tr>
                <tr>
                <td>Release Date:</td>
                <td>
                    {new Date(gameData?.gameInfo?.releaseDate).toLocaleDateString()}
                </td>
                </tr>
            </tbody>
            </table>
          </>
        )}
      </div>
    </>
  );
}

export default GamePage;

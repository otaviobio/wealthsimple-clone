import { IonIcon } from "@ionic/react";
import { arrowDownOutline, arrowUpOutline } from "ionicons/icons";
import { LineChart } from "../../atoms/LineChart/LineChart";
import "./StockCard.scss";
import { useEffect, useState } from "react";

export function StockCard(props) {
  const { coinId, iconUrl, coinName, coinSymbol, coinChange } = props;

  const [chart, setChart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const baseUrl = `https://api.coinranking.com/v2/coin/${coinId}/history?timePeriod=24h`;
  // const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const apiKey = process.env.REACT_APP_COINRANK_API_KEY;

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await fetch(`${baseUrl}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": apiKey,
            "Access-Control-Allow-Origin": "*",
          },
        });

        if (response.ok) {
          const json = await response.json();
          setChart(json.data);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      } finally {
        setIsLoading(false); // Always set isLoading to false after fetching (success or error)
      }
    };

    fetchCoins();
  }, [coinId]);

  const stockLabels = chart?.history?.map((coin) => {
    let date = new Date(coin.timestamp * 1000);
    return date.toLocaleDateString("en-CA", { day: "2-digit", month: "short" });
  });

  const stockPrices = chart?.history?.map((coin) => coin.price);

  return (
    <div className="discover-card-container">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="discover-card-img">
            <img src={iconUrl} alt="coin symbol" />
          </div>
          <div className="discover-card-chart">
            {coinId && (
              <LineChart
                coinId={coinId}
                lineColor={coinChange >= 0 ? "#228B22" : "#F21C23"}
                labels={stockLabels}
                prices={stockPrices}
              />
            )}
          </div>
          <div className="discover-card-footer">
            <div className="discover-card-coin-info">
              <h4>{coinSymbol}</h4>
              <div
                className={
                  coinChange >= 0
                    ? "discover-card-variation positive"
                    : "discover-card-variation negative"
                }
              >
                <IonIcon
                  icon={coinChange >= 0 ? arrowUpOutline : arrowDownOutline}
                />
                <span>{coinChange}%</span>
              </div>
            </div>
            <p>{coinName}</p>
          </div>
        </>
      )}
    </div>
  );
}

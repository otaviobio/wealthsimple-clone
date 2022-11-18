import { IonIcon } from '@ionic/react';
import { arrowDownOutline, arrowUpOutline } from 'ionicons/icons';
import { LineChart } from '../../atoms/LineChart/LineChart';
import './StockCard.scss';

export function StockCard(props) {
  const {
    coinId,
    iconUrl,
    coinName,
    coinSymbol,
    coinChange,
  } = props;
  return(
    <div className="discover-card-container">
      <div className="discover-card-img">
        <img src={iconUrl} alt="coin symbol" />
      </div>
      <div className="discover-card-chart">
        <LineChart coinId={coinId} lineColor={coinChange >= 0 ? "#228B22" : "#F21C23"}/>
      </div>
      <div className="discover-card-footer">
        <div className="discover-card-coin-info">
          <h4>{coinSymbol}</h4>
          <div className={coinChange >= 0 ? "discover-card-variation positive" : "discover-card-variation negative"}>
            <IonIcon icon={coinChange >= 0 ? arrowUpOutline : arrowDownOutline} />
            <span>{coinChange}%</span>
          </div>
        </div>
        <p>{coinName}</p>
      </div>
    </div>
  )
}
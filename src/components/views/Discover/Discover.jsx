import { IonContent, IonPage } from "@ionic/react";
import { StockCard } from "../../molecules/StockCard/StockCard";
import "./Discover.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Button } from "../../atoms/Button/Button";
import { arrowForwardOutline } from "ionicons/icons";

const coinsData = [
  {
    coinCategory: "Stablecoins",
    coins: [
      {
        UUID: "HIVsRcGKkPFtW",
        iconUrl: "https://cdn.coinranking.com/mgHqwlCLj/usdt.svg?size=30x30",
        name: "Tether USD",
        symbol: "USDT",
        change: 0.09,
      },
      {
        UUID: "aKzUVe4Hh_CON",
        iconUrl: "https://cdn.coinranking.com/jkDf8sQbY/usdc.svg?size=30x30",
        name: "USDC",
        symbol: "USDC",
        change: -1.48,
      },
      {
        UUID: "vSo2fu9iE1s0Y",
        iconUrl: "https://cdn.coinranking.com/6SJHRfClq/busd.svg?size=34x34",
        name: "Binance USD",
        symbol: "BUSD",
        change: 0.11,
      },
      {
        UUID: "MoTuySvg7",
        iconUrl:
          "https://cdn.coinranking.com/mAZ_7LwOE/mutli-collateral-dai.svg?size=34x34",
        name: "DAI",
        symbol: "DAI",
        change: 0.07,
      },
    ],
  },
  {
    coinCategory: "Defi",
    coins: [
      {
        UUID: "_H5FVG9iW",
        iconUrl:
          "https://cdn.coinranking.com/1heSvUgtl/uniswap-v2.svg?size=48x48",
        name: "Uniswap",
        symbol: "UNI",
        change: 1.48,
      },
      {
        UUID: "ncYFcP709",
        iconUrl:
          "https://cdn.coinranking.com/aRtgdw7bQ/pancakeswap-cake-logo.png?size=30x30",
        name: "PancakeSwap",
        symbol: "CAKE",
        change: 1.62,
      },
      {
        UUID: "AaQUAs2Mc",
        iconUrl: "https://cdn.coinranking.com/F-PJdF8Um/LUNA.svg?size=30x30",
        name: "Terra Classic",
        symbol: "LUNC",
        change: -0.35,
      },
      {
        UUID: "ixgUfzmLR",
        iconUrl: "https://cdn.coinranking.com/4bpYKqV4X/AAVE.png?size=30x30",
        name: "Aave",
        symbol: "AAVE",
        change: -1.39,
      },
    ],
  },
  {
    coinCategory: "Metaverse",
    coins: [
      {
        UUID: "tEf7-dnwV3BXS",
        iconUrl:
          "https://cdn.coinranking.com/ph_svUzXs/decentraland(1).svg?size=30x30",
        name: "Decentraland",
        symbol: "MANA",
        change: 1.42,
      },
      {
        UUID: "pxtKbG5rg",
        iconUrl: "https://cdn.coinranking.com/kd_vwOcnI/sandbox.png?size=30x30",
        name: "The Sandbox",
        symbol: "SAND",
        change: -1.44,
      },
      {
        UUID: "gpRKmM16k",
        iconUrl:
          "https://cdn.coinranking.com/L3gWtlUJB/axie-infinity.png?size=30x30",
        name: "Axie Infinity",
        symbol: "AXS",
        change: -1.35,
      },
      {
        UUID: "WvoRtQhzN",
        iconUrl: "https://cdn.coinranking.com/9Y0K-WWMt/8719.png?size=30x30",
        name: "Illuvium",
        symbol: "ILV",
        change: 5.68,
      },
    ],
  },
];

const Discover = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        {coinsData.map((coinData, idx) => {
          return (
            <div className="discover-category-container" key={idx}>
              <h4>{coinData.coinCategory}</h4>
              <div className="carousel-swiper-container discover">
                <Swiper spaceBetween={10} slidesPerView={2.2}>
                  {coinData.coins.map((coin, idx) => {
                    return (
                      <SwiperSlide key={`slide_${idx}`}>
                        <StockCard
                          key={idx}
                          coinId={coin.UUID}
                          iconUrl={coin.iconUrl}
                          coinName={coin.name}
                          coinSymbol={coin.symbol}
                          coinChange={coin.change}
                        />
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
              <div className="discover-category-container-footer">
                <Button
                  btnText={`See all ${coinData.coinCategory}`}
                  hasIcon={true}
                  iconName={arrowForwardOutline}
                />
              </div>
            </div>
          );
        })}
      </IonContent>
    </IonPage>
  );
};

export default Discover;

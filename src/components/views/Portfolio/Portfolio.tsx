// @ts-nocheck
import './Portfolio.scss';
import { IonContent, IonPage } from '@ionic/react';
import { DoughnutChart } from '../../atoms/DoughnutChart/DoughnutChart';
import { Button } from '../../atoms/Button/Button';
import { addOutline, arrowForwardOutline } from 'ionicons/icons';
import giftBox from '../../../assets/images/gift-box-pink.png';
import goldStar from "../../../assets/images/star.png";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from "swiper";
import 'swiper/css';
import "swiper/css/pagination";
import { ListLink } from '../../atoms/ListLink/ListLink';
import { useContext, useEffect, useState } from 'react';
import { AccountsContext } from '../../../pages/AppPage';

const Portfolio: React.FC = () => {
  const [ready, setReady] = useState(false);
  const {accountDetails} = useContext(AccountsContext)
  console.log(accountDetails)

  const portfolioValues = accountDetails.map((account) => account.accountTotal)
  const portfolioTotal = portfolioValues.reduce((previousValue, currentValue) => previousValue + currentValue, 0)

  useEffect(() => {
    setTimeout(() => {
      setReady(true);
    }, 100);
  }, [])
  

  const data = [
		{
			title: "Build your watchlist",
			subtitle: "Track the daily performance of stocks you're interested in by adding them to your watchlist.",
      buttonText: "Find a stock",
      iconName: arrowForwardOutline,
      paginationText: "Watchlist",

		},
		{
			title: "Create price alerts",
			subtitle: "Receive a one-time notification on price changes for stocks you choose.",
      buttonText: "Set your alerts",
      iconName: arrowForwardOutline,
      paginationText: "Price alerts",
		},
	];

  const moreData = [
		{
			title: "Earn free cash to trade!",
			subtitle: "Help a friend get started with investing and earn up to $3,000.",
      buttonText: "Refer friends",
      iconName: arrowForwardOutline,
			image: giftBox,
      imageDescription: "Pink gift box"
		},
		{
			title: "Introducing Plus",
			subtitle: "Upgrade and stop paying exchange fees when you trade U.S. stocks!",
      buttonText: "Save on USD trades",
      iconName: arrowForwardOutline,
			image: goldStar,
      imageDescription: "Gold star"
		},
	];

  const pagination = {
    clickable: true,
    renderBullet: function (index: number, className: string) {
      return `<span class=${className}>${data[index].paginationText}</span>`;
    }
  };

  return (
    <IonPage>
      <IonContent>
        <section className='container'>
          <div className="portfolio-header">
            <h2>Your Portfolio</h2>
            <span>${portfolioTotal}</span>
            {ready ? <DoughnutChart test="testing" chartValues={portfolioValues}/> : null}
          </div>

          <div className="carousel-swiper-container">
            <Swiper
              pagination={pagination}
              modules={[Pagination]}
              className="mySwiper"
              spaceBetween={ 10 }
              slidesPerView={ 1.2 }
            >
              { data.map((card, index) => {
                return (
                  <SwiperSlide key={ `slide_${ index }` }>
                    <div className="client-hub-card">
                      <div>
                        <h4 className="client-hub-card-title">{card.title}</h4>
                        <p className="client-hub-card-subtitle">{card.subtitle}</p>
                        <Button
                          btnText={card.buttonText}
                          hasIcon={true}
                          iconName={card.iconName}
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                )
              })}
            </Swiper>
          </div>

          <div className="accounts-container">
            <h4>My accounts</h4>
            <div className="account-types">
              {accountDetails.map((account, idx) => {
                return (
                  <ListLink
                    key={idx}
                    isAccountLink={true}
                    linkText={account.accountName}
                    linkSubText={account.accountName}
                    accountTotal={account.accountTotal}
                  />
                )
              })}
            </div>
            <Button
              btnText="Add an account"
              hasIcon
              hasBorder
              iconName={addOutline}
            />
          </div>
          
          <div className="carousel-swiper-container">
            <h4>More</h4>
            <Swiper spaceBetween={ 10 } slidesPerView={ 1.2 }>
              { moreData.map((card, index) => {
                return (
                  <SwiperSlide key={ `slide_${ index }` }>
                    <div className="client-hub-card with-icon">
                      <div>
                        <h4 className="client-hub-card-title">{card.title}</h4>
                        <p className="client-hub-card-subtitle">{card.subtitle}</p>
                        <Button
                          btnText={card.buttonText}
                          hasIcon={true}
                          iconName={card.iconName}
                        />
                      </div>
                      <div className="client-hub-card-image">
                        <img src={card.image} alt={card.imageDescription} />
                      </div>
                    </div>
                  </SwiperSlide>
                )
              })}
            </Swiper>
          </div>
        </section>
      </IonContent>
    </IonPage>
  );
};

export default Portfolio;



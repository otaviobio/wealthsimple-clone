import { IonContent, IonPage, } from '@ionic/react';
import { LineChart } from '../../atoms/LineChart/LineChart';
import { DoughnutChart } from '../../atoms/DoughnutChart/DoughnutChart';
import { BarChart } from '../../atoms/BarChart/BarChart';

const Activity: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
      <LineChart coinId="Qwsogvtv82FCd"/>
      <BarChart />
      <DoughnutChart />
      </IonContent>
    </IonPage>
  );
};

export default Activity;

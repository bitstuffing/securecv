import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFooter, IonRouterOutlet } from '@ionic/react';
import { Route, RouteComponentProps } from 'react-router';
import DecryptorContainer from '../components/DecryptorContainer';
import './Welcome.css';

const Welcome: React.FC<RouteComponentProps> = ({ match }) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar class="centered">
          <IonTitle ><a href="https://github.com/bitstuffing/securecv">SecureCV 3.0</a></IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen class="justified">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">SecureCV 3.0</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonRouterOutlet>
          <Route exact path={match.url} component={DecryptorContainer} />
          <Route path={`${match.url}/:p`} component={DecryptorContainer} />
        </IonRouterOutlet>
      </IonContent>
      <IonFooter class="centered">
        <p>Powered by <strong><a href="https://github.com/bitstuffing">@bitstuffing</a></strong> with love</p>
      </IonFooter>
    </IonPage>
  );
};

export default Welcome;

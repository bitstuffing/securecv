import './DecryptorContainer.css';

import React, { useState, useEffect }  from 'react';
import { IonLoading, IonContent } from '@ionic/react';
import { useIonAlert , useIonViewWillEnter, useIonViewDidEnter, useIonViewWillLeave } from '@ionic/react';

import * as $ from "jquery";
import { logger } from 'workbox-core/_private';
import { RouteComponentProps } from 'react-router';

import { Buffer } from 'buffer'

var AES = require("crypto-js/aes");
var CryptoJS = require("crypto-js");

interface ContainerProps extends RouteComponentProps<{
  p: string;
}> {}

const DecryptorContainer: React.FC<ContainerProps> = ({ match }) => {

  const [presentAlert] = useIonAlert();
  
  const [showLoading, setShowLoading] = useState(false);
  let isWorking = false;
  const [showAlert, setShowAlert] = useState(false);
  const [unencryptedContent, setUnencryptedContent] = useState('Always share your personal information in a secure way');
  const [dialogHeader, setDialogHeader] = useState('Password required!');

  //RouteComponentProps issues from rect-router, so needs a callback from useEffect
  useEffect(() => {
    if(!isWorking){
      let password = "";
      if (match.params.p){
        password = match.params.p;
      }
      if(password.length<=0){
        let url = window.location.href;
        if(url.includes("=")){
          password = window.location.href.split("=")[1];
          password = decodeURIComponent(password);
        }
      }
      if (password.length>0){
        isWorking = true;
        password = Buffer.from(password,'base64').toString('utf-8');
        unEncrypt(password);
      }else{
        setShowLoading(true);
      }
    }
  }, []);

  // when you activate RouteComponentProps for some unknown reason this event function doesn't work
  useIonViewDidEnter(() => {
    setShowLoading(true);
  });

  return (
    <IonContent>
      <div id="mainContainer" className="pre-container">
        <div id="childMainContainer">{unencryptedContent}</div>
      </div>
      <IonLoading
        cssClass="loading"
        isOpen={showLoading}
        onDidDismiss={
          () => {
            
            setShowLoading(false);
            
            var a = presentAlert({
              header: 'SecureCV 3.0',
              subHeader: dialogHeader,
              //dismiss
              backdropDismiss : false,
              onWillDismiss : () => {
                //logger.debug(a);
              },
              onDidDismiss : () => {
                //setShowLoading(false);
              },
              inputs: [
                { placeholder : "Please enter the secret password", type: "password", name: "password"}
              ],
              
              buttons: [
                { 
                  text : 'Decode',
                  handler: (alertData) => {
                    setShowAlert(false);
                    setShowLoading(false);
                    setUnencryptedContent(alertData.password);
                    unEncrypt(alertData.password);
                    return true;
                  }
                }
              ]
            });
          }
        }
        message={'Please wait...'}
        duration={500}
      />
    </IonContent>
  );

function unEncrypt(password: string, alertWrongPassword = true){
  $.get("/securecv/cv.enc",function(data){
    var temp = document.createElement("div");
    temp.setAttribute("id","app-container");
    try{ //unencrypt part
      var decryptedBytes = AES.decrypt(data, password);
      data = decryptedBytes.toString(CryptoJS.enc.Utf8);
      if(data.length>0){
        temp.innerHTML = data;
        document.getElementById("childMainContainer")?.replaceWith(temp);
        document.getElementById('mainContainer')?.setAttribute("class","");
      }else{
        if(alertWrongPassword){
          setDialogHeader("Wrong password, try again");
        }
        setShowLoading(true);
      }
    }catch(err){
      if(alertWrongPassword){
        setDialogHeader("Wrong password, try again");
      }
      setShowLoading(true);
    }
    isWorking = false;
  });
}

};

export default DecryptorContainer;

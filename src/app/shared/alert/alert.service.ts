import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private alertController: AlertController) { }

  async retryCancelAlert(message: string, onRetry:() => void, onCancel: () => void){
    const alert = await this.alertController.create({
      message,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            onCancel();
          }
        },
        {
          text: 'Retry',
          handler: () => {
            onRetry();
          }
        }
      ]
    });

    await alert.present()
  }
}

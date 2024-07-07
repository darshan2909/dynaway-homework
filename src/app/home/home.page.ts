import { Component } from '@angular/core'
import { Asset } from '../shared/models/asset.model'
import { AssetService } from '../shared/services/asset.service'
import { AlertService } from '../shared/alert/alert.service'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  assets: Asset[] = []

  constructor(private assetService: AssetService,
    private alertService: AlertService  ) {}

  ionViewWillEnter(): void {
    this.assets = []
    this.assetService.getAll()
    .subscribe((assets:any) => {
      this.assets = assets.data
    },
    error => {
      console.log('Error fetching assets', error);
      this.showAlert(error.message)
    })
  }

  async showAlert(errorMsg:any){
    // created common alert service for displaying error message with Cancel and Retry actions
    await this.alertService.retryCancelAlert(   
      errorMsg,
      this.retryAction.bind(this),
      this.cancelAction.bind(this)
    )
  }

  retryAction(){
    this.ionViewWillEnter()  //calling method to get asset data.
  }

  cancelAction(){
    console.log('Cancel Action')  
  }
}

import { Component, OnInit } from '@angular/core';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import { ActionSheetController, mdTransitionAnimation } from '@ionic/angular';
import { Router,ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-tab6',
  templateUrl: './tab6.page.html',
  styleUrls: ['./tab6.page.scss'],
})
export class Tab6Page implements OnInit {
  columns = [{ prop: 'Device' }, { name: 'Owner' }, { name: 'Company' }];
  arrayteste = [{
    devicename:'device1',
    ownername:'heitor',
    
  },
  {
    devicename:'device2',
    ownername:'heitor',
  },
  {
    devicename:'device3',
    ownername:'heitor',
  }
];
  constructor(public actionSheetController:ActionSheetController, public router:Router, public activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Device',
      cssClass: 'my-custom-class',
      animated:true,
      mode:'md',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          console.log('Delete clicked');
        }
      }, {
        text: 'Edit',
        icon: 'create',
        handler: () => {
          console.log('Favorite clicked');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  goToVideoCall(){
    this.router.navigate(['tab5']);
  }
}

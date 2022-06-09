import { UserInterface } from './../users/interfaces/user.model';
import { UserService } from './../users/services/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.page.html',
  styleUrls: ['./user-detail.page.scss'],
})
export class UserDetailPage implements OnInit {
  dataUser: UserInterface;
  constructor(
    private readonly userSvc: UserService,
    private readonly router: Router,
    private readonly activedRoute: ActivatedRoute,
    private readonly actionSheetController: ActionSheetController,
    private readonly alertController: AlertController
  ) {}

  ngOnInit() {
    this.activedRoute.paramMap.subscribe((params) => {
      if (!params.get('id')) {
        return this.router.navigate(['/users']);
      }
      const id = params.get('id');
      const idString = parseInt(id, 10);
      this.userSvc.getOne(idString).subscribe((res) => {
        this.dataUser = res;
      });
    });
  }

  async userActions(): Promise<void> {
    const actionSheet = await this.actionSheetController.create({
      header: 'Actions',
      buttons: [
        {
          text: 'Update',
          role: 'destructive',
          icon: 'create',
          handler: () => {
            this.updateUser();
          },
        },
        {
          text: 'Delete',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.optionDeleteUser();
          },
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
        },
      ],
    });
    await actionSheet.present();
  }

  private updateUser(): void {}
  private async optionDeleteUser(): Promise<void> {
    const alert = await this.alertController.create({
      header: `Delete ${this.dataUser.name}`,
      subHeader: 'This action cannot be undone',
      message: 'Are you sure you want to delete this user?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Okay',
          handler: () => {
            this.actionDeleteUser();
          },
        },
      ],
    });
    await alert.present();
  }
  private actionDeleteUser(): void {
    this.userSvc.deleteOne(this.dataUser.id).subscribe(
      (data) => {
        if (data.status === 200) {
          this.router.navigate(['/users']);
        }
      },
      (error) => {
      }
    );
  }
}

/*
const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Prompt!',
      inputs: [
        {
          name: 'name1',
          type: 'text',
          placeholder: 'Placeholder 1'
        },
        {
          name: 'name2',
          type: 'text',
          id: 'name2-id',
          value: 'hello',
          placeholder: 'Placeholder 2'
        },
        // multiline input.
        {
          name: 'paragraph',
          id: 'paragraph',
          type: 'textarea',
          placeholder: 'Placeholder 3'
        },
        {
          name: 'name3',
          value: 'http://ionicframework.com',
          type: 'url',
          placeholder: 'Favorite site ever'
        },
        // input date with min & max
        {
          name: 'name4',
          type: 'date',
          min: '2017-03-01',
          max: '2018-01-12'
        },
        // input date without min nor max
        {
          name: 'name5',
          type: 'date'
        },
        {
          name: 'name6',
          type: 'number',
          min: -5,
          max: 10
        },
        {
          name: 'name7',
          type: 'number'
        },
        {
          name: 'name8',
          type: 'password',
          placeholder: 'Advanced Attributes',
          cssClass: 'specialClass',
          attributes: {
            maxlength: 4,
            inputmode: 'decimal'
          }
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
*/

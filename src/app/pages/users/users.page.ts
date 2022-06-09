import { AlertController } from '@ionic/angular';
import { UserInterface } from './interfaces/user.model';
import { UserService } from './services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  dataUsers: UserInterface[] = [];
  constructor(
    private readonly userSvc: UserService,
    private readonly alertController: AlertController,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.refreshData();
  }

  public async btnDeleteUser(user: UserInterface): Promise<void> {
    const alert = await this.alertController.create({
      header: `Delete ${user.name}`,
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
            this.actionDeleteUser(user.id);
          },
        },
      ],
    });
    await alert.present();
  }

  public actionDeleteUser(id: number): void {
    this.userSvc.deleteOne(id).subscribe(
      (data) => {
        if (data.status === 200) {
          this.refreshData();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  public btnShowUser(id: number): void {
    this.router.navigate(['/user-detail', id]);
  }

  private refreshData(): void {
    this.userSvc.getAll().subscribe(
      (data) => {
        this.dataUsers = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}

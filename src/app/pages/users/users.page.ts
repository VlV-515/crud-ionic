import { UserInterface } from './interfaces/user.model';
import { UserService } from './services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  dataUsers: UserInterface[] = [];
  constructor(private readonly userSvc: UserService) {}

  ngOnInit() {
    this.refreshData();
  }

  public btnGetOne(id: number): void {
    this.userSvc.getOne(id).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public btnDelete(id: number): void {
    this.userSvc.deleteOne(id).subscribe(
      (data) => {
        if (data.status === 200) {
          alert('Usuario eliminado');
          this.refreshData();
        }
      },
      (error) => {}
    );
  }

  private refreshData(): void {
    this.userSvc.getAll().subscribe(
      (data) => {
        this.dataUsers = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}

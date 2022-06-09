import { UserService } from './../users/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserInterface } from '../users/interfaces/user.model';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.page.html',
  styleUrls: ['./form-user.page.scss'],
})
export class FormUserPage implements OnInit {
  dataUser: UserInterface;
  isNewUser: boolean;
  formUser: FormGroup;
  constructor(
    private readonly userSvc: UserService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      if (!params.get('id')) {
        return this.router.navigate(['/users']);
      }
      const id = params.get('id');
      if (id === 'new') {
        return this.newForm();
      }
      return this.editForm(Number(id));
    });
  }

  public newForm() {
    this.isNewUser = true;
    this.formUser = this.generateNewForm();
  }
  public editForm(id: number) {
    this.isNewUser = false;
    this.userSvc.getOne(id).subscribe((res) => {
      this.dataUser = res;
      this.formUser = this.genetareFormUpdate(res);
    });
  }
  public onSubmit(): void {
    if (this.isNewUser) {
      this.userSvc.addOne(this.formUser.value).subscribe((res) => {
        this.router.navigate(['/users']);
      });
    } else {
      this.userSvc.updateOne(this.formUser.value).subscribe((res) => {
        this.router.navigate(['/users']);
      });
    }
  }

  private generateNewForm(): FormGroup {
    return this.fb.group({
      id: [''],
      name: [''],
      username: [''],
      password: [''],
      role: [''],
      avatar: [''],
    });
  }
  private genetareFormUpdate(user: UserInterface): FormGroup {
    return this.fb.group({
      id: [user.id],
      name: [user.name],
      username: [user.username],
      password: [user.password],
      role: [user.role],
      avatar: [user.avatar],
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../client.service';
import { UsersComponent } from '../users/users.component';


@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css'],
  providers: [UsersComponent]
})
export class SubjectsComponent implements OnInit {
  user: any = null
  subjects = []

  constructor(
    private activatedRoute: ActivatedRoute,
    private client: ClientService,
    public usersComponent: UsersComponent,
    private router: Router
  ) { }

  ngOnInit(): void {
    let id = parseInt(this.activatedRoute.snapshot.params["userID"])
    this.usersComponent.loadUsers()
    this.user = this.usersComponent.users.filter((user: any)=> user.id===id)[0]
    this.user.allSubjects = JSON.parse(this.user.subjects)
    this.user.trueSubjects = this.user.allSubjects.filter((subject: any) => subject[1] === true)
    this.user.trueSubjectsCount = this.user.trueSubjects.length
    this.subjects = this.user.allSubjects
  }

  save() {
    this.client.put(`users/update/${this.user.id}`, {
      id: this.user.id,
      name: this.user.name,
      email: this.user.email,
      phone: this.user.phone,
      subjects: JSON.stringify(this.subjects)
    }).subscribe(
      data => {
        console.log(data);
      }
    )
    this.router.navigateByUrl("/users")
  }

  changed(subject: any) {
    this.subjects.filter((sub: any) => sub[0] === subject[0]).forEach((sub: any)=> {
      sub[1] = !sub[1]
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  public users: [] | any = [
    {id:1, name: "Mike", email: "m@m.com", phone: "+26371263", subjects: '[["html",true],["css",false],["js",false]]'},
    {id:2, name: "Mitch", email: "m@m.com", phone: "+26371263", subjects: '[["html",true],["css",false],["js",false]]'},
    {id:3, name: "Marietah", email: "m@m.com", phone: "+26371263", subjects: '[["html",true],["css",false],["js",false]]'},
    {id:4, name: "Mitchell", email: "m@m.com", phone: "+26371263", subjects: '[["html",true],["css",false],["js",false]]'}
  ]
  subjectsOffered = ["JavaScript", "C#", "TypeScript", "Go Lang", "Python"]
  selectedSubjects: any
  displayUsers: [] | any
  selectedUser = { id: 1, name: "Mike", email: "m@m.com", phone: "+26371263", subjects: 6 }
  searchUsername = ""
  showOverlay = false
  adding = true
  showUsers = true

  //  User attributes
  id = 0
  name = ""
  email = ""
  phone = ""
  subjects = ''

  constructor(
    private client: ClientService
  ) { }

  ngOnInit(): void {
    this.loadUsers()
  }

  loadUsers() {
    this.client.get("users").subscribe(
      users => {
        this.users = users
        this.users.forEach((user: any) => {
          user.allSubjects = JSON.parse(user.subjects)
          user.trueSubjects = user.allSubjects.filter((subject: any) => subject[1] === true)
          user.trueSubjectsCount = user.trueSubjects.length
        });
        this.displayUsers = this.users
      }
    )
  }

  toggleOverlay() {
    this.showOverlay = !this.showOverlay
  }
  selectUser(user: any) {
    // set form
    this.name = user.name
    this.email = user.email
    this.phone = user.phone
    this.subjects = user.subjects
    this.id = user.id
    this.adding = false
    this.showOverlay = true
  }

  addUser() {
    this.name = ""
    this.email = ""
    this.phone = ""
    this.selectedSubjects = []
    this.adding = true
    this.showOverlay = true
  }

  submitAddUser() {
    let subs = <any>[]
    this.selectedSubjects.forEach((sub: any) => { subs.push([sub, false]) })
    console.log(subs);
    this.client.post(`users/add`, {
      name: this.name,
      email: this.email,
      phone: this.phone,
      subjects: JSON.stringify(subs)
    }).subscribe(
      data => {
        console.log(data);
      }
    )
    this.loadUsers()
  }

  submitUpdateUser() {
    this.client.put(`users/update/${this.id}`, {
      id: this.id,
      name: this.name,
      email: this.email,
      phone: this.phone
    }).subscribe(
      data => {
        console.log(data);
      }
    )
    this.loadUsers()
  }

  deleteUser(user: any) {
    if (confirm(`Are you sure you want to delete ${user.name} with id: ${user.id}?`)) {
      this.client.delete(`users/delete/${user.id}`).subscribe(
        data => console.log(data)
      )
      this.loadUsers()
    }
  }

  filter() {
    if (!this.users) return
    else if (!this.searchUsername) {
      this.displayUsers = this.users
    } else {
      this.displayUsers = this.users.filter(
        (user : any) => user.name.toLowerCase().indexOf(this.searchUsername.toLowerCase()) !== -1
      )
    }
  }

}

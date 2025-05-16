import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
    standalone: false
})
export class UsersComponent implements OnInit {

  dataSource: MatTableDataSource<any>;

  users: User[] = [];

  columns: string[] = ['sno','firstName', 'lastName', 'email', 'phone','action']

  @ViewChild(MatSort, { static: true}) sort: MatSort;
  @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      (res: any) =>{
        this.users = res;
        // this.users = [...this.users, ...this.users, ...this.users, ...this.users, ...this.users, ...this.users, ...this.users, ...this.users, ...this.users, ...this.users, ...this.users, ...this.users, ...this.users, ...this.users, ...this.users, ...this.users, ...this.users, ...this.users, ...this.users, ...this.users, ...this.users, ...this.users, ...this.users, ...this.users, ...this.users, ...this.users, ...this.users, ...this.users, ]
        this.dataSource = new MatTableDataSource(this.users);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.log(error)
      }
      )
  }

  applyFilter(event: any){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteUser(data: any){
    this.userService.deleteUser(data.id).subscribe(
      (res: any) => {
        if(res){
          let idxToDelete = this.users.findIndex(u => u.id === data.id);
          this.users.splice(idxToDelete, 1);
          this.dataSource._updateChangeSubscription();

          // this._snackBar.open(`User removed successfully`,'',{
          //   duration: 3000
          // });
          // this.freshForm();
        }
      },
      (error) => {
        console.log(error)
      }
    )
  }

  

}

import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenreService } from 'src/app/services/genre.service';
import { Genre } from 'src/app/models/genre';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css']
})
export class GenresComponent implements OnInit {

  newGenre: boolean = false;

  addBtnClicked: boolean = false;

  genres: Genre[] = [];

  // displayedColumns: string[] = ['position', 'title', 'weight', 'status'];
  // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  // @ViewChild(MatPaginator) paginator: MatPaginator;

  

  newGenreData: Genre = {
    id: 0,
    title: '',
    description: '',
    enabled: true
  }

  constructor(private _snackBar: MatSnackBar, private genreService: GenreService) { }

  ngOnInit() {
    this.freshForm();
    this.getAllGenres();
    // this.dataSource.paginator = this.paginator;
  }

  getAllGenres(){
    this.genreService.getGenres().subscribe(
      (res: any)=>{
        this.genres = res;
      },
      (error)=>{
        this._snackBar.open('Error while fetching genres list','',{
          duration: 3000
        });
      }
    )
  }

  addGenre(){
    this.freshForm();
    this.newGenre = true;
    this.addBtnClicked = true;
  }

  submitForm(newGenreForm: any){

    if(!this.newGenreData.title){
      this._snackBar.open('Please provide genre title','',{
        duration: 3000
      });
      return;
    }

    if(this.addBtnClicked){
      this.createNewGenre();
    }else{
      this.updateGenre();
    }

    

  }

  editGenre(editableGenre: Genre){
    this.newGenre = true;
    this.addBtnClicked = false;
    this.newGenreData.title = editableGenre.title;
    this.newGenreData.description = editableGenre.description;
    this.newGenreData.id = editableGenre.id;
    this.newGenreData.enabled = editableGenre.enabled;
  }

  createNewGenre(){
    this.genreService.addGenre(this.newGenreData).subscribe(
      (data: any)=>{
        this.genres.push(data);
        this._snackBar.open(`${this.newGenreData.title} is added successfully to list`,'',{
          duration: 3000
        });

        this.freshForm();
        
      },
      (error)=>{
        this._snackBar.open(error,'',{
          duration: 3000
        });
      },
      () =>{
        this.addBtnClicked = false;
      }
    );
  }

  updateGenre(){
    this.genreService.updateGenre(this.newGenreData, this.newGenreData.id).subscribe(
      (data)=>{
        if (data) {
          let idxToUpdate = this.genres.findIndex(g=>g.id === this.newGenreData.id);
          this.genres[idxToUpdate].title = this.newGenreData.title;
          this.genres[idxToUpdate].description = this.newGenreData.description;

          this._snackBar.open('Genre updated successfully', '', {
            duration: 3000
          });
          this.freshForm();
        }
      },
      (error)=>{
        this._snackBar.open(error,'',{
          duration: 3000
        });
      }
    );
  }

  backToGenres(){
    this.freshForm();
  }

  toggleGenreStatus(id: number, idx: number){

    let oldState = this.genres[idx].enabled;
    this.genres[idx].enabled = !oldState;

    this.genreService.toggleGenreState(this.genres[idx], id).subscribe(
      (res)=>{
        if (res) {
          let status = this.genres[idx].enabled ? 'enabled' : 'disabled';
          this._snackBar.open(`Genre ${status} successfully`, '', {
            duration: 3000
          });
        }
      },
      (error)=>{
        this._snackBar.open(error,'',{
          duration: 3000
        });
      }
    )
  }

  freshForm(){
    this.newGenre = false;
    this.addBtnClicked = false;
    this.newGenreData.id = 0
    this.newGenreData.title = '';
    this.newGenreData.description = '';
    this.newGenreData.enabled = true;
  }

  deleteGenre(id: number){
    this.genreService.deleteGenre(id).subscribe(
      (res)=>{
        if (res) {
          let idxToDelete = this.genres.findIndex(g => g.id === id);
          this.genres.splice(idxToDelete, 1);

          this._snackBar.open(`Genre removed successfully`, '', {
            duration: 3000
          });
          this.freshForm();
        }
      },
      (error)=>{
        this._snackBar.open(error,'',{
          duration: 3000
        });
      }
    );
  }

}

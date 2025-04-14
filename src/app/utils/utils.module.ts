import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

//Material Imports
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatStepperModule } from '@angular/material/stepper';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatMenuModule } from '@angular/material/menu';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSidenavModule} from '@angular/material/sidenav';
@NgModule({ declarations: [],
    exports: [
        MatCardModule,
        MatToolbarModule,
        MatIconModule,
        MatListModule,
        MatTableModule,
        MatRadioModule,
        MatPaginatorModule,
        MatMenuModule,
        MatAutocompleteModule,
        MatSelectModule,
        MatChipsModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatSidenavModule,
        MatSortModule,
        MatDialogModule,
        MatCheckboxModule,
        MatButtonToggleModule,
        MatStepperModule,
        MatExpansionModule,
        MatProgressBarModule,
        MatGridListModule
    ], imports: [CommonModule,
        MatCardModule,
        MatToolbarModule,
        MatIconModule,
        MatListModule,
        MatTableModule,
        MatRadioModule,
        MatPaginatorModule,
        MatMenuModule,
        MatAutocompleteModule,
        MatSelectModule,
        MatChipsModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        MatSortModule,
        MatDialogModule,
        MatCheckboxModule,
        MatButtonToggleModule,
        MatStepperModule,
        MatExpansionModule,
        MatProgressBarModule,
        MatGridListModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class UtilsModule { }

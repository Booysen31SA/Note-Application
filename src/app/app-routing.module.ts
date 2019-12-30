import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotesComponent } from './notes/notes.component';
import { NoteDetailComponent } from './note-detail/note-detail.component';
import { RegistrationComponent } from './registration/registration.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { ProfileComponent } from './profile/profile.component';
import { SharedNotesComponent } from './shared-notes/shared-notes.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: NoteDetailComponent },
  { path: 'notes', component: NotesComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'profile', component: ProfileComponent},
  { path: 'share', component: SharedNotesComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

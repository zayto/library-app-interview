import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksOverviewComponent } from './pages/books-overview/books-overview.component';
import { BorrowComponent } from './pages/borrow/borrow.component';
import { HomeComponent } from './pages/home/home.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ReturnComponent } from './pages/return/return.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'books', component: BooksOverviewComponent },
  { path: 'borrow', component: BorrowComponent },
  { path: 'return', component: ReturnComponent },
  { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MyStoriesComponent } from './pages/personal/my-stories/my-stories.component';

const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent, 
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomeComponent,
      }
    ]
  },
  {
    path: 'my-stories',
    component: MyStoriesComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

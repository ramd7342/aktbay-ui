import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MyStoriesComponent } from './pages/personal/my-stories/my-stories.component';
import { TranslateComponent } from './pages/translate/translate.component';
import { TextHighlightComponent } from './pages/text-highlight/text-highlight.component';
import { AnnotateContentComponent } from './pages/annotate-content/annotate-content.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';

const routes: Routes = [
  /*{ 
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
  },*/
  /*{ 
    path: '', 
    component: TranslateComponent, 
    children: [
      {
        path: '',
        redirectTo: 'translate',
        pathMatch: 'full'
      },
      {
        path: 'translate',
        component: TranslateComponent,
      },
    ]
  },*/
  { 
    path: '', 
    component: TextHighlightComponent, 
    children: [
      {
        path: '',
        redirectTo: 'text-highlight',
        pathMatch: 'full'
      },
      {
        path: 'text-highlight',
        component: TextHighlightComponent,
      },
    ]
  },
  {
    path: 'translate',
    component: TranslateComponent
  },
  {
    path: 'landing-page',
    component: LandingPageComponent
  },
  {
    path: 'annotate',
    component: AnnotateContentComponent
  },
  {
    path: 'text-highlight',
    component: TextHighlightComponent
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

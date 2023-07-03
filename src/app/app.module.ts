import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './pages/home/home.component';
import { SummaryPipe } from './pipes/summary.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoryDetailsComponent } from './pages/story-details/story-details.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NavMenuComponent } from './pages/home/nav-menu/nav-menu.component';
import { AktbaySearchComponent } from './pages/home/aktbay-search/aktbay-search.component';
import { CommonModule } from '@angular/common';
import { CreateTagModalComponent } from './pages/home/create-tag-modal/create-tag-modal.component';
import { StoryService } from './services/story-service.service';
import { AktbayTopicsComponent } from './pages/home/aktbay-topics/aktbay-topics.component';
import { Utils } from './utils/Utils';
import { AttachmentModalComponent } from './pages/home/attachment-modal/attachment-modal.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SummaryPipe,
    StoryDetailsComponent,
    NavMenuComponent,
    AktbaySearchComponent,
    CreateTagModalComponent,
    AktbayTopicsComponent,
    AttachmentModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgbModule,
    DragDropModule,
    NgbTooltipModule
  ],
  providers: [StoryService, Utils],
  bootstrap: [AppComponent],
})
export class AppModule { }

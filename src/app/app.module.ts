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
import { CreateTopicModalComponent } from './pages/create-topic-modal/create-topic-modal.component';
import { AktbayTopicsViewComponent } from './pages/home/aktbay-topics-view/aktbay-topics-view.component';
import { CreateImageModalComponent } from './pages/create-image-modal/create-image-modal.component';
import { AppDataService } from './services/app-data.service';
import { MyStoriesComponent } from './pages/personal/my-stories/my-stories.component';
import { PublicStoriesComponent } from './pages/public-stories/public-stories.component';
import { HttpClientModule } from '@angular/common/http';
import { TranslateComponent } from './pages/translate/translate.component';
import { ShowTranslatedComponent } from './pages/translate/show-translated/show-translated.component';
import { SanitizedHtmlPipe } from './pipes/sanitize-html.pipe';
import { TextHighlightComponent } from './pages/text-highlight/text-highlight.component';
import { AnnotateContentComponent } from './pages/annotate-content/annotate-content.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SummaryPipe,
    SanitizedHtmlPipe,
    StoryDetailsComponent,
    NavMenuComponent,
    AktbaySearchComponent,
    CreateTagModalComponent,
    AktbayTopicsComponent,
    AttachmentModalComponent,
    CreateTopicModalComponent,
    AktbayTopicsViewComponent,
    CreateImageModalComponent,
    MyStoriesComponent,
    PublicStoriesComponent,
    TranslateComponent,
    TextHighlightComponent,
    ShowTranslatedComponent,
    AnnotateContentComponent,
    LandingPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgbModule,
    DragDropModule,
    NgbTooltipModule,
    HttpClientModule,
  ],
  exports: [SummaryPipe, SanitizedHtmlPipe],
  entryComponents: [CreateTagModalComponent, AttachmentModalComponent, CreateTopicModalComponent],
  providers: [StoryService, Utils, AppDataService],
  bootstrap: [AppComponent],
})
export class AppModule { }

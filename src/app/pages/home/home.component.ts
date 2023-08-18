import { Component, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DPR_ITEMS, MONETIZATION_ITEMS, OUTPUT_TEMPLATE_ITEMS, PERMISSION_ITEMS, SAMPLE_DESCRIPTION, TAGS } from '../../constants/constants';
import { StoryService } from 'src/app/services/story-service.service';
import { Observable, filter, map, of, tap } from 'rxjs';
import { Utils } from 'src/app/utils/Utils';
import { CreateTopicModalComponent } from '../create-topic-modal/create-topic-modal.component';
import { IStory } from 'src/app/models/IStory';
import { AppDataService } from 'src/app/services/app-data.service';
@Component( {
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.scss' ],
} )
export class HomeComponent implements OnInit
{
  public topic$: Observable<any> = new Observable<any>();
  public editMode : boolean = false;
  public showTagsModal: boolean  = false;
  public curPage : string = "Public";
  public topics$: Observable<IStory[]> = new Observable<IStory[]>();
  public updatedIndex: Observable<string> = new Observable<string>();
  public switchView: boolean = true;
  public selectedView: string = "default";
  public loggedInUser: string = "";
  constructor(private modalService: NgbModal,private formBuilder: FormBuilder,private utils: Utils, private storyService: StoryService, private appData: AppDataService)
  {
   // console.log(this.appData.getAppData());
  //  this.topic$ = of(this.appData.getAppData());
    this.topic$ = this.storyService.getSelectedTopic();  
    this.updatedIndex = this.storyService.updatedIndex;
    this.storyService.getTopics().subscribe(); 
  }

  public switchMode(event:boolean) {
    this.editMode = event; 
  }


  public open ( modal: any ): void
  {
    this.modalService.open( modal );
  }

  public getTagIcon(category: string) : string{
    let iconClass = "";
    switch(category){
      case "country": 
        iconClass = "bi bi-globe-americas";
        break; 
      case "region":
        iconClass = "bi bi-geo-alt-fill";
        break;
      case "city":
        iconClass = "bi bi-pin-map-fill";
        break;
      case "food": 
        iconClass = "bi bi-egg-fried";
        break; 
      case "hotel": 
        iconClass = "bi bi-shop";
        break; 
      case "other": 
        iconClass = "bi bi-shuffle";
        break; 
      default: 
        iconClass = ""
        break
    }
    return iconClass;
  }

  /*handleFileInput(event: any) {
    this.fileToUpload = event.target?.files.item(0);

    //Show image preview
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl.push(event.target.result);
     // this.storyService.setSelectedTopic({...this.topicData, imageUrl});
    }
    //this.editMode = false;
    reader.readAsDataURL(this.fileToUpload);
  }*/

  switchViewClick() : void
  {
    this.switchView = !this.switchView;
    this.switchPage(this.curPage);
  }

  ngOnInit(): void {
    this.appData.getLoggedInUser().subscribe((user: string) => {
      this.loggedInUser = user;
      this.switchPage(this.curPage);
    });
  }

  public switchPage(page: string) {
    this.curPage = page;
    this.topics$ = !this.switchView ? this.storyService.getTopics() : this.storyService.getTopics().pipe(
      map((topics: any) => topics.filter((topic: any)=> topic.storyPermissions === this.curPage && topic.storyCreatedBy !== this.loggedInUser))
    );
  }

  /*public setValuesOnForm(topic:any): void {
    this.form.get('storyTitle')?.setValue(topic.storyTitle);
    this.form.get('storySummary')?.setValue(topic.storySummary);
    this.form.get('storyDescription')?.setValue(topic.storyDescription);
    this.topicTags = topic.storyTags;
  }*/

  /*public editTopic (): void
  {
      this.form.enable();
      this.setValuesOnForm(this.topicData);
      this.editMode = true;
      this.storyService.setSelectedTopic(this.topicData);
  }

  public deleteTopic (): void
  {
      this.form.enable();
      this.form.reset();
     // this.setValuesOnForm(topic);
      this.storyService.deleteTopics(this.topicData);
      this.storyService.setSelectedTopic(null);
    
    
  }*/

  /*public viewTopic(topic:any): void {
    this.topic = topic;
    this.setValuesOnForm(topic);
    this.form.disable();
  }

  

  public setCurrentTopic ( topic: any , index: number): void
  {
    this.topic = topic;
    this.currentTopicIndex = index;
  }*/


  public newTopic(): void {
    // this.editMode = false;
    // this.form.reset();
    // this.storyService.setSelectedTopic(null);
    // this.topicTags = [];
   //this.showCreateTopicModal = true;
    const modalRef = this.modalService.open(CreateTopicModalComponent, {backdrop: 'static',size: 'xxl', fullscreen: true, centered: true, windowClass : "myCustomModalClass"});
    modalRef.componentInstance.story = null;
    modalRef.result.then((result) => {
      //console.log(result);
    }).catch((error) => {
      //console.log(error);
    });
  }
  

  /*public saveEditedStory(): void {
    this.storyService.updateTopics(this.form.getRawValue());
    this.form.reset();
    this.editMode = false;
    this.storyService.setSelectedTopic(null);
    this.topicTags = [];
  }*/

  
}

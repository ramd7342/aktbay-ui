import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DPR_ITEMS, MONETIZATION_ITEMS, OUTPUT_TEMPLATE_ITEMS, PERMISSION_ITEMS, SAMPLE_DESCRIPTION, TAGS } from '../../constants/constants';
import { StoryService } from 'src/app/services/story-service.service';
import { Observable } from 'rxjs';
import { Utils } from 'src/app/utils/Utils';
@Component( {
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.scss' ],
} )
export class HomeComponent
{
  public form: FormGroup;
  public disableFields: boolean = false;
  
  public topic$: Observable<any> = new Observable<any>();
  
  public currentTopicIndex: any = null;
 
  public editButton: boolean = false;
  public fileToUpload: any;
  public imageUrl: any = [];
  public tags = TAGS;
  public permissionItems : any = PERMISSION_ITEMS;
  public selectedPermission: any = "";

  public outputTemplateItems : any = OUTPUT_TEMPLATE_ITEMS;
  public selectedOutputTemplate: any = "";

  public dprItems : any = DPR_ITEMS;
  public selectedDpr: any = "";

  public monetizationItems : any = MONETIZATION_ITEMS;
  public selectedMonetization: any = "";

  public topicTags : any = [];

  public showTagsModal = false;
  public showAttachmentModal = false;

  public editMode : boolean = false;

  public topicData: any = null;
  public sampleDescription = SAMPLE_DESCRIPTION;

  constructor(private modalService: NgbModal,private formBuilder: FormBuilder,private utils: Utils, private storyService: StoryService)
  {
    this.selectedPermission = this.permissionItems[0];
    this.selectedOutputTemplate = this.outputTemplateItems[0];
    this.selectedDpr = this.dprItems[0];
    this.selectedMonetization = this.monetizationItems[0];
    this.form = this.formBuilder.group({
      storyTitle: ['Test Title', [Validators.min(5), Validators.required]],
      storySummary: ['Test Summary', [Validators.min(5), Validators.required]],
      storyDescription: [this.sampleDescription, [Validators.min(5), Validators.required]],
    });
    
    this.topic$ = this.storyService.getSelectedTopic();
    this.topic$.subscribe(topic => {
      if(topic) {
        this.topicData = topic;
      } 
    });
  }

  public createStory (): void
  {
    let saveObj = {
      ...this.form.getRawValue(), 
      "storyPermissions": this.selectedPermission, 
      "storyOutputTemplate": this.selectedOutputTemplate,
      "storyDpr": this.selectedDpr,
      "storyMonetization": this.selectedMonetization
    }; 
    this.storyService.addTopics(saveObj);
    this.form.reset();
    this.topicTags = [];
    this.selectedPermission = "";
    this.selectedOutputTemplate = "";
    this.selectedDpr = "";
    this.selectedMonetization = "";
  }

  public switchMode(event:boolean) {
    this.editMode = event;
    this.topic$.subscribe((topic:any) => {
      this.form.get("storyTitle")?.setValue(topic.storyTitle);
      this.form.get("storySummary")?.setValue(topic.storySummary);
      this.form.get("storyDescription")?.setValue(topic.storyDescription);
      this.selectedPermission = topic.storyPermissions;
      this.selectedOutputTemplate = topic.storyOutputTemplate;
      this.selectedDpr = topic.storyDpr;
      this.selectedMonetization = topic.storyMonetization;
      this.form.enable();
    })
    
  }
 
  public getFormTag(category: any) {
    return this.tags.find(f => f.category===category)?.displayName || this.tags[0].displayName;
  }
 
  public getRandomButton(): string {
    let buttonClasses = ["primary","secondary","success","danger","warning","info","dark"]
    return `btn btn-outline-${buttonClasses[Math.floor(Math.random()*buttonClasses.length)]} m-2`;
  }

  public addNewTag(newTag:any) {
    this.topicTags.push( { tagName: newTag, tagCategory: "other", tagClass: this.getRandomButton() } );
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

  handleFileInput(event: any) {
    this.fileToUpload = event.target?.files.item(0);

    //Show image preview
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.topic$.subscribe(topic => {
        topic.imageUrl.push(event.target.result);
        this.storyService.setSelectedTopic(topic);
      });
    }
    reader.readAsDataURL(this.fileToUpload);
  }


  ngOnInit(): void {
    
  }

  public setValuesOnForm(topic:any): void {
    this.form.get('storyTitle')?.setValue(topic.storyTitle);
    this.form.get('storySummary')?.setValue(topic.storySummary);
    this.form.get('storyDescription')?.setValue(topic.storyDescription);
    this.topicTags = topic.storyTags;
  }

  public editTopic (): void
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
    
    
  }

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

  

  public saveEditedStory(): void {
    this.storyService.updateTopics(this.form.getRawValue());
    this.form.reset();
    this.editMode = false;
    this.storyService.setSelectedTopic(null);
  }

  
}

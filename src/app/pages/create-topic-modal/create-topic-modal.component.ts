import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StoryService } from 'src/app/services/story-service.service';
import { Utils } from 'src/app/utils/Utils';
import { DPR_ITEMS, MONETIZATION_ITEMS, OUTPUT_TEMPLATE_ITEMS, PERMISSION_ITEMS, SAMPLE_DESCRIPTION, TAGS } from '../../constants/constants';
import { ITag, ITagRegex } from 'src/app/models/ITag';
import { IStory } from 'src/app/models/IStory';
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-create-topic-modal',
  templateUrl: './create-topic-modal.component.html',
  styleUrls: ['./create-topic-modal.component.scss']
})
export class CreateTopicModalComponent implements OnInit {
  
  public form: FormGroup;
  public tags: Array<ITagRegex> = TAGS;
  public permissionItems : Array<string> = PERMISSION_ITEMS;
  public selectedPermission: string = "";
  public outputTemplateItems : Array<string> = OUTPUT_TEMPLATE_ITEMS;
  public selectedOutputTemplate: string = "";
  public dprItems : Array<string> = DPR_ITEMS;
  public selectedDpr: string = "";
  public monetizationItems : Array<string> = MONETIZATION_ITEMS;
  public selectedMonetization: string = "";
  public showTagsModal: boolean  = false;
  public showAttachmentModal: boolean  = false;
  public editMode : boolean = false;  
  public sampleDescription: string = SAMPLE_DESCRIPTION;
  public imageUrl: Array<any> = [];
  public storyTags: Array<ITag> = [];
  public newTagName: string = "";
  public newTagCategory: string = "";

  @ViewChild('createTopicModal') 
  public createTopicModal: any;

  @Input() public story: any;

  constructor(private formBuilder: FormBuilder,private utils: Utils, private storyService: StoryService, public activeModal: NgbActiveModal) {
    this.form = this.formBuilder.group({
      storyTitle: ['Test Title', [Validators.min(5), Validators.required]],
      storySummary: ['Test Summary', [Validators.min(5), Validators.required]],
      storyDescription: [this.sampleDescription, [Validators.min(5), Validators.required]],
    });
    
  }

  ngOnInit(): void {
    this.selectedPermission = this.story?.storyPermissions || this.permissionItems[0];
    this.selectedOutputTemplate = this.story?.storyOutputTemplate || this.outputTemplateItems[0];
    this.selectedDpr = this.story?.storyDpr || this.dprItems[0];
    this.selectedMonetization = this.story?.storyMonetization || this.monetizationItems[0];
    this.storyTags = this.story?.storyTags || this.utils.extractTags(this.sampleDescription, this.storyTags);
    this.form.get('storyDescription')?.valueChanges.subscribe((value:string) => {
      this.storyTags = this.utils.extractTags(value, this.storyTags)
    })
    this.form.get('storyTitle')?.setValue(this.story?.storyTitle || 'Test Title');
    this.form.get('storySummary')?.setValue(this.story?.storySummary || 'Test Summary');
    this.form.get('storyDescription')?.setValue(this.story?.storyDescription || this.sampleDescription);
    this.imageUrl = this.story?.storyImageUrl || [];
  }

  public addTag(): void {
    this.storyTags.push({ tagName: this.newTagName, tagCategory: this.newTagCategory, tagClass: this.utils.getRandomButton() });
    this.newTagCategory = "";
    this.newTagName = "";
  }

  closeModal(): void {
    this.activeModal.close('Modal Closed');
  }

  public deleteTag(tag: any): void {
    this.storyTags.splice(this.storyTags.indexOf(tag), 1);
  }
  public deleteImage (image: any): void {
    this.imageUrl.splice(this.imageUrl.indexOf(image), 1);
  }
  public createStory (): void
  {
    let saveObj: IStory = {
      ...this.form.getRawValue(), 
      "storyTags": this.storyTags,
      "storyId": uuidv4(),
      "storyCreatedDate": new Date().toISOString(),
      "storyUpdatedDate": new Date().toISOString(),
      "storyCreatedBy": "Ram",
      "storyUpdatedBy": "Ram",
      "storyImageUrl": this.imageUrl,
      "storyPermissions": this.selectedPermission, 
      "storyOutputTemplate": this.selectedOutputTemplate,
      "storyDpr": this.selectedDpr,
      "storyMonetization": this.selectedMonetization, 
    }; 
    this.storyService.addTopics(saveObj);
    this.resetComponentValues();
    this.closeModal();
  }

  public updateStory (): void {
    let updateObj: IStory = {
      ...this.form.getRawValue(), 
      "storyTags": this.storyTags,
      "storyId": this.story.storyId,
      "storyCreatedDate": this.story.storyCreatedDate,
      "storyUpdatedDate": new Date().toISOString(),
      "storyCreatedBy": this.story.storyCreatedBy,
      "storyUpdatedBy": "Ram",
      "storyImageUrl": this.imageUrl,
      "storyPermissions": this.selectedPermission, 
      "storyOutputTemplate": this.selectedOutputTemplate,
      "storyDpr": this.selectedDpr,
      "storyMonetization": this.selectedMonetization, 
    }; 
    this.storyService.updateTopics(updateObj);
    this.resetComponentValues();
    this.closeModal();
  }

  private resetComponentValues ()
  {
    this.form.reset();
    this.selectedPermission = "";
    this.selectedOutputTemplate = "";
    this.selectedDpr = "";
    this.selectedMonetization = "";
  }

  handleFileInput(event: any) {
  const fileToUpload = event.target?.files.item(0);

    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl.push({name:fileToUpload.name, url: event.target.result});
    }
   reader.readAsDataURL(fileToUpload);
  }
}

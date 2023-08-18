import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { TAGS } from '../../constants/constants';
import { Utils } from 'src/app/utils/Utils';
import { StoryService } from 'src/app/services/story-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AttachmentModalComponent } from '../home/attachment-modal/attachment-modal.component';
import { CreateImageModalComponent } from '../create-image-modal/create-image-modal.component';
import { CreateTopicModalComponent } from '../create-topic-modal/create-topic-modal.component';
import { AppDataService } from 'src/app/services/app-data.service';
@Component({
  selector: 'app-story-details',
  templateUrl: './story-details.component.html',
  styleUrls: ['./story-details.component.scss']
})
export class StoryDetailsComponent implements OnInit, OnChanges {

  @ViewChild('eRef') public eRef: any;

  @Input() public topic: any;

  @Input() public pageView: any;

  public isDisplayContextMenu: boolean = false;
  public rightClickMenuItems: Array<any> = [];
  public rightClickMenuPositionX: number = 0;
  public rightClickMenuPositionY: number = 0;
  public selectedText: any = "";
  public parsedTopicDescription: any = null;
  public contextMenuPosition = { x: '0px', y: '0px' };
  public showMore: boolean = false;

  public loggedInUser: string = "ram7459";
  
  constructor(private modalService: NgbModal,private cdr: ChangeDetectorRef, private sanitized: DomSanitizer, private utils: Utils, private storyService: StoryService, private appData: AppDataService) {}

  ngOnInit (): void
  {
    this.appData.getLoggedInUser().subscribe((user: string) => {
      this.loggedInUser = user;
    });
    this.parsedTopicDescription = "";
    this.getTopicDataDetails();
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  ngOnChanges() {
    this.parsedTopicDescription = "";
    this.getTopicDataDetails();
    this.showMore = this.topic?.storyImageUrl?.length > 5 ? true : false;
  }

  private getTopicDataDetails ()
  {
     this.parsedTopicDescription = this.topic?.storyDescription;
      if ( this.topic?.storyDescription )
      {
        TAGS.forEach( ( tag: any ) =>
        {
          this.extractTags( this.topic.storyDescription, tag.tagRegex, tag.category );
        } );
      }
      this.parsedTopicDescription = this.sanitized.bypassSecurityTrustHtml( this.parsedTopicDescription );
  }

  public showAttachmentModal(item:any): void {
    const modalRef = this.modalService.open(AttachmentModalComponent, {backdrop: 'static',size: 'lg', windowClass : "myCustomModalClass", centered: true});
    modalRef.componentInstance.storyImageUrl = [item];
    modalRef.result.then((result) => {
      //console.log(result);
    }).catch((error) => {
      //console.log(error);
    });
  }

  onContextMenu(event: MouseEvent) {
    event.preventDefault();
    const s = window?.getSelection();
    if (s && s.toString().length > 0) {
      this.selectedText = window?.getSelection()?.toString();
    }
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
  }

  public tagSelected(): void {
    this.eRef.nativeElement.innerHTML = this.eRef.nativeElement.innerHTML.replaceAll(this.selectedText, `<span style='background-color:#65cbf2'>${this.selectedText}</span>`);
    // this.newTag.emit(this.selectedText);
    this.topic.storyTags.push({ tagName: this.selectedText, tagCategory: "other", tagClass: this.utils.getRandomButton() });
    this.storyService.updateTopics(this.topic);
    this.selectedText = "";
    
    //this.parsedTopicDescription = this.parsedTopicDescription.replace(this.selectedText, `<span style="background:#FFFF00"> ${this.selectedText} </span>`)
  }

  public tagSelectionWithImage(): void {
    const modalRef = this.modalService.open(CreateImageModalComponent, {backdrop: 'static',size: 'lg', windowClass : "myCustomModalClass", centered: true});
    modalRef.componentInstance.selectedText = this.selectedText;
    modalRef.componentInstance.story = this.topic;
    modalRef.result.then((result) => {
      //console.log(result);
    }).catch((error) => {
      //console.log(error);
    });
    this.selectedText = "";
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

  private extractTags ( storyDescription: any, regex: any, category: any )
  {
    if ( storyDescription.match( regex ) )
    {
      storyDescription.match( regex ).map( ( match: string ) =>
      {
        var matchTag = match.substring( 1, match.length - 1 );
        var index = this.parsedTopicDescription.indexOf(match);
        this.parsedTopicDescription = this.parsedTopicDescription.replace(match, "");
        var tagElement = this.topic.storyTags.find((storyTag: any)=> storyTag.tagName === matchTag);
        var replacement = tagElement ? `<span style='background-color:#65cbf2'> ${tagElement.tagName} </span>` : ``;
        this.parsedTopicDescription = this.parsedTopicDescription.substring(0, index) + replacement + this.parsedTopicDescription.substring(index)
      } );
    }
  }

  public approveDpr(topic:any): void {
    var t = topic;
    t['storyTags'] = [...topic.storyTags, ...topic.dprTags];
    t['storyImageUrl'] = [...topic.storyImageUrl, ...topic.dprImageUrl];

    t['dprTags'] = null;
    t['dprImageUrl'] = null;
    t['dprApprovals'] = false;
    this.storyService.updateTopics(t);
  }

  public dprStory(topic:any) : void{
    const modalRef = this.modalService.open(CreateTopicModalComponent, {backdrop: 'static',size: 'lg', windowClass : "myCustomModalClass", centered: true});
    modalRef.componentInstance.story = topic;
    modalRef.componentInstance.fromDpr = true;
    modalRef.result.then((result) => {
      //console.log(result);
    }).catch((error) => {
     // console.log(error);
    });
    this.storyService.setSelectedTopic(topic);
  }

  

}

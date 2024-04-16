import { AfterViewInit, Component, OnChanges, OnInit, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import * as $ from 'jquery';
@Component({
  selector: 'app-annotate-content',
  templateUrl: './annotate-content.component.html',
  styleUrls: ['./annotate-content.component.scss']
})
export class AnnotateContentComponent implements OnInit{
  public content : string = "";
  public paragraphedContent : SafeHtml  | undefined;
  public selectedText: any = "";
  public contextMenuPosition = { x: '0px', y: '0px' };
  public tagText = "";
  public tagText2 = "";
  public tagText3 = "";
  public selection : any = {};
  public selectionMap: any = {};
  public tagType: any = "span";
  public clickedId = "";
  public uploadedImage : any = {};
  public playNow = false;
  public correctAnswersCount : number = 0;
  @ViewChild('container') public container: any;

  constructor(private domSanitizer: DomSanitizer, private renderer: Renderer2) {}
  ngOnInit(): void {
      this.content = `Ne gule-e naghma hoon, na parda-e saaz;
      main hoon apni shikast ki aawaz`;
      this.annotate();
  }

  annotate(){
    var formattedContent = "";
    this.content.split(/\r?\n/).forEach((line, index) => {
      formattedContent += `<span style="margin-bottom:0.1rem;" id='line${index}'>${line}</span><br>
                           <p style='display:none;margin-bottom:0.1rem;' id='duplicateline${index}'>
                            ${line}
                           </p>`;
    })
    this.paragraphedContent = this.domSanitizer.bypassSecurityTrustHtml(formattedContent);
  }

  onContextMenu(event: any) {
    event.preventDefault();
    this.uploadedImage = {};
    let parent = ( <HTMLElement>event.target ).parentElement;
    let s = window?.getSelection() || null;
    let selectionRange = s && s.getRangeAt(0);
    this.contextMenuPosition.x = event.clientX - 70 + 'px';
    this.contextMenuPosition.y = event.clientY - 132 + 'px';
    if (s && selectionRange && s.toString().length > 0) {
      this.selectedText = selectionRange?.toString();
      let selectedObj = {
        startOffset: selectionRange?.startOffset && selectionRange?.startOffset - 1,
        endOffset: selectionRange?.endOffset && selectionRange?.endOffset - 1,
        text: selectionRange?.toString(),
        tagtext: "",
        uploadedImage: {},
        id: parent?.id,
        selId : event.target.id,
        selectionRange : selectionRange
      };
      this.selection = selectedObj;
    }
  }

  getQuestionsLength() {
    var questions = this.selectionMap[this.selection?.selId] || [];
    return questions.length;
  }

  tagSelectionWithText(tagStyle: string, tagText : string): void {
    this.selection.tagtext = tagText;
    this.selection.index = this.selectionMap[this.selection?.selId]?.length + 1 || 1;
    this.selectionMap[this.selection?.selId] = [...this.selectionMap[this.selection?.selId] || [], this.selection];
    var divName = this.selectedText.replace(/\s/g, "");
    var selectionContents = this.selection.selectionRange.extractContents();
    var mark = document.createElement(this.tagType);
    mark.id = this.selection.selId + "_" + divName+"_"+this.selection.index;
    mark.style.cursor = "pointer";
    mark.setAttribute("data-annotated", "yes");
    if(tagStyle === "dblline") {
      mark.style.textDecoration = "underline";
      mark.style.borderBottom = "1px solid black";
    } 
    if(tagStyle === "highlight") {
      mark.style.backgroundColor = "yellow";
    }
    if(tagStyle === "singleline") {
      mark.style.textDecoration = "underline";
    }
    if(tagStyle === "image") {
      mark.style.textDecoration = "underline";
      var ic = document.createElement("i");
      ic.className = "bi bi-file-earmark-image";
      mark.appendChild(ic);
    }
    
    mark.appendChild(selectionContents);
    this.selection.selectionRange.insertNode(mark);
    this.selectedText = ''
    this.tagText = '';
    this.tagText2 = '';
    this.tagText3 = '';
    var dupEle = document.getElementById("duplicate"+this.selection?.selId);
    if(dupEle) {
      dupEle.style.display = "none";
    }
    this.renderer.listen(mark,'click', (event)=> {
          this.displayAnnotatedText( event );
    })
  }

  private displayAnnotatedText ( event: any )
  {
    var eleId = event.target.id;
    
    var eleParent = event.target.parentElement.id;
    var eleIdArr = eleId.split( "_" );
    var dupId = "duplicate" + eleIdArr[ 0 ];
    var dupele = document.getElementById( dupId );

    var eleIdRef = document.getElementById( eleId );
    var eleParentRef = document.getElementById( eleParent );
    var elePos = eleIdRef?.getBoundingClientRect();
    var eleParentPos = eleParentRef?.getBoundingClientRect();
    
    if ( dupele )
    {
      let tagText = this.selectionMap[ eleIdArr[ 0 ] ]?.find( ( m: any ) => m.text === eleIdArr[ 1 ] && m.index === parseInt( eleIdArr[ 2 ] ) )?.tagtext || "";
      var xPos = elePos?.x || 0;
      if ( tagText.length > 0)
      {
        if(!this.playNow) {
          dupele.innerHTML = tagText.indexOf("data:image") < 0 ? `<span style="margin-left:${ xPos - 30 }px"> </span>` + tagText : `<img src="${ tagText }" style="margin-left:${ xPos - 30 }px;max-width:100px;max-height:100px"/>`;
          dupele.style.color = "blue";
          dupele.style.fontSize = "15pt";
          if ( eleParentPos )
          {
            dupele.style.width = eleParentPos.width + "px";
            dupele.style.padding = "5px";
          }
          dupele.style.display = dupele.style.display === "block" ? "none" : "block";
          if(this.clickedId !== eleId) {
            dupele.style.display = "block";
          }
        } else {
          dupele.innerHTML = "";
          var parentNode = document.createElement("div");
          parentNode.className = "input-group mb-3";

          var childInput = document.createElement("input");
          childInput.type = "text";
          childInput.id = "answerId";
          childInput.className = "form-control";
          childInput.placeholder = "Enter Answer";
          childInput.style.marginLeft = xPos - 30 + "px";
          childInput.style.width = "20%";
          childInput.setAttribute("aria-label", "Enter Answer");
          childInput.setAttribute("aria-describedby", "basic-addon3");

          var childSpan = document.createElement("span");
          childSpan.className = "input-group-text";
          childSpan.id = "basic-addon3";
          childSpan.style.cursor = "pointer";
          childSpan.innerHTML = "Check";

          this.renderer.listen(childSpan,'click', (event)=> {
            this.checkAnswer( event, tagText );
          })

          parentNode.appendChild(childInput);
          parentNode.appendChild(childSpan);

          dupele.appendChild(parentNode);
          dupele.style.display = "block";
        }
      } 
      this.clickedId = eleId;
    }
  }

  checkAnswer(event:any, tagText: any) : void {
    var answer = document.getElementById("answerId") as HTMLInputElement;
    if(answer.value === tagText) {
      alert("Correct Answer");
      this.correctAnswersCount++;
    } else {
      alert("Wrong Answer");
    }
  }

  handleFileInput(event: any) {
    const fileToUpload = event.target?.files.item(0);
  
      let reader = new FileReader();
      reader.onload = (event: any) => {
        //this.imageUrl.push({name:fileToUpload.name, url: event.target.result});
        this.uploadedImage = {name:fileToUpload.name, url: event.target.result};
        this.tagSelectionWithText("image", this.uploadedImage.url);
        setTimeout(() => {
          this.selectedText = "";
        }, 3000)
        
      }
     reader.readAsDataURL(fileToUpload);
  }

  handleCheckBoxChange(event: any) {
    this.playNow = event.target.checked;
  }
}

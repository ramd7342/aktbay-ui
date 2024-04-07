import { Component, Renderer2, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {
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
  public gameMode = false;
  public level1CorrectAnswersCount : number = 0;
  public level2CorrectAnswersCount : number = 0;
  public level : number = 0;
  @ViewChild('container') public container: any;
  public createFlag = false;
  public signedInAs = "Ram";
  public storyType = "Crime Thriller";
  public comprehension = "Word list?";
  public contentType = "Story Based";

  constructor(private domSanitizer: DomSanitizer, private renderer: Renderer2) {}
  ngOnInit(): void {
      this.content = `In the heart of the city, where shadows dance with secrets, Detective Lane hunted his prey. 
      His mind, an orchestra of words, clung to the tenacious scent of crime lingering in the air. 
      The case at hand—ephemeral as smoke, yet potent as poison—haunted his every step.

      The city's pulse throbbed with the capricious nature of its inhabitants. 
      Amidst the prosaic routines of everyday life, aberrant deeds whispered through the alleys. 
      Lane's instincts sharpened, sensing the adulterated truth lurking beneath the surface.
      
      As dusk descended, the city fell into abeyance, a temporary reprieve before chaos unleashed its fury once more. 
      But Lane refused to let the darkness consume him. 
      With each clue unearthed, he felt the weight of the case abate, the truth inching closer to light.
      
      In a candid moment of revelation, the pieces aligned, and Lane's pursuit reached its climax. 
      The suspect, driven by a twisted motive, attempted to abscond into the night. 
      Yet, justice, relentless and unyielding, seized its quarry.
      
      In the end, amidst the labyrinth of deceit, truth prevailed, and Lane's resolve ameliorated the city's wounds, if only for a fleeting moment.`;
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

  changeLogin(loginUser: string) {
    this.signedInAs = loginUser;
    if(loginUser !== 'Ram') {
      this.gameMode = true;
    } else {
      this.gameMode = false;
    }
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
        selectionRange : selectionRange,
        createdBy : 'Ram'
      };
      this.selection = selectedObj;
    }
  }

  getQuestionsLength() {
    var questions = this.selectionMap[this.selection?.selId] || [];
    return questions.length;
  }

  handleSubmit() {
    this.selectionMap[this.selection?.selId] = [...this.selectionMap[this.selection?.selId] || [], this.selection];
  }

  tagSelectionWithText(tagStyle: string, tagText : string): void {
    this.selection.tagtext = tagText;
    this.selection.index = this.selectionMap[this.selection?.selId]?.length + 1 || 1;
    this.selectionMap[this.selection?.selId] = [...this.selectionMap[this.selection?.selId] || [], this.selection];
    var divName = this.selectedText.replace(/\s/g, "");
    var selectionContents = this.selection.selectionRange.extractContents();
    var mark = document.createElement(this.tagType);
   // mark.id = this.selection.selId + "_" + divName+"_"+this.selection.index;
    mark.style.cursor = "pointer";
    mark.setAttribute("data-annotated", "yes");

    let selContSpan = document.createElement("span");

    var markInput = document.createElement("input");
    markInput.type = "text";
    markInput.id = this.selection.selId + "_" + divName+"_input_"+this.selection.index;
    //markInput.setAttribute("data-annotated", "yes");
    markInput.style.display = "none";
    markInput.className = "form-control";
    markInput.addEventListener("keypress", (event: any) => {
      if(event.key === "Enter") {
        event.preventDefault();
        alert("Enter in level 2 : "+ event.target.value);
        let sts = this.checkAnswer( event, event.target.value, this.selectionMap[this.selection?.selId] );
        if(sts) {
          event.target.style.display = "none";
          selContSpan.style.display = "inline-block";
        }
      }
    });

    if(tagStyle === "dblline") {
      mark.style.textDecoration = "underline";
      mark.style.borderBottom = "1px solid black";
      mark.setAttribute("data-decoration", "dblline");
    } 
    if(tagStyle === "highlight") {
      mark.style.backgroundColor = "yellow";
      mark.setAttribute("data-decoration", "highlight");
    }
    if(tagStyle === "singleline") {
      mark.style.textDecoration = "underline";
      mark.setAttribute("data-decoration", "singleline");
    }
    if(tagStyle === "image") {
      mark.style.textDecoration = "underline";
      var ic = document.createElement("i");
      ic.className = "bi bi-file-earmark-image";
      mark.appendChild(ic);
      mark.setAttribute("data-decoration", "image");
    }

    
    selContSpan.style.display = "inline-block";
    selContSpan.id = this.selection.selId + "_" + divName+"_"+this.selection.index;
    selContSpan.appendChild(selectionContents);
    mark.appendChild(selContSpan);
    mark.style.display = "inline-block";
    mark.appendChild(markInput);
    this.selection.selectionRange.insertNode(mark);
   // this.selection.selectionRange.insertNode(markInput);
    this.selectedText = ''
    this.tagText = '';
    this.tagText2 = '';
    this.tagText3 = '';
    var dupEle = document.getElementById("duplicate"+this.selection?.selId);
    if(dupEle) {
      dupEle.style.display = "none";
    }
    this.renderer.listen(selContSpan,'click', (event: any)=> {
        this.displayAnnotatedText( event, this.selectionMap[this.selection?.selId] );
    })
  }

  private displayAnnotatedText ( event: any, selMap: any )
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
    var eleRef = document.getElementById(eleId);
    if(eleRef) {
      eleRef.style.backgroundColor = "white";
    }
    if ( dupele )
    {
      let tagText = this.selectionMap[ eleIdArr[ 0 ] ]?.find( ( m: any ) => m.text === eleIdArr[ 1 ] && m.index === parseInt( eleIdArr[ 2 ] ) )?.tagtext || "";
      var xPos = elePos?.x || 0;
      if ( tagText.length > 0)
      {
        if(!this.playNow) {
          dupele.innerHTML = tagText.indexOf("data:image") < 0 ? `<span style="margin-left:${ xPos - 380 }px"> </span>` + tagText : `<img src="${ tagText }" style="margin-left:${ xPos - 30 }px;max-width:100px;max-height:100px"/>`;
          dupele.style.color = "blue";
          dupele.style.fontSize = "15pt";
          if ( eleParentPos )
          {
            dupele.style.width = eleParentPos.width + "px";
            dupele.style.padding = "5px";
          }
        } else {
          dupele.innerHTML = "";
          var parentNode = document.createElement("div");
          parentNode.className = "input-group mb-3";
          
          // if(eleRef) {
          //   eleRef.style.backgroundColor = "yellow";
          // }
          var childInput = document.createElement("input");
          childInput.type = "text";
          childInput.id = "answerId";
          childInput.className = "form-control";
          childInput.placeholder = "Enter Answer";
         // childInput.style.marginLeft = xPos - 30 + "px";
          childInput.style.marginLeft = "0px";
          childInput.style.width = "20%";
          childInput.setAttribute("aria-label", "Enter Answer");
          childInput.setAttribute("aria-describedby", "basic-addon3");

          var childSpan = document.createElement("span");
          childSpan.className = "input-group-text";
          childSpan.id = "basic-addon3";
          childSpan.style.cursor = "pointer";
          childSpan.innerHTML = "Check";

          this.renderer.listen(childInput,'keypress', (event: any)=> {
            if(event.key === "Enter") {
              event.preventDefault();
              var status = this.checkAnswer( event, tagText, selMap );
              if(dupele && status) {
                dupele.style.display = "none";
              }
            }
          })

          this.renderer.listen(childSpan,'click', (event: any)=> {
            this.checkAnswer( event, tagText, selMap );
          })

          parentNode.appendChild(childInput);
         // parentNode.appendChild(childSpan);

          dupele.appendChild(parentNode);
        }
      } 
      dupele.style.display = dupele.style.display === "block" ? "none" : "block";
      if(this.clickedId !== eleId) {
        dupele.style.display = "block";
      }
      this.clickedId = eleId;
    }
  }

  checkAnswer(event:any, tagText: any, selMap: any) : boolean {
    var answer = this.level === 2 ? tagText : (document.getElementById("answerId") as HTMLInputElement).value;
    var compareText = "";
    if(this.level === 2) {
      compareText = selMap[0].text;
    }
    if(this.level === 1) {
      compareText = selMap[0].tagtext;
    }
    console.log("compareText", compareText);
    if(answer === compareText) {
      alert("Correct Answer");
      if(this.level === 1) {
        this.level1CorrectAnswersCount++;
      }
      if(this.level === 2) {
        this.level2CorrectAnswersCount++;
      }
      return true;
    } else {
      alert("Wrong Answer");
    }
    return false;
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
    this.level = 1;
    this.playNow = event.target.checked;
    if(this.playNow) {
      document.querySelectorAll("[data-annotated='yes']").forEach((ele:any) => {
        console.log(ele);
        ele.style.color = "red";
      });
    } else {
      document.querySelectorAll("[data-annotated='yes']").forEach((ele:any) => {
        ele.style.color = "black";
      });
    }
   /* if(this.playNow) {
      document.querySelectorAll("[data-annotated='yes']").forEach((ele:any) => {
        ele.style.borderBottom = "1px solid black";
        ele.style.color = "transparent";
        ele.style.textShadow = "0 0 8px #000;";
      });
    } else {
      document.querySelectorAll("[data-annotated='yes']").forEach((ele:any) => {
        ele.style.color = "black";
        ele.style.textShadow = "none";
        console.log(ele.getAttribute("data-decoration"));
        if(ele.getAttribute("data-decoration") !== "dblline") {
          ele.style.borderBottom = "none";
        }
      });
    }*/
  }

  setLevel(level: number) {
    this.level = level;
    if(this.level === 1) {
      document.querySelectorAll("[data-annotated='yes']").forEach((ele:any) => {
       // ele.style.borderBottom = "none";
        ele.style.color = "red";
        ele.querySelectorAll("span").forEach((ele1:any) => {
          ele1.style.display = "inline-block";
        });
        ele.querySelectorAll("input").forEach((ele1:any) => {
          ele1.style.display = "none";
        });
       // ele.style.textShadow = "none";
      });
    }
    if(this.level === 2) {
      document.querySelectorAll("[data-annotated='yes']").forEach((ele:any) => {
       // ele.style.borderBottom = "1px solid black";
       // ele.style.color = "transparent";
       // ele.style.textShadow = "0 0 8px #000;";
       ele.querySelectorAll("span").forEach((ele1:any) => {
        ele1.style.display = "none";
      });
        ele.querySelectorAll("input").forEach((ele1:any) => {
          ele1.style.display = "inline-block";
          ele1.className = "form-control inlineInput";
          ele1.style.border = "none";
          ele1.style.boxShadow = "none";
        });
        //ele.innerHTML = `<input type="text" class="form-control" placeholder="Fill here"/>`;
        //ele.style.display = "inline-block";
      });
    }
  }
}

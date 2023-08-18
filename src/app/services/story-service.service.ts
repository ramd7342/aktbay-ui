import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { Utils } from 'src/app/utils/Utils';
import { TAGS } from '../constants/constants';
import { IStory } from '../models/IStory';
@Injectable({
  providedIn: 'root'
})
export class StoryService {
  private topics = new BehaviorSubject<any[]>([
    {
      "storyTitle": "ram7459 Public Story",
      "storySummary": "My Travel Adevnture",
      "storyDescription": "Day 1:  \nBreakfast :  \n  Start your day with a traditional South Indian Breakfast at @MTR@ (Mavalli Tiffin Room) in LalBagh. Try thier Signature dish, Rava Idli, and filter coffee.\nLunch:  \n  Head to Nagarjuna Inn Residency Road for some spicy #Andhra-style biryani# and chicken fry.\nDinner: \n  Indulge in some North Indian cuisine at Punjabi Grill in MG Road. Don't miss their butter chicken and garlic naan.\n\nDay 2 : \nBreakfast :  \n  Head to Brahmin's Coffee Bar in Basavangudi for theire delicious idlis, vadas and filter coffee.\nLunch:  \n  Enjoy some authentic Karnataka-style meals at Vidayarthi Bhavan in Gandhi Bazaar. Their masala dosa is a must-try.\nDinner: \n  Try some delicious street food at Shivaji Military Hotel in Jayanagar. Their Donne Biryani and Mutton Chops are highly recommended.\n\nDay 3 : \nBreakfast :  \n  Start your day with some delicious kebabs and parathas at Empire Restaurant in Church Street.\nLunch:  \n  Head to Taaza Thindi in Jayanagar for some mouth-warering chaat and pani puri\nDinner: \n  Enjoy some coastal cuisine at Fisherman's Wharf in Sarjapur. Their seafood platter and prawn curry are highly recommended.\n\nDay 4 : \nBreakfast :  \n  Visit CTR (Central Tiffin Room) in Malleshwaram for some delicious khara bath and kesari bath.\nLunch:  \n  Head to Nagarjuna Restaurant in Mallesaram for some authentic Kannada meals.\nDinner: \n  Enjoy some global cuisine at Farzi Cafe in UB City. Don't miss their Molecular Chaat and Dal Chawal Arancini.\n",
      "storyCreatedBy": "ram7459",
      "storyTags": [
        {
          "tagName": "MTR",
          "tagCategory": "country",
          "tagClass": "btn btn-outline-success m-2"
        },
        {
          "tagName": "Andhra-style biryani",
          "tagCategory": "food",
          "tagClass": "btn btn-outline-primary m-2"
        }
      ],
      "storyId": "cab1d320-1f5a-4c84-aec2-daea6ce8eb23",
      "storyCreatedDate": "2023-08-07T19:37:16.438Z",
      "storyUpdatedDate": "2023-08-07T19:37:16.438Z",
      "storyUpdatedBy": "ram7459",
      "storyImageUrl": [],
      "storyPermissions": "Public",
      "storyOutputTemplate": "Default",
      "storyDpr": "Yes (public)",
      "storyMonetization": "Paid - Ad"
    },
    {
      "storyTitle": "ram7459 - Scelerisque",
      "storySummary": "Drafted Scelerisque Story",
      "storyDescription": `<p>Scelerisque. Fringilla suspendisse malesuada hendrerit eros est nonummy semper dolor morbi sapien facilisis parturient ultricies mus mus. Nunc integer cras leo etiam et eget cum duis.</p>

        <p>Dis magnis nulla phasellus torquent feugiat magna lorem nonummy. Porta dapibus feugiat ridiculus augue neque potenti nunc pretium non parturient eleifend sagittis erat vulputate sociis aenean auctor. Habitasse nullam, amet justo porttitor praesent sollicitudin magnis. Felis mi maecenas hymenaeos feugiat parturient.</p>
        
        <p>Accumsan dictumst lectus pede mauris elementum est et duis magnis montes hac pretium fames. Convallis gravida suspendisse rutrum. Tempor interdum inceptos nec porta consectetuer augue. Quis cras. Dis erat pede praesent. Inceptos. Euismod.</p>`,
      "storyCreatedBy": "ram7459",
      "storyTags": [
      ],
      "storyId": "534c7fc6-b8c3-48c3-8fc4-71a71207905e",
      "storyCreatedDate": "2023-08-07T19:37:16.438Z",
      "storyUpdatedDate": "2023-08-07T19:37:16.438Z",
      "storyUpdatedBy": "ram7459",
      "storyImageUrl": [],
      "storyPermissions": "Private",
      "storyOutputTemplate": "Default",
      "storyDpr": "Yes (public)",
      "storyMonetization": "Paid - Ad"
    },
    {
      "storyTitle": "sow2704 Public Story",
      "storySummary": "Public - Sollicitudin tortor dolor suspendisse",
      "storyDescription": `Sollicitudin tortor dolor suspendisse. Faucibus nisi, eleifend ac ultrices consequat nonummy, pulvinar gravida tempus rhoncus taciti nec turpis interdum dignissim et hymenaeos conubia tortor nostra nascetur odio luctus sit ullamcorper volutpat leo posuere habitant, et eu euismod sollicitudin nam.

        Eleifend duis aliquet libero senectus. In felis facilisi ante scelerisque turpis non taciti dis purus posuere sociosqu rhoncus curae; nonummy id. Orci diam ac lobortis mus. Luctus erat. Posuere quis mi dis, odio luctus. Per.
        
        Mollis urna sed vivamus mi. Platea Lacinia fames. Congue convallis adipiscing vestibulum. Erat interdum porta imperdiet urna sociosqu molestie ipsum, quis nibh pretium luctus. Nonummy vitae.`,
      "storyCreatedBy": "sow2704",
      "storyTags": [

      ],
      "storyId": "4c708c98-e3bf-432a-a81e-875fc2b1bdd1",
      "storyCreatedDate": "2023-08-07T19:37:16.438Z",
      "storyUpdatedDate": "2023-08-07T19:37:16.438Z",
      "storyUpdatedBy": "sow2704",
      "storyImageUrl": [],
      "storyPermissions": "Public",
      "storyOutputTemplate": "Default",
      "storyDpr": "No (public)",
      "storyMonetization": "Paid - Ad"
    },
    {
      "storyTitle": "sow2704 Private Story",
      "storySummary": "Private Suscipit imperdiet ornare",
      "storyDescription": `Suscipit imperdiet ornare. At sollicitudin. Diam maecenas aenean pretium pellentesque, ante class consectetuer rhoncus habitasse.

        Per condimentum malesuada nec ipsum pede augue malesuada litora sed nam vulputate lacinia orci integer aliquam hac pharetra conubia, dolor.
        
        Lobortis conubia, ridiculus pretium augue justo lacus felis lacus condimentum. Penatibus convallis metus suspendisse libero senectus tempor. Volutpat nisi ut, tempor aenean senectus phasellus convallis eget morbi vitae nam curabitur.
        
        Et. Interdum enim posuere nisl vivamus nisi tellus diam. Maecenas Purus curabitur varius primis, cursus et non nisi.
        
        Vel vestibulum orci donec platea tristique, iaculis leo tempor eros vestibulum curabitur quis tellus nullam dapibus nullam.`,
      "storyCreatedBy": "sow2704",
      "storyTags": [

      ],
      "storyId": "0cba39c7-0f3a-4d72-bf37-14bb6d851d97",
      "storyCreatedDate": "2023-08-07T19:37:16.438Z",
      "storyUpdatedDate": "2023-08-07T19:37:16.438Z",
      "storyUpdatedBy": "sow2704",
      "storyImageUrl": [],
      "storyPermissions": "Private",
      "storyOutputTemplate": "Default",
      "storyDpr": "Yes (public)",
      "storyMonetization": "Paid - Ad"
    },
    {
      "storyTitle": "luck1506 Kids Public Story",
      "storySummary": "Public - Nostra",
      "storyDescription": `Nostra. Felis sit donec cum. Accumsan lacus vel pharetra nulla interdum tincidunt lorem adipiscing auctor at nisi.

        Ad lacus. Commodo nulla sagittis feugiat. Mollis tristique. Diam nisi vivamus erat interdum. Lobortis pellentesque phasellus a dictum natoque in, penatibus. Senectus in.
        
        Tempor. Phasellus ut velit eget leo platea. Enim sem facilisi cursus Egestas ultrices dignissim maecenas facilisis taciti.
        
        Porttitor imperdiet porttitor cursus tincidunt. Ipsum dolor elit nostra condimentum sagittis lorem pharetra conubia.
        
        Nascetur laoreet inceptos sit donec metus torquent dignissim vel tristique magna nunc facilisis tempus lectus consequat sem quis, taciti facilisi posuere urna taciti Turpis dis velit mauris laoreet interdum.`,
      "storyCreatedBy": "luck1506",
      "storyTags": [

      ],
      "storyId": "4ef5728c-2ef4-4bb5-bf07-50725c626add",
      "storyCreatedDate": "2023-08-07T19:37:16.438Z",
      "storyUpdatedDate": "2023-08-07T19:37:16.438Z",
      "storyUpdatedBy": "luck1506",
      "storyImageUrl": [],
      "storyPermissions": "Public",
      "storyOutputTemplate": "Default",
      "storyDpr": "Yes (public)",
      "storyMonetization": "Paid - Ad"
    },
    {
      "storyTitle": "luck1506 Kids Private Story",
      "storySummary": "Private Blandit aptent tempor hymenaeos vitae mus suscipit",
      "storyDescription": `Blandit aptent tempor hymenaeos vitae mus suscipit, mollis felis sollicitudin. Tortor per turpis adipiscing consectetuer arcu habitant Nulla porttitor tempus lacinia.

        At metus. Hymenaeos. Nascetur elementum blandit. Nulla nonummy a per quisque id dolor dolor taciti nascetur aenean duis ligula montes nullam. Vivamus diam justo.
        
        Arcu luctus ligula ac neque sodales cras magnis sodales Sit. Mauris ut sociis et ornare dolor volutpat.
        
        Ante maecenas euismod ac lobortis blandit sit turpis. Nulla blandit eleifend. Praesent congue aliquam condimentum habitant.
        
        Adipiscing sociosqu lobortis laoreet mattis facilisis est cras nullam. Penatibus aenean felis sem suscipit dictum consectetuer facilisi cursus rhoncus, est tempus quam.`,
      "storyCreatedBy": "luck1506",
      "storyTags": [

      ],
      "storyId": "58d1dfa5-2a13-4641-b9da-17b720c9f3d8",
      "storyCreatedDate": "2023-08-07T19:37:16.438Z",
      "storyUpdatedDate": "2023-08-07T19:37:16.438Z",
      "storyUpdatedBy": "luck1506",
      "storyImageUrl": [],
      "storyPermissions": "Private",
      "storyOutputTemplate": "Default",
      "storyDpr": "Yes (public)",
      "storyMonetization": "Paid - Ad"
    },
  ]);
  public updatedIndex = new BehaviorSubject<string>("");
  private selectedTopic = new BehaviorSubject<any>(null);
  constructor(private utils: Utils) { 
  }

  private extractTags ( topic: any )
  {
    let topicTags: any = [];
    TAGS.forEach((tag)=> {
      let matches = topic.storyDescription.match(tag.tagRegex);
      if(matches) {
        const matchess = matches.map((match:string) => {
          var matchTag = match.substring( 1, match.length - 1 );
          var storyTag = topic.storyTags?.find((m: any) => m.tagName === matchTag && m.tagCategory === tag.category);
          if (!storyTag) {
            return { tagName: matchTag, tagCategory: tag.category, tagClass: this.utils.getRandomButton() };
          }
          return null;
        }).filter((m:any) => m);
        topicTags.push(...matchess)
      }
    })
    return topicTags;
  }

  public addTopics(topic: IStory) : void {
    let updatedTopics : any = [...this.topics.getValue()];
    updatedTopics.push(topic);
    this.setTopics(updatedTopics);
    this.updatedIndex.next(topic.storyId);
  }

  public deleteTopics(topic: any) : void {
    this.topics.getValue().splice(this.topics.getValue().findIndex(m => m.storyId === topic.storyId),1);
  }

  public updateTopics(topic: any) : void {
    let index = this.topics.getValue().findIndex((m:any) => m.storyId === topic.storyId);
    this.topics.getValue()[index] = topic;
    this.setTopics(this.topics.getValue());
    this.updatedIndex.next(topic.storyId);
  }

  public setTopics(topics:any): void {
    this.topics.next(topics);
  }

  public getTopics(): any {
    return this.topics.asObservable();
  }

  public setSelectedTopic(topic:any) : void {
    this.selectedTopic.next(topic);
  }

  public getSelectedTopic(): any {
    return this.selectedTopic.asObservable();
  }
}

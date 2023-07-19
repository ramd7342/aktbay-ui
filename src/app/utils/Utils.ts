import {MAX_TEXT_LENGTH, TAGS} from '../constants/constants';
import { ITag } from '../models/ITag';
export class Utils {
    public getRandomButton(): string {
        let buttonClasses = ["primary","secondary","success","danger","warning","info","dark"]
        return `btn btn-outline-${buttonClasses[Math.floor(Math.random()*buttonClasses.length)]} m-2`;
    }

    public getEllipsisText ( text: string ): string
    {
        return text.length > MAX_TEXT_LENGTH ? text.substring( 0, MAX_TEXT_LENGTH ) + "..." : text;
    }

    public extractTags ( storyDescription: string, storyTags: Array<ITag> )
    {
        let topicTags: any = [];
        TAGS.forEach((tag)=> {
        let matches = storyDescription && storyDescription.length > 0 && storyDescription.match(tag.tagRegex);
        if(matches) {
            const matchess = matches.map((match:string) => {
                var matchTag = match.substring( 1, match.length - 1 );
                //var storyTag = storyTags?.find((m: any) => m.tagName === matchTag && m.tagCategory === tag.category);
                //var storyObj = null;
                // if (!storyTag) {
                //     storyObj = { tagName: matchTag, tagCategory: tag.category, tagClass: this.getRandomButton() };
                // }
                return { tagName: matchTag, tagCategory: tag.category, tagClass: this.getRandomButton() };
            }).filter((m:any) => m);
            topicTags.push(...matchess)
        }
        });
        return topicTags;
    }
}


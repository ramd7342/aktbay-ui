import {MAX_TEXT_LENGTH, TAGS} from '../constants/constants';
export class Utils {
    public getRandomButton(): string {
        let buttonClasses = ["primary","secondary","success","danger","warning","info","dark"]
        return `btn btn-outline-${buttonClasses[Math.floor(Math.random()*buttonClasses.length)]} m-2`;
    }

    public getEllipsisText ( text: string ): string
    {
        return text.length > MAX_TEXT_LENGTH ? text.substring( 0, MAX_TEXT_LENGTH ) + "..." : text;
    }

    public extractTags ( topic: any )
    {
        let topicTags: any = [];
        TAGS.forEach((tag)=> {
        let matches = topic.storyDescription.match(tag.tagRegex);
        if(matches) {
            const matchess = matches.map((match:string) => {
                var matchTag = match.substring( 1, match.length - 1 );
                var storyTag = topic.storyTags?.find((m: any) => m.tagName === matchTag && m.tagCategory === tag.category);
                var storyObj = null;
                if (!storyTag) {
                    storyObj = { tagName: matchTag, tagCategory: tag.category, tagClass: this.getRandomButton() };
                }
                return storyObj;
            }).filter((m:any) => m);
            topicTags.push(...matchess)
        }
        });
        return topicTags;
    }
}


import { IImage } from "./IImage";
import { ITag } from "./ITag";

export interface IStory {
    storyTitle: string;
    storySummary: string;
    storyDescription: string;
    storyTags: Array<ITag>;
    storyId: string;
    storyCreatedDate: string;
    storyUpdatedDate: string;
    storyCreatedBy: string;
    storyUpdatedBy: string;
    storyPermissions: string;
    storyOutputTemplate: string;
    storyDpr: string;
    storyMonetization: string;
    storyImageUrl: Array<IImage>;
    dprImageUrl?: Array<IImage>;
    dprTags?: Array<ITag>;
    dprApprovals?: boolean;
}
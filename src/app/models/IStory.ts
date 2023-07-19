export interface IStory {
    storyTitle: string;
    storySummary: string;
    storyDescription: string;
    storyTags: Array<string>;
    storyId: string;
    storyCreatedDate: string;
    storyUpdatedDate: string;
    storyCreatedBy: string;
    storyUpdatedBy: string;
    storyPermissions: string;
    storyOutputTemplate: string;
    storyDpr: string;
    storyMonetization: string;
    storyImageUrl: Array<string>;
}
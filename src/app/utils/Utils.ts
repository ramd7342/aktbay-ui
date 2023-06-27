import {MAX_TEXT_LENGTH} from '../constants/constants';
export class Utils {
    public getRandomButton(): string {
        let buttonClasses = ["primary","secondary","success","danger","warning","info","dark"]
        return `btn btn-outline-${buttonClasses[Math.floor(Math.random()*buttonClasses.length)]} m-2`;
    }

    public getEllipsisText ( text: string ): string
    {
        return text.length > MAX_TEXT_LENGTH ? text.substring( 0, MAX_TEXT_LENGTH ) + "..." : text;
    }
}


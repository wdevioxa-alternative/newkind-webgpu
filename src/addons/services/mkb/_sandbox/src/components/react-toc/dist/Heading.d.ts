/// <reference types="react" />
export default class Heading {
    title: string;
    level: number;
    titleLimit: number;
    customMatchers: CustomMatchers;
    constructor(title: string, level: number, titleLimit: number, customMatchers?: CustomMatchers);
    generateList(): JSX.Element;
}
declare const newHeading: (headingText: string, titleLimit: number, customMatchers?: CustomMatchers) => Heading | null;
export { newHeading };

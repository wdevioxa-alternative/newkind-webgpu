declare const replaceAll: (retStr: string, customMatchers: CustomMatchers) => string;
declare const createLink: (string: string) => string;
declare const createTitle: (string: string, stringLimit: number) => string;
declare const extractHeadingsFromMd: (markdownText: string, highestTargetHeadings: number, lowestTargetHeadings: number) => RegExpMatchArray | null;
declare const removeCodeBlockFromMd: (markdownText: string) => string;
export { replaceAll, createLink, createTitle, extractHeadingsFromMd, removeCodeBlockFromMd, };

/// <reference types="react" />
declare type TocProps = {
    markdownText: string;
    titleLimit?: number;
    highestHeadingLevel?: number;
    lowestHeadingLevel?: number;
    className?: string;
    type?: 'default' | 'raw';
    customMatchers?: CustomMatchers;
};
declare const Toc: ({ markdownText, titleLimit, highestHeadingLevel, lowestHeadingLevel, className, type, customMatchers, }: TocProps) => JSX.Element | null;
export default Toc;

import { ILinkifier2, ILinkProvider, ILink, ILinkifierEvent, ILinkDecorations } from 'browser/Types';
import { IDisposable } from 'common/Types';
import { IMouseService, IRenderService } from './services/Services';
import { IBufferService } from 'common/services/Services';
import { IEvent } from 'common/EventEmitter';
import { Disposable } from 'common/Lifecycle';
interface ILinkState {
    decorations: ILinkDecorations;
    isHovered: boolean;
}
interface ILinkWithState {
    link: ILink;
    state?: ILinkState;
}
export declare class Linkifier2 extends Disposable implements ILinkifier2 {
    private readonly _bufferService;
    private _element;
    private _mouseService;
    private _renderService;
    private _linkProviders;
    protected _currentLink: ILinkWithState | undefined;
    private _lastMouseEvent;
    private _linkCacheDisposables;
    private _lastBufferCell;
    private _isMouseOut;
    private _activeProviderReplies;
    private _activeLine;
    private _onShowLinkUnderline;
    get onShowLinkUnderline(): IEvent<ILinkifierEvent>;
    private _onHideLinkUnderline;
    get onHideLinkUnderline(): IEvent<ILinkifierEvent>;
    constructor(_bufferService: IBufferService);
    registerLinkProvider(linkProvider: ILinkProvider): IDisposable;
    attachToDom(element: HTMLElement, mouseService: IMouseService, renderService: IRenderService): void;
    private _onMouseMove;
    private _onHover;
    private _askForLink;
    private _removeIntersectingLinks;
    private _checkLinkProviderResult;
    private _onClick;
    private _clearCurrentLink;
    private _handleNewLink;
    protected _linkHover(element: HTMLElement, link: ILink, event: MouseEvent): void;
    private _fireUnderlineEvent;
    protected _linkLeave(element: HTMLElement, link: ILink, event: MouseEvent): void;
    private _linkAtPosition;
    private _positionFromMouseEvent;
    private _createLinkUnderlineEvent;
}
export {};
//# sourceMappingURL=Linkifier2.d.ts.map
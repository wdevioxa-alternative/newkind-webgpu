import { IEvent } from 'common/EventEmitter';
import { IRenderDimensions, IRenderer, CharacterJoinerHandler } from 'browser/renderer/Types';
import { IColorSet } from 'browser/Types';
import { ISelectionRedrawRequestEvent as ISelectionRequestRedrawEvent, ISelectionRequestScrollLinesEvent } from 'browser/selection/Types';
import { IDisposable } from 'common/Types';
export declare const ICharSizeService: import("../../common/services/Services").IServiceIdentifier<ICharSizeService>;
export interface ICharSizeService {
    serviceBrand: undefined;
    readonly width: number;
    readonly height: number;
    readonly hasValidSize: boolean;
    readonly onCharSizeChange: IEvent<void>;
    measure(): void;
}
export declare const ICoreBrowserService: import("../../common/services/Services").IServiceIdentifier<ICoreBrowserService>;
export interface ICoreBrowserService {
    serviceBrand: undefined;
    readonly isFocused: boolean;
}
export declare const IMouseService: import("../../common/services/Services").IServiceIdentifier<IMouseService>;
export interface IMouseService {
    serviceBrand: undefined;
    getCoords(event: {
        clientX: number;
        clientY: number;
    }, element: HTMLElement, colCount: number, rowCount: number, isSelection?: boolean): [number, number] | undefined;
    getRawByteCoords(event: MouseEvent, element: HTMLElement, colCount: number, rowCount: number): {
        x: number;
        y: number;
    } | undefined;
}
export declare const IRenderService: import("../../common/services/Services").IServiceIdentifier<IRenderService>;
export interface IRenderService extends IDisposable {
    serviceBrand: undefined;
    onDimensionsChange: IEvent<IRenderDimensions>;
    onRenderedBufferChange: IEvent<{
        start: number;
        end: number;
    }>;
    onRefreshRequest: IEvent<{
        start: number;
        end: number;
    }>;
    dimensions: IRenderDimensions;
    refreshRows(start: number, end: number): void;
    resize(cols: number, rows: number): void;
    changeOptions(): void;
    setRenderer(renderer: IRenderer): void;
    setColors(colors: IColorSet): void;
    onDevicePixelRatioChange(): void;
    onResize(cols: number, rows: number): void;
    onCharSizeChanged(): void;
    onBlur(): void;
    onFocus(): void;
    onSelectionChanged(start: [number, number] | undefined, end: [number, number] | undefined, columnSelectMode: boolean): void;
    onCursorMove(): void;
    clear(): void;
    registerCharacterJoiner(handler: CharacterJoinerHandler): number;
    deregisterCharacterJoiner(joinerId: number): boolean;
}
export declare const ISelectionService: import("../../common/services/Services").IServiceIdentifier<ISelectionService>;
export interface ISelectionService {
    serviceBrand: undefined;
    readonly selectionText: string;
    readonly hasSelection: boolean;
    readonly selectionStart: [number, number] | undefined;
    readonly selectionEnd: [number, number] | undefined;
    readonly onLinuxMouseSelection: IEvent<string>;
    readonly onRequestRedraw: IEvent<ISelectionRequestRedrawEvent>;
    readonly onRequestScrollLines: IEvent<ISelectionRequestScrollLinesEvent>;
    readonly onSelectionChange: IEvent<void>;
    disable(): void;
    enable(): void;
    reset(): void;
    setSelection(row: number, col: number, length: number): void;
    selectAll(): void;
    selectLines(start: number, end: number): void;
    clearSelection(): void;
    isClickInSelection(event: MouseEvent): boolean;
    selectWordAtCursor(event: MouseEvent): void;
    shouldColumnSelect(event: KeyboardEvent | MouseEvent): boolean;
    shouldForceSelection(event: MouseEvent): boolean;
    refresh(isLinuxMouseSelection?: boolean): void;
    onMouseDown(event: MouseEvent): void;
}
export declare const ISoundService: import("../../common/services/Services").IServiceIdentifier<ISoundService>;
export interface ISoundService {
    serviceBrand: undefined;
    playBellSound(): void;
}
//# sourceMappingURL=Services.d.ts.map
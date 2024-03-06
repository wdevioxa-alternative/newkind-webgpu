import { CircularList } from 'common/CircularList';
import { IBuffer, BufferIndex, IBufferStringIterator, IBufferStringIteratorResult } from 'common/buffer/Types';
import { IBufferLine, ICellData, IAttributeData, ICharset } from 'common/Types';
import { Marker } from 'common/buffer/Marker';
import { IOptionsService, IBufferService } from 'common/services/Services';
export declare const MAX_BUFFER_SIZE = 4294967295;
export declare class Buffer implements IBuffer {
    private _hasScrollback;
    private _optionsService;
    private _bufferService;
    lines: CircularList<IBufferLine>;
    ydisp: number;
    ybase: number;
    y: number;
    x: number;
    scrollBottom: number;
    scrollTop: number;
    tabs: any;
    savedY: number;
    savedX: number;
    savedCurAttrData: IAttributeData;
    savedCharset: ICharset | undefined;
    markers: Marker[];
    private _nullCell;
    private _whitespaceCell;
    private _cols;
    private _rows;
    constructor(_hasScrollback: boolean, _optionsService: IOptionsService, _bufferService: IBufferService);
    getNullCell(attr?: IAttributeData): ICellData;
    getWhitespaceCell(attr?: IAttributeData): ICellData;
    getBlankLine(attr: IAttributeData, isWrapped?: boolean): IBufferLine;
    get hasScrollback(): boolean;
    get isCursorInViewport(): boolean;
    private _getCorrectBufferLength;
    fillViewportRows(fillAttr?: IAttributeData): void;
    clear(): void;
    resize(newCols: number, newRows: number): void;
    private get _isReflowEnabled();
    private _reflow;
    private _reflowLarger;
    private _reflowLargerAdjustViewport;
    private _reflowSmaller;
    stringIndexToBufferIndex(lineIndex: number, stringIndex: number, trimRight?: boolean): BufferIndex;
    translateBufferLineToString(lineIndex: number, trimRight: boolean, startCol?: number, endCol?: number): string;
    getWrappedRangeForLine(y: number): {
        first: number;
        last: number;
    };
    setupTabStops(i?: number): void;
    prevStop(x?: number): number;
    nextStop(x?: number): number;
    addMarker(y: number): Marker;
    private _removeMarker;
    iterator(trimRight: boolean, startIndex?: number, endIndex?: number, startOverscan?: number, endOverscan?: number): IBufferStringIterator;
}
export declare class BufferStringIterator implements IBufferStringIterator {
    private _buffer;
    private _trimRight;
    private _startIndex;
    private _endIndex;
    private _startOverscan;
    private _endOverscan;
    private _current;
    constructor(_buffer: IBuffer, _trimRight: boolean, _startIndex?: number, _endIndex?: number, _startOverscan?: number, _endOverscan?: number);
    hasNext(): boolean;
    next(): IBufferStringIteratorResult;
}
//# sourceMappingURL=Buffer.d.ts.map
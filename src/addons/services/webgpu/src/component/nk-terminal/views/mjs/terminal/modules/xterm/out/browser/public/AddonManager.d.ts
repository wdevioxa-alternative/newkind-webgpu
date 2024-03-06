import { ITerminalAddon, IDisposable, Terminal } from 'xterm';
export interface ILoadedAddon {
    instance: ITerminalAddon;
    dispose: () => void;
    isDisposed: boolean;
}
export declare class AddonManager implements IDisposable {
    protected _addons: ILoadedAddon[];
    constructor();
    dispose(): void;
    loadAddon(terminal: Terminal, instance: ITerminalAddon): void;
    private _wrappedAddonDispose;
}
//# sourceMappingURL=AddonManager.d.ts.map
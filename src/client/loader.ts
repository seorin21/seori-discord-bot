import {CLIENT} from "./index.js";

class _ClientLoader {
    private _client: CLIENT;

    private constructor() {
        this._client = new CLIENT();
    }

    private static _instance: _ClientLoader | null = null;

    public static get instance(): _ClientLoader {
        if (!_ClientLoader._instance) {
            _ClientLoader._instance = new _ClientLoader();
        }

        return _ClientLoader._instance;
    }

    public get _(): CLIENT {
        return this._client;
    }

    public static async getInstance(): Promise<_ClientLoader> {
        if (!_ClientLoader._instance) {
            _ClientLoader._instance = new _ClientLoader();
            await _ClientLoader._instance.initialize(); // 비동기 초기화
        }
        return _ClientLoader._instance;
    }

    // 비동기 초기화 로직 분리
    private async initialize(): Promise<void> {
        this._client = new CLIENT();
        // 필요한 경우 추가 비동기 작업 (예: this._client.connect())
    }
}

export const ClientLoader = await _ClientLoader.getInstance();
export default ClientLoader;
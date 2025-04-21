import {CLIENT} from "./index.js";

class ClientLoader {
    private static instance: ClientLoader | null = null;
    private readonly _client: CLIENT;

    private constructor() {
        this._client = new CLIENT();
    }

    public get client(): CLIENT {
        return this._client;
    }

    public static async getInstance(): Promise<ClientLoader> {
        if (!ClientLoader.instance) {
            ClientLoader.instance = new ClientLoader();
        }

        return ClientLoader.instance;
    }
}

export const loader = await ClientLoader.getInstance();
export default loader;
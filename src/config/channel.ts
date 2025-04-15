import {Channel} from "discord.js";

export default class DiscordChannel<T extends Channel> {
    public readonly channelId: string;

    constructor(channelId: string) {
        this.channelId = channelId;
    }

    // get channel(): T {
    //     ClientLoader
    // }
}
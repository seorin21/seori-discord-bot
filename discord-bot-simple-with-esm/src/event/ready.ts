import {Client, Events} from "discord.js";
import DiscordEvent from "./index.js";

export default class Ready extends DiscordEvent {
    name = Events.ClientReady.toString();
    once = true;

    async execute(client: Client): Promise<void> {
        console.log(`Ready! Logged in as ${client.user?.tag}`);
    }
}
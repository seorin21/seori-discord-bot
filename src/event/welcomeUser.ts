import {Events, GuildMember} from "discord.js";
import DiscordEvent from "./index.js";

export default class WelcomeUser extends DiscordEvent {
    name = Events.GuildMemberAdd.toString();
    once = false;

    async execute(member: GuildMember): Promise<void> {
        const channel = member.guild.systemChannel;
        if (channel) {
            await channel.send(`Welcome to the server, ${member}!`);
        }
    }
}
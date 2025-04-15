import {Events, GuildMember} from "discord.js";

export default class WelcomeUser extends Event {
    name = Events.GuildMemberAdd.toString();
    once = false;

    async execute(member: GuildMember): Promise<void> {
        const channel = member.guild.systemChannel;
        if (channel) {
            channel.id
            await channel.send(`Welcome to the server, ${member}!`);
        }
    }
}
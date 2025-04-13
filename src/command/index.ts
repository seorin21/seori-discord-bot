import {CommandInteraction, SlashCommandBuilder} from "discord.js";

export default abstract class Command {
    abstract data: SlashCommandBuilder;
    abstract execute(interaction: CommandInteraction): Promise<void>;

    public readonly isDeferReply: Boolean = true
    public readonly isEphemeral: Boolean = true
}
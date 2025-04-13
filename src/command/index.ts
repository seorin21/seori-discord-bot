import {ChatInputCommandInteraction, SlashCommandBuilder} from "discord.js";

export default abstract class ChatCommand {
    abstract data: SlashCommandBuilder;
    abstract execute(interaction: ChatInputCommandInteraction): Promise<void>;

    public readonly isDeferReply: Boolean = true
    public readonly isEphemeral: Boolean = true
}
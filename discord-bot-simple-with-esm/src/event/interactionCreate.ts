import {Events, Interaction, MessageFlagsBitField} from "discord.js";
import {CLIENT} from "../client/index.js";
import DiscordEvent from "./index.js";

export default class InteractionCreate extends DiscordEvent {
    name = Events.InteractionCreate.toString();
    once = false;

    async execute(interaction: Interaction): Promise<void> {
        if (!interaction.isChatInputCommand()) return;

        const CLIENT = interaction.client as CLIENT
        const command = CLIENT.commands.get(interaction.commandName);
        if (!command) {
            await interaction.reply({content: "Command not found", flags: MessageFlagsBitField.Flags.Ephemeral});
            return;
        }

        try {
            if (command.isDeferReply) {
                await interaction.deferReply({flags: command.isEphemeral ? MessageFlagsBitField.Flags.Ephemeral : undefined});
            }

            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({
                content: "There was an error while executing this command!",
                flags: MessageFlagsBitField.Flags.Ephemeral
            });
        }
    }
}
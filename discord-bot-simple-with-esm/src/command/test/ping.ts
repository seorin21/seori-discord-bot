import ChatCommand from "../index.js";
import {ChatInputCommandInteraction, SlashCommandBuilder} from "discord.js";

export default class Ping extends ChatCommand {
    data = new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Ping Pong!"); // 멍청했다 .toJson 하고 안 된다고 생각하고 있었어 ㅋㅋ
    isDeferReply = false
    isEphemeral = false // 만일 isReferReply 가 true 라면, isPublic 이 그제서야 영향 받는다. 현상태는 아무 의미가 없다!

    async execute(interaction: ChatInputCommandInteraction): Promise<void> {
        if (this.isDeferReply) {
            await interaction.editReply("Pong!"); // 타임아웃 오류 잠재적 발생 블럭. 무조건 답장은 editReply로
        } else {
            await interaction.reply("Pong!"); // 타임아웃 오류가 절대 안 나는 명령어라면 reply. CommandExecutor 에서 deferReply 안 함!
        }
    }
}
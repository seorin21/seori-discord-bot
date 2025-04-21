import {Client, Collection, IntentsBitField, REST} from "discord.js";
import {Routes} from 'discord-api-types/rest/v10';
import {readdir} from "fs/promises";
import path from "path";
import {fileURLToPath} from "url";
import ChatCommand from "../command/index.js";
import config from "../config/bot.json" with {type: "json"};
import DiscordEvent from "../event/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CommandPath = path.join(__dirname, '..', 'command');
const EventPath = path.join(__dirname, '..', 'event');

export class CLIENT extends Client {
    readonly commands: Collection<string, ChatCommand> = new Collection();

    constructor() {
        super({
            intents: [
                IntentsBitField.Flags.Guilds,
                IntentsBitField.Flags.GuildMessages,
                IntentsBitField.Flags.MessageContent,
                IntentsBitField.Flags.GuildMembers
            ]
        });
    }

    async start() {
        await this.initialize();
        await this.login(config.token);
    }

    async stop() {
        await this.destroy();
    }

    private async initialize() {
        await this.initCommands();
        await this.registerCommands();
        await this.initEvents();
    }

    private async initCommands() {
        const commandFolders = (await readdir(CommandPath)).filter(folder => !folder.endsWith('.ts') && !folder.endsWith('.js'));

        for (const folder of commandFolders) {
            const commandFiles = (await readdir(path.join(CommandPath, folder))).filter(file => file.endsWith('.ts') || file.endsWith('.js'));

            for (const file of commandFiles) {
                try {
                    const filePath = path.join(CommandPath, folder, file);
                    const module = await import(new URL(`file://${filePath}`).href);

                    const command = new module.default() as ChatCommand;
                    this.commands.set(command.data.name, command);
                } catch (error) {
                    console.error(`[Command Loader] Error loading ${file}:`, error);
                    console.log(`올바르지 않은 파일 ${file}은 무시되었습니다. 해당 위치는 ChatCommand 타입만 가능합니다!`);
                }
            }
        }
    }

    private async registerCommands() {
        try {
            const commandDatas = this.commands.map(command => command.data.toJSON());
            const rest = new REST({version: '10'}).setToken(config.token);

            await rest.put(
                config.guildId === ""
                    ? Routes.applicationCommands(config.clientId)
                    : Routes.applicationGuildCommands(config.clientId, config.guildId),
                {body: commandDatas}
            );

            console.log(`총 ${commandDatas.length}개의 명령어를 등록했습니다.`);
        } catch (error) {
            console.error('[Command Registration Error]:', error);
        }
    }

    private async initEvents() {
        const eventFiles = (await readdir(EventPath)).filter(file => (file.endsWith('.ts') || file.endsWith('.js')) && file !== 'index.ts' && file !== 'index.js');

        for (const file of eventFiles) {
            try {
                const filePath = path.join(EventPath, file);
                const module = await import(new URL(`file://${filePath}`).href);

                const event = new module.default() as DiscordEvent;
                const executor = (...args: any[]) => {
                    try {
                        event.execute(...args);
                    } catch (error) {
                        console.error(`[Event Execution Error] ${event.name}:`, error);
                    }
                };

                event.once
                    ? this.once(event.name, executor)
                    : this.on(event.name, executor);
            } catch (error) {
                console.error(`[Event Loader] Error loading ${file}:`, error);
                console.log(`올바르지 않은 파일 ${file}은 무시되었습니다. 해당 위치는 Event 타입만 가능합니다!`);
            }
        }
    }
}

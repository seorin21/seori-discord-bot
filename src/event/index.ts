export default abstract class DiscordEvent {
    abstract name: string;
    public once: Boolean = false;

    abstract execute(...args: any[]): Promise<void>;
}
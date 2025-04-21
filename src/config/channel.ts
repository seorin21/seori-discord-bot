// import {Channel} from "discord.js";
// import loader from "../client/loader";
//
// export default class DiscordChannel<T extends Channel> {
//     public readonly channelId: string;
//
//     constructor(channelId: string) {
//         this.channelId = channelId;
//     }
//
//     get channel(): T | undefined {
//         const channels = loader._.guild?.channels;
//         if (!channels) {
//             return undefined;
//         }
//
//         const channel = channels.cache.get(this.channelId);
//         if (channel) {
//             try {
//                 return channel as T;
//             } catch (e) {
//                 // 에러 로그 들어갈 예정. Log - Server
//             }
//         } else {
//             // 나중에 then 부분에 로그 찍기
//             channels?.fetch(this.channelId).then(c => {
//             });
//         }
//
//         return undefined;
//     }
// }
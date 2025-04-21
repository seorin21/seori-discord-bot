// import type {Teams} from "./teams";
// import loader from "../client/loader";
// import {Role} from "discord.js";
//
// export default class Team<T extends Teams> {
//     public readonly roleId: string;
//
//     constructor(roleId: string) {
//         this.roleId = roleId;
//     }
//
//     get role(): Role | undefined {
//         const roles = loader.client.guild?.roles;
//
//         let role = roles?.cache.get(this.roleId);
//         if (!role) {
//             // 나중에 then 부분에 로그 찍기
//             roles?.fetch(this.roleId).then(r => {
//             });
//         }
//
//         try {
//             return role as Role;
//         } catch (e) {
//             // 에러 로그 들어갈 예정. Log - Server
//         }
//
//         return undefined;
//     }
// }
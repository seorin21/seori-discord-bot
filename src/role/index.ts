// import {RoleConfig, RoleManagerConfig} from "./config";
// import wcwidth from "wcwidth";
// import ClientLoader from "../client/loader";
// import {CLIENT} from "../client";
//
// export class _RoleManager {
//     private static instance: _RoleManager | null = null;
//     private client: CLIENT = ClientLoader._;
//     private config = RoleManagerConfig;
//     private positions: string[][] = []
//     private contours: string[] = []
//
//     private constructor() {
//         this.client.getGuild().then((guild) => {
//             guild.roles.fetch().then(r => {
//                 const roles = r.sort((a, b) => a.position - b.position);
//
//
//                 roles.forEach(role => {
//                     const {name, id, position, color} = role;
//
//
//                     if (this.config.isContour(name)) {
//                     }
//                 })
//             })
//         })
//     }
//
//     public static getInstance(): _RoleManager {
//         if (!_RoleManager.instance) {
//             _RoleManager.instance = new _RoleManager();
//         }
//
//         return _RoleManager.instance;
//     }
//
//     public async createRole(rconfig: RoleConfig): Promise<boolean> {
//         if (rconfig.roleId) {
//             return false
//         }
//
//         this.client.guild?.roles.create({})
//
//         return true
//     }
//
//     private createContour(str: string): string {
//         const width = getWidth(` ${str} `);
//         if (width < this.config.width * 2) {
//             return str;
//         }
//
//         const sep = Math.floor((this.config.width - width) / getWidth(this.config.contour));
//         const contour = this.config.contour;
//
//         return `${contour.repeat(sep)} ${str} ${contour.repeat(sep)}`;
//     }
// }
//
// function getWidth(str: string): number {
//     return [...str].reduce((i, s) => i + Math.max(wcwidth(s), 0), 0);
// }
//
// export const RoleManager = _RoleManager.getInstance();
// export default RoleManager;
// import {existsSync, readFileSync, writeFileSync} from "fs";
// import * as path from "path";
//
// const RoleConfigPath = path.join(__dirname, "..", "config", "role");
// type RoleConfigJSON = { name: string, position: number, roleId: string | undefined, color: string }
//
// class RoleConfig {
//     public position = 0;
//
//     constructor(roleId?: string) {
//         if (roleId) {
//             this.roleId = roleId;
//             this.load();
//         }
//
//         //this.toJSON()
//     }
//
//     private _name = "empty";
//
//     get name(): string {
//         return this._name;
//     }
//
//     set name(name: string) {
//         if (name.length > 100) {
//             throw new Error("역할 이름이 너무 길어요.");
//         }
//
//         if (RoleManagerConfig.isContour(name)) {
//             throw new Error(`"${RoleManagerConfig.contour}"은 구분선으로 사용되고 있어요.`)
//         }
//
//         this._name = name;
//     }
//
//     //public roleId: string = "";
//     private _roleId: string | undefined;
//
//     get roleId(): string | undefined {
//         return this._roleId;
//     }
//
//     set roleId(roleId: string | undefined) {
//         if (!roleId || !isRoleId(roleId)) {
//             throw new Error("역할 ID가 올바르지 않아요.");
//         }
//
//         this._roleId = roleId;
//     }
//
//     private _color = "#ffffff";
//
//     get color(): string {
//         return this._color;
//     }
//
//     set color(color: string) {
//         if (!isHexColor(color)) {
//             throw new Error("색상 코드가 올바르지 않아요.");
//         }
//
//         this._color = color;
//     }
//
//     get JSON(): RoleConfigJSON {
//         return {
//             name: this.name,
//             position: this.position,
//             roleId: this.roleId,
//             color: this.color
//         };
//     }
//
//     set JSON(value: string | number | RoleConfigJSON) {
//         if (typeof value === "string") {
//             if (isRoleId(value)) {
//                 this.roleId = value;
//             } else if (isHexColor(value)) {
//                 this.color = value;
//             } else {
//                 this.name = value;
//             }
//         } else if (typeof value === "number") {
//             this.position = value;
//         } else {
//             this.name = value.name;
//             this.position = value.position;
//             this.roleId = value.roleId;
//             this.color = value.color;
//         }
//     }
//
//     public static create(roleId: string): RoleConfig {
//         const _roleConfig = new RoleConfig(roleId);
//         _roleConfig.load();
//
//         return _roleConfig;
//     }
//
//     public isValid(): boolean {
//         if (!this.roleId) {
//             return false;
//         }
//
//         if (this.name.length > 100 || this.name == "") {
//             return false;
//         }
//
//         if (!isHexColor(this.color)) {
//             return false;
//         }
//
//         return this.position >= 0;
//     }
//
//     public load() {
//         try {
//             if (this.roleId && existsSync(RoleConfigPath)) {
//                 this.JSON = JSON.parse(readFileSync(path.join(RoleConfigPath, this.roleId), {encoding: "utf-8"})) as RoleConfigJSON;
//             }
//         } catch (error) {
//             // 에러 로그 들어갈 예정. Log - Server
//         }
//     }
// }
//
// function isRoleId(str: string): boolean {
//     return /^[0-9]{17,19}$/.test(str);
// }
//
// function isHexColor(str: string): boolean {
//     return /^#[0-9A-F]{6}$/i.test(str);
// }
//
// const RoleManagerConfigPath = path.join(__dirname, "..", "config", "role_manager.json");
// type RoleManagerConfigJSON = { width: number, contour: string }
//
// class _RoleManagerConfig {
//     private constructor() {
//         this.load();
//     }
//
//     private static _instance: _RoleManagerConfig | null = null;
//
//     public static get instance(): _RoleManagerConfig {
//         if (!_RoleManagerConfig._instance) {
//             _RoleManagerConfig._instance = new _RoleManagerConfig();
//         }
//
//         return _RoleManagerConfig._instance;
//     }
//
//     private _width = 25;
//
//     get width(): number {
//         return this._width;
//     }
//
//     set width(value: number) {
//         if (value < 0) {
//             throw new Error("너비는 0보다 작을 수 없어요.");
//         }
//
//         this._width = value;
//         this.save();
//     }
//
//     private _contour = "=";
//
//     get contour(): string {
//         return this._contour;
//     }
//
//     set contour(value: string) {
//         if (value.length != 1) {
//             throw new Error("구분선의 길이가 1이 아니에요.");
//         }
//
//         if (value == " ") {
//             throw new Error("구분선은 공백일 수 없어요.");
//         }
//
//         this._contour = value;
//         this.save();
//     }
//
//     private get JSON(): RoleManagerConfigJSON {
//         return {
//             width: this.width,
//             contour: this.contour
//         }
//     }
//
//     private set JSON(value: number | string | RoleManagerConfigJSON) {
//         if (typeof value === "number") {
//             this.width = value;
//         } else if (typeof value === "string") {
//             this.contour = value;
//         } else {
//             this.width = value.width;
//             this.contour = value.contour;
//         }
//     }
//
//     public isContour(str: string): boolean {
//         return str.includes(this.contour);
//     }
//
//     private save() {
//         writeFileSync(RoleManagerConfigPath, JSON.stringify(this.JSON, null, 4), {encoding: "utf-8"});
//     }
//
//     private load() {
//         try {
//             if (existsSync(RoleManagerConfigPath)) {
//                 this.JSON = JSON.parse(readFileSync(RoleManagerConfigPath, {encoding: "utf-8"})) as RoleManagerConfigJSON;
//             }
//         } catch (error) {
//         }
//     }
// }
//
// export const RoleManagerConfig = _RoleManagerConfig.instance;
// export {RoleConfig}
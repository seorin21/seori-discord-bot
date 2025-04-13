import {CLIENT} from "./client";

const client = new CLIENT()
client.start().then(_ => console.log("Clear?"))
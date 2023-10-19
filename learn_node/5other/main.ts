import { log } from "console";
import process from "process";
import dotenv from 'dotenv'
/**
 * 通过cli传递env
 *     USER_ID=12528174 node main
*/
log(process.env.USER_ID)

/**
 * 通过dotenv + .env文件进行传递
*/
dotenv.config()
log(process.env.USER_ID)
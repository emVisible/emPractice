
import { Express } from "express";
import response from "./response";
import restInit from "./rest";
import restful from "./restful";
export default function registRoutes(app: Express) {
  const routes = [response, restInit, restful]
  routes.forEach((item) => {
    item(app)
  })
}
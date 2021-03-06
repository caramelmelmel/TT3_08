import express from "express";
import cors from "cors";
import UserName from "../Routes/LoginRouter";

const server = express();
server.use(express.json());

server.use(cors());

server.use("/api/v1/Login", UserName());

export default server;

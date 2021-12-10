import express from "express";
import bodyParser from "body-parser";
import m from "mongoose";
import dot from "dotenv";
import fs from "fs";
import appSrc from "./app.js";
import headers from "./headers.js";
import UserModel from "./models/User.js";

const User = UserModel(m);
const app = appSrc(express, bodyParser, fs, headers, User, m);

app.listen(process.env.PORT ?? 4321);

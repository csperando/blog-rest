import express from "express";

const app = express();

import router from "./routes";
router(app);

export default app;

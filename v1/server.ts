import app from "./app";

const server = app.listen(3000, () => {
    console.log("server up");
});

export default server;

const express = require("express");
const connectDB = require("./src/config/connectDB");
const userModel = require("./src/models/userModel");
const cookieParser = require("cookie-parser");
const authRouter = require("./src/routes/authRoute");
const profileRouter = require("./src/routes/profileRoute");
const requestRouter = require("./src/routes/requestRouter");
const userRouter = require("./src/routes/userRoute");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:[process.env.FRONTEND_URL , "http://localhost:5173"],
    credentials:true
}));

app.get("/", (req, res) => {
    res.send("response!!");
});

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);



app.delete("/delete", async (req, res) => {
    try {
        const user = await userModel.findOneAndDelete(req.body.email);

        res.send("User deleted sucessfully!!!");

    } catch (error) {
        res.status(400).send("Error saving user..")
    }
});



//Database connection
connectDB()
    .then(() => {
        console.log("Database connection established...");
        app.listen(3000, () => {
            console.log("server is runnin on 3000 port...");
        });
    })
    .catch((error) => {
        console.log("Database cannot connected...");
    })


const express = require ('express');
const cors = require("cors");
// const {isLoggedIn} = require ('./middleswares')
const userRouter = require ('./routes/user.js');
const taskRouter = require ('./routes/task.js')

//Connect Database here
const app = express();
const PORT = 8000;

//Connect Frontend and Backend port here
app.use(cors());

//Middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json());


//Routes
app.use("/", userRouter);
app.use("/", taskRouter)

app.listen(PORT, () => console.log(`Server started at port: ${PORT}`))
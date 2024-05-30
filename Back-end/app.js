const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dbConnect = require('./config/dbConnect');
const { Server } = require("socket.io");
require('dotenv/config');
const http = require("http");
//................................................................
//Database
dbConnect()
//................................................................

const allowedOrigins = ['https://the-peak-fiction-version-2.vercel.app'];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'NovelCovers')));

//................................................................

const userRoute = require('./route/userRoute');
const adminRoute = require('./route/adminRoute');
const authorRoute = require('./route/authorRoute');

//Routes...........................................................

app.use('/', userRoute);
app.use('/admin', adminRoute);
app.use('/author', authorRoute);

//................................................................

app.use(express.json());

//................................................................


const server = http.createServer(app);

//................................................................

const io = new Server(server, {
    pingTimeout: 60000,
    cors: {
        origin: "https://the-peak-fiction-version-2.vercel.app",
        methods: ["GET", "POST"],
    },
});

// Socket connection logic 
io.on("connection", (socket) => {
    console.log('connect')
    socket.on("join_room", (room) => {
        console.log('joined Chat - ', room);
        socket.join(room);
    });

    // sending new message through socket io
    socket.on("send_message", (data) => {
        const { novelId } = data;
        console.log("message received - ", data);
        socket.to(novelId).emit("Message_received", data);

    });

    // handling disconnect function
    socket.on("disconnect", () => {
        console.log("Disconnected:", socket.id);
    });

});

//................................................................
server.listen(4000, () => {
    console.log("server started at port 4000");
});  
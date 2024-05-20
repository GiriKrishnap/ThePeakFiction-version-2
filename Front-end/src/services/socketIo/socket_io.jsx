import io from "socket.io-client";

const initializeSocket = () => {
    const socket = io.connect("https://thepeakfiction.shop");
    return socket;
};

export { initializeSocket };
const io = require("socket.io")();
const socketApi = {
    io,
};

io.on("connection", (socket) => {
    console.log("A user connected");
    socket.on('chat message', (msg) => {
        console.log(msg);

        data =
            [
                {
                    pesan: msg,
                    ip: socket.request.connection.remoteAddress,
                },
                {
                    pesan: socket.handshake.headers['user-agent'],
                    ip: socket.request.connection.remoteAddress,
                },
            ]

        io.emit('chat message', data);
    })
});

module.exports = socketApi;
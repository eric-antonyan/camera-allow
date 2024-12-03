import React, { useEffect, useState } from 'react'
import QRCode from 'react-qr-code'
import io from 'socket.io-client'
import Example from './Scan';

const socket = io("http://localhost:3001");

const App = () => {
    // State to store socket id
    const [socketId, setSocketId] = useState(null);

    // Effect hook to handle socket connection
    useEffect(() => {
        // Wait until the socket is connected and then get the socket id
        socket.on('connect', () => {
            setSocketId(socket.id);  // Set the socket id when the socket connects
        });

        socket.emit("events", "Welcome to server!")

        // Clean up the socket connection when the component unmounts
        return () => {
            socket.off('connect');
        };
    }, []); // Empty dependency array ensures this runs only once

    // Render the QR code only when socketId is available
    return (
        <Example />
    );
};

export default App;

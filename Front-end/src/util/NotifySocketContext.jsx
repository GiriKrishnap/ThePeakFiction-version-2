import { createContext, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import io from 'socket.io-client';
//.............................................................................

const SocketContext = createContext(null);

//.............................................................................

export const useSocket = () => useContext(SocketContext);

//.............................................................................

export const SocketProvider = ({ children }) => {

    //.............................................................................

    const [socket, setSocket] = useState(null);

    //.............................................................................

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user-login'));
        if (user) {
            // Initialize socket connection
            const newSocket = io('https://thepeakfiction.shop');

            // Set socket instance in state
            setSocket(newSocket);

            // Clean up: Disconnect socket when component unmounts
            return () => {
                newSocket.disconnect();
            };
        }
    }, []);

    //.............................................................................

    useEffect(() => {
        if (socket) {
            // Subscribe to "notification_received" event
            socket.on('notification_received', (data) => {
                toast.success(data, { icon: '😼🚀' });
            });

            // Emit "join_notification" event if user is author
            const user = JSON.parse(localStorage.getItem('user-login'));
            if (user && user.isAuthor) {
                socket.emit('join_notification', user.id);
            }

            // Clean up: Unsubscribe from "notification_received" event
            return () => {
                socket.off('notification_received');
            };
        }
    }, [socket]);

    //.............................................................................

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

//.............................................................................



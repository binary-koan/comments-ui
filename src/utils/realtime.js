import {io} from 'socket.io-client';

function setupRealtimeSocket({siteUrl, postId, onCommentCountUpdate, socketIO = io}) {
    const socket = socketIO(siteUrl);

    socket.emit('members/comments/counts:listen', {
        ids: [postId]
    });

    socket.on('members/comments/counts:update', ({counts}) => {
        onCommentCountUpdate?.(counts[postId]);
    });

    return socket;
}

export default setupRealtimeSocket;

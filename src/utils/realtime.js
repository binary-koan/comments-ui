import {io} from 'socket.io-client';

function setupRealtimeSocket({siteUrl = window.location.origin, postId, onCommentCountUpdate}) {
    const socket = io(siteUrl);

    socket.emit('members/comments/counts:listen', {
        ids: [postId]
    });

    socket.on('members/comments/counts:update', ({counts}) => {
        onCommentCountUpdate(counts[this.state.postId]);
    });

    return socket;
}

export default setupRealtimeSocket;

import setupRealtimeSocket from './realtime';

const mockSocketIO = () => ({
    emit: jest.fn(),
    on: jest.fn()
});

test('should listen for count to be updated', () => {
    const socketIO = mockSocketIO();

    setupRealtimeSocket({
        socketIO: () => socketIO,
        postId: 'my-post-id'
    });

    expect(socketIO.emit).toHaveBeenCalledTimes(1);
    expect(socketIO.emit).toHaveBeenCalledWith('members/comments/counts:listen', {
        ids: ['my-post-id']
    });
});

test('should call the provided callback when count is updated', (done) => {
    const socketIO = mockSocketIO();

    setupRealtimeSocket({
        socketIO: () => socketIO,
        postId: 'my-post-id',
        onCommentCountUpdate: (commentCount) => {
            expect(commentCount).toEqual(5);
            done();
        }
    });

    expect(socketIO.on).toHaveBeenCalledTimes(1);
    expect(socketIO.on).toHaveBeenCalledWith('members/comments/counts:update', expect.any(Function));

    const [, onCommentCountUpdate] = socketIO.on.mock.calls[0];

    onCommentCountUpdate({
        counts: {'my-post-id': 5}
    });
});

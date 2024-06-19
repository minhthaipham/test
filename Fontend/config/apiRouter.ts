export const apiRouter = {
    // auth request
    login: '/auth/login',
    register: '/auth/register',
    loginByToken: '/auth/loginByToken',

    // user request
    searchUser : '/auth/search',
    getUserById : '/auth/user',
    editUser : '/auth/editUser',
    followUser : '/auth/follow',
    unFollowUser : '/auth/unFollow',
    userCanKnow : '/auth/userNotMe',
    // post request
    getPost : '/post',
    createPost : '/post',
    getPostByIdUser : '/post/getPostByIdUser',
    editPost : '/post/editPost',
    deletePost : '/post/deletePost',
    likePost : '/post/likePost',
    video : '/video/upload',
    getVideo : '/video/getVideo',

    // comment request
    getComment : '/comment/getComment',
    createComment : '/comment/createComment',
    replyComment : '/comment/replyComment',
    likeComment : '/comment/likeComment',
    editComment : '/comment/editComment',
    deleteComment : '/comment/deleteComment',

    // chat request
    getUser : '/chat/user',
    listChatOfUser : '/chat',
    getChat : '/chat/getChat',
    createChat : '/chat',

    // group request
    createGroup : '/chat/create',
    reNameGroup : '/chat/rename',
    addMember : '/chat/add',
    removeMember : '/chat/remove',
    deleteGroup : '/chat/delete',
    searchAddMember : '/chat/get!Group',
    leaveGroup : '/chat/leave',
    
    // message request
    getMessage : '/message/getMessages',
    createMessage : '/message/sendMessage',
};
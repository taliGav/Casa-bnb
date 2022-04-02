import { msgService } from '../../services/msg-service'

export default {
    state: {
        msgs: [],
        chats: [],
        curChatIdx: 0,
    },
    getters: {
        msgs(state) {
            return state.msgs
        },
        chats(state) {
            return state.chats
        },
        chat(state) {
            return state.chats[state.curChatIdx]
        },
        curChatIdx(state) {
            return state.curChatIdx
        }
    },
    mutations: {
        setMsgs(state, { msgs }) {
            state.msgs = msgs
        },
        setChats(state, { chats }) {
            state.chats = chats
        },
        setChat(state, { chat }) {
            state.chats[state.curChatIdx] = chat
        },
        setCurChat(state, { topic }) {
            state.curChatIdx = state.chats.findIndex(ch => ch.topic === topic)
        },
        addMsg(state, { msg }) {
            state.chats[state.curChatIdx].msgs.push(msg)
        },
        saveMsg(state, { msg, topic }) {
            console.log('store save!!!:', msg, topic);
            const chatIdx = state.chats.findIndex(ch => ch.topic === topic)
            const msgIdx = state.chats[chatIdx].msgs.findIndex(m => m._id === msg._id)
            console.log('store saveMsg idx!!!!!!', msgIdx);
            if (msgIdx === -1) {
                state.chats[chatIdx].msgs.push(msg);
            }
            // console.log('store msgs!!!!!!!!!', state.chats[idx].msgs);
        },
    },
    actions: {
        async getMsgs({ commit }, { filterBy }) {
            try {
                const msgs = await msgService.query(filterBy)
                commit({ type: 'setMsgs', msgs })
                return msgs
            } catch (err) {
                console.log('err :>> ', err)
            }
        },
        async addMsg({ commit }, { msg, topic }) {
            try {
                const addedMsg = await msgService.addMsg(msg, topic)
                console.log('store add msg:', addedMsg);
                commit({ type: 'saveMsg', msg: addedMsg, topic: topic })
                return addedMsg;
            } catch (err) {
                console.log('err :>> ', err)
            }
        },
        async getChat({ commit }, { topic }) {
            try {
                const chat = await msgService.getChat(topic);
                return chat;
            } catch (err) {
                console.log('err :>> ', err)
            }
        },
        async getAllChat({ commit }, { userId }) {
            try {
                const chats = await msgService.query(userId);
                commit({ type: 'setChats', chats: chats })
                return chats;
            } catch (err) {
                console.log('err :>> ', err)
            }
        },
        async setCurChat({ commit }, { topic }) {
            try {
                commit({ type: 'setCurChat', topic: topic })
                return topic;
            } catch (err) {
                console.log('err :>> ', err)
            }
        },
        async lastSeen({ commit }, { userId, topic }) {
            try {
                const chat = await msgService.updateLastSeen(userId, topic)
                console.log('store got updates chat:', chat);
                commit({ type: 'setChat', chat: chat })
                return chat;
            } catch (err) {
                console.log('err :>> ', err)
            }
        },
    },
}

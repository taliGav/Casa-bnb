import { msgService } from '../../services/msg-service'

export default {
    state: {
        msgs: [],
        chats:[],
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
        setCurChat(state, { topic }) {
            state.curChatIdx = state.chats.findIndex(ch => ch.topic === topic)
        },
        addMsg(state, { msg }) {
            state.chats[state.curChatIdx].msgs.push(msg)
        },
        saveMsg(state, { msg }) {
            state.chats[state.curChatIdx].msgs.push(msg);
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
                console.log('store add msg:',addedMsg);
                commit({ type: 'saveMsg', msg: addedMsg })
                return addedMsg;
            } catch (err) {
                console.log('err :>> ', err)
            }
        },
        async getChat({ commit }, { topic }) {
            try {
                const chat = await msgService.getChat(topic);
                return chat ;
            } catch (err) {
                console.log('err :>> ', err)
            }
        },
        async getAllChat({ commit }, { userId }) {
            try {
                const chats = await msgService.query(userId);
                commit({ type: 'setChats', chats: chats })
                return chats ;
            } catch (err) {
                console.log('err :>> ', err)
            }
        },
        async setCurChat({ commit }, { topic }) {
            try {
                commit({ type: 'setCurChat', topic: topic })
                return topic ;
            } catch (err) {
                console.log('err :>> ', err)
            }
        },
    },
}

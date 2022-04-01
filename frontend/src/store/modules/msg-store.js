import { msgService } from '../../services/msg-service'

export default {
    state: {
        msgs: [],
    },
    getters: {
        msgs(state) {
            return state.msgs
        },
    },
    mutations: {
        setMsgs(state, { msgs }) {
            state.msgs = msgs
        },
        addMsg(state, { msg }) {
            state.msgs.push(msg)
        },
        saveMsg(state, { msg }) {
            state.msgs.push(msg);
            // const idx = state.msgs.findIndex((o) => o._id === msg._id);
            // if (idx !== -1) state.msgs.splice(idx, 1, msg);
            // else state.msgs.push(msg);
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
        async addMsg({ commit }, { msg }) {
            try {
                const addedMsg = await msgService.addMsg(msg)
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
    },
}

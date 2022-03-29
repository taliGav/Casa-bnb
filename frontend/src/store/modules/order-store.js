import { orderService } from '../../services/order-service'

export default {
    state: {
        orders: [],
    },
    getters: {
        orders(state) {
            return state.orders
        },
    },
    mutations: {
        setOrders(state, { orders }) {
            state.orders = orders
            console.log(state.orders);
        },
        addOrder(state, { order }) {
            state.orders.push(order)
        },
        saveOrder(state, { order }) {
            console.log('store', order);
            const idx = state.orders.findIndex((o) => o._id === order._id);
            console.log('store', idx);
            if (idx !== -1) state.orders.splice(idx, 1, order);
            else state.orders.push(order);
        },
        removeOrder(state, { orderId }) {
            const idx = state.orders.findIndex((order) => order._id === orderId)
            state.orders.splice(idx, 1)
        },
    },
    actions: {
        async getOrders({ commit }, { filterBy }) {
            console.log('order store filter:', filterBy);
            try {
                const orders = await orderService.query(filterBy)
                commit({ type: 'setOrders', orders })
                console.log(orders);
                return orders
            } catch (err) {
                console.log('err :>> ', err)
            }
        },
        async addOrder({ commit }, { order }) {
            console.log('order store disp:', order._id);
            try {
                // console.log('order store add 1');
                const addedOrder = await orderService.save(order)
                console.log('order store add 2', addedOrder._id);
                commit({ type: 'saveOrder', order: addedOrder })
                // console.log('order store add 3', addedOrder);
            } catch (err) {
                console.log('err :>> ', err)
            }
        },
        async removeOrder({ commit }, { orderId }) {
            try {
                await orderService.removeOrder(orderId)
                commit({ type: 'removeOrder', orderId })
            } catch (err) {
                console.log('err :>> ', err)
            }
        },
        // async getHostOrders(){

        // }
    },
}

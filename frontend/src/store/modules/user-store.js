import { userService } from '../../services/user-service';
import { utilService } from '../../services/util-service';

export default {
  state: {
    loggedinUser: utilService.loadFromSessionStorage('loged_user') || null,
    // isGuest: true,
  },
  getters: {
    user(state) {
      return state.loggedinUser;
    },
    guest(state) {
      return state.isGuest;
    },
  },
  mutations: {
    setUser(state, { user }) {
      state.loggedinUser = user;
      // state.isGuest = !state.isGuest;
    }

  },
  actions: {
    async login({ commit }, { cred }) {
      try {
        const user = await userService.login(cred)
        commit({ type: 'setUser', user })
        utilService.saveToSessionStorage('loged_user', user)
      } catch (err) {
        console.log(err);
      }
    },
    async signup({ commit }, { cred }) {
      try {
        const user = await userService.signup(cred);
        commit({ type: 'setUser', user });
      } catch (err) {
        console.log(err);
      }
    },
    async logout({ commit }) {
      try {
        await userService.logout();
        commit({ type: 'setUser', user: null });
        sessionStorage.removeItem('loged_user');
      } catch (err) {
        console.log(err);
      }
    },
  },
};

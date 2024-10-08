import ApiServices from "@/services/ApiServices";

const state = {
  user: null,
};

const getters = {
  isAuthenticated: (state) => !!state.user,
  user: (state) => state.user,
};

const actions = {
  login({ commit }, credentials) {
    return new Promise((resolve, reject) => {
      ApiServices.post("/login", credentials)
        .then((response) => {
          commit("setUser", response.data.user);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  logout({ commit }) {
    return new Promise((resolve) => {
      commit("clearUser");
      resolve();
    });
  },
};

const mutations = {
  setUser(state, user) {
    state.user = user;
  },
  clearUser(state) {
    state.user = null;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

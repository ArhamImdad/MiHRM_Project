import ApiServices from "@/services/ApiServices";

const state = {
  adminData: {},
};

const getters = {
  getAdminData: (state) => state.adminData,
};

const actions = {
  fetchAdminData({ commit }) {
    ApiServices.get("/admin-data").then((response) => {
      commit("setAdminData", response.data);
    });
  },
};

const mutations = {
  setAdminData(state, data) {
    state.adminData = data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

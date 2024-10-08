import ApiServices from "@/services/ApiServices";

const state = {
  adminData: {},
};

const getters = {
  getAdminData: (state) => state.adminData,
};

const actions = {
  async fetchAdminData({ commit }) {
    try {
      const response = await ApiServices.get("/admin-data");
      commit("setAdminData", response.data);
    } catch (error) {
      console.error("Error fetching admin data:", error);
    }
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

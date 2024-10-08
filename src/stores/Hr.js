import ApiServices from "@/services/ApiServices";

const state = {
  hrData: {},
};

const getters = {
  getHRData: (state) => state.hrData,
};

const actions = {
  async fetchHRData({ commit }) {
    try {
      const response = await ApiServices.get("/hr-data");
      commit("setHRData", response.data);
    } catch (error) {
      console.error("Error fetching HR data:", error); // Error handling
    }
  },

  async approveLeave({ commit }, leaveId) {
    try {
      const response = await ApiServices.post(`/leave/${leaveId}/approve`);
      return response; // Returning the response after success
    } catch (error) {
      throw error; // Rethrow the error so it can be handled by the caller
    }
  },
};

const mutations = {
  setHRData(state, data) {
    state.hrData = data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

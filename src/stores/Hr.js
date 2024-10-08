import ApiServices from "@/services/ApiServices";

const state = {
  hrData: {},
};

const getters = {
  getHRData: (state) => state.hrData,
};

const actions = {
  fetchHRData({ commit }) {
    ApiServices.get("/hr-data").then((response) => {
      commit("setHRData", response.data);
    });
  },
  approveLeave({ commit }, leaveId) {
    return new Promise((resolve, reject) => {
      ApiServices.post(`/leave/${leaveId}/approve`)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
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

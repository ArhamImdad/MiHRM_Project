import ApiServices from "@/services/ApiServices";

const state = {
  employees: [],
};

const getters = {
  allEmployees: (state) => state.employees,
};

const actions = {
  fetchEmployees({ commit }) {
    ApiServices.get("/employees").then((response) => {
      commit("setEmployees", response.data);
    });
  },
};

const mutations = {
  setEmployees(state, employees) {
    state.employees = employees;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

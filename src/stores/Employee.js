import ApiServices from "@/services/ApiServices";

const state = {
  employees: [],
};

const getters = {
  allEmployees: (state) => state.employees,
};

const actions = {
  async fetchEmployees({ commit }) {
    try {
      const response = await ApiServices.get("/employees");
      commit("setEmployees", response.data);
    } catch (error) {
      console.error("Error fetching employees:", error); // Handle the error properly
    }
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

const BASE_API_URL = process.env.BASE_API_URL || ""

export const state = () => ({
  products: [],
  product: {},
  employees: [],
  employee: {}
})

const mutations = {
  SET_PRODUCTS(state, productsArr) { state.products = productsArr},
  SET_PRODUCT(state, productObj) { state.product = productObj},
  SET_EMPLOYEES(state, employeeArr) { state.employees = employeeArr },
  SET_EMPLOYEE(state, employeeObj) { state.employee = employeeObj }
}

const actions = {
  async FETCH_PRODUCTS({ commit }) {
    await this.$axios.$get(URL('/products/all')) 
      .then(res => {
        commit("SET_PRODUCTS", res)
      })
      .catch(err => {
        console.log(err)
      })
  },
  async FETCH_PRODUCT({ commit }, lookupCode) {
    await this.$axios.$get(URL(`/product?lookup=${lookupCode}`))
      .then(res => {
        commit("SET_PRODUCT", res)
      })
      .catch(err => {
        console.log(err)
      })
  },
  async FETCH_EMPLOYEES({ commit }) {
    await this.$axios.$get(URL(`/employee/all`)) 
      .then(res => {
        commit("SET_EMPLOYEES", res)
      })
      .catch(err => {
        console.log(err)
      })
  },
  async FETCH_EMPLOYEE({ commit }, employeeId) {
    await this.$axios.$get(URL(`/employee?employeeid=${employeeId}`)) 
      .then(res => {
        commit("SET_EMPLOYEE", res)
      })
      .catch(err => {
        console.log(err)
      })
  },
  async nuxtServerInit({ dispatch, commit }, { req }) {
    await dispatch("FETCH_EMPLOYEES")
  }
}

const getters = {
  getProducts: (state) => { return state.products },
  getProduct: (state) => { return state.product },
  getEmployees: (state) => { return state.employees },
  getEmployee: (state) => { return state.employee }
}

function URL(uri) {
  return `${BASE_API_URL}${uri}`
}

export default {
  actions,
  mutations,
  getters
}




// @app.route('/api/v1/products/delete', methods=['POST'])
// @app.route('/api/v1/products/create', methods=['POST'])
// @app.route('/api/v1/products', methods=['GET'])

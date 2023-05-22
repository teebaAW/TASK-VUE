import { createStore } from 'vuex'
import data from '../data/test.json'

const store = createStore({
  state() {
    return {
      products: data.state.products,
      openCreateModal: false,
      openEditModal: false,
      openDetailsModal: false,
      openQuantityModal: false,

      editData: null,
      showData: null,
      quantityModalData: null,

      quotatiom: [],
      snackbarTwo: false
    }
  },
  getters: {
    products: (state) => state.products
  },
  mutations: {
    EDIT_PRODUCT(state, payload) {
      // i need id
      state.products.forEach((data, i) => {
        if (data.id == payload.id) {
          state.products[i] = payload
        }
      })
      console.log('j', state.products)
    }
  },
  actions: {
    ADD_NEW({ state }, payload) {
      state.products.push(payload)
    },
    DELETE_PRODUCT({ state }, payload) {
      state.products = state.products.filter((obj) => obj.name !== payload.name)
    },
    DELETE_QUOTATION({ state }, payload) {
      state.quotatiom = state.quotatiom.filter((obj) => obj.name !== payload.name)
      localStorage.setItem('quotation', JSON.stringify(state.quotatiom))
    },
    ADD_TO_QUOTATION({ state }, payload) {
      state.quotatiom.push({ ...payload })
      localStorage.setItem('quotation', JSON.stringify(state.quotatiom))
      state.snackbar = true
    },
    EDIT_PRODUCT({ commit }, payload, data) {
      console.log('payload', data)
      // commit('EDIT_PRODUCT', payload)
    }
  }
})

export default store

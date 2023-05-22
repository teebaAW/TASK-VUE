import { createStore } from 'vuex'
import data from '../data/test.json'

const store = createStore({
  state() {
    return {
      products: data.state.products, //used
      openModal: false, //used
      editModal: false, //used
      showModal: false, //used
      editData: null, //used
      showData: null, //used
      quotatiom: [],
      checked: false,
      snackbarTwo: false,
      quantityModal: false,
      quantityModalData: null
    }
  },
  getters: {
    products: (state) => state.products
  },
  mutations: {
    CHECKED_PRODUCTS(state, p) {
      console.log('p', p)
      state.products.forEach((e, i) => {
        if (e.id === p.id) {
          state.products[i] = p
        }
      })
    }
  },
  actions: {
    ADD_NEW({ state }, payload) {
      state.products.push(payload)
    },
    GET_PRODUCT({ state }, id) {
      var data = state.products.filter((i) => i.id == id)
      return data
    },
    DELETE_PRODUCT({ state }, payload) {
      console.log('payload ', payload)
      state.products = state.products.filter((obj) => obj.name !== payload.name)
    },
    DELETE_QUOTATION({ state }, payload) {
      console.log('before', state.quotatiom)
      state.quotatiom = state.quotatiom.filter((obj) => obj.name !== payload.name)
      console.log('after', state.quotatiom)
      localStorage.setItem('quotation', JSON.stringify(state.quotatiom))
    },
    ADD_TO_QUOTATION({ state }, payload) {
      const exists = state.quotatiom.find((p) => p.name === payload.name)
      if (exists) {
        console.log('already exists')
      }
      if (!exists) {
        state.quotatiom.push({ ...payload })
        localStorage.setItem('quotation', JSON.stringify(state.quotatiom))
        state.snackbar = true
      }
    }
  }
})

export default store

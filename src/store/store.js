import axios from 'axios'
import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      products: null,
      openModal: false,
      editModal: false,
      showModal: false,
      editData: null,
      showData: null,
      quotatiom: [],
      checked: false
    }
  },
  mutations: {
    getProducts(state) {
      axios
        .get('http://localhost:8000/state')
        .then((response) => {
          state.products = response.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
    deleteProduct(state, p) {
      axios
        .delete(`http://localhost:8000/state/${p}`)
        .then((res) => {
          console.log(res, 'Delete request successful')
          store.commit('getProducts')
        })
        .catch((err) => {
          console.log('Error deleting data:', err)
        })
    },
    checkedProducts(state, p) {
      axios
        .put(`http://localhost:8000/state/${p.id}`, p)
        .then((response) => {
          console.log('Update successful:', response.data)
        })
        .catch((error) => {
          console.log('Update failed:', error)
        })
    },
    unCheckedProducts(state, p) {
      axios
        .put(`http://localhost:8000/state/${p.id}`, p)
        .then((response) => {
          console.log('Update successful:', response.data)
        })
        .catch((error) => {
          console.log('Update failed:', error)
        })
    },
    addToQuotation(state, p) {
      state.quotatiom.push(p)
      console.log('state', state.quotatiom)
      localStorage.setItem('quotation', JSON.stringify(state.quotatiom))
    },
    removeFromQuotation(state, item) {
      state.quotatiom = state.quotatiom.filter((p) => {
        return item.id !== p.id
      })
      localStorage.setItem('quotation', JSON.stringify(state.quotatiom))
    }
  }
})

export default store

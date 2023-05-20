<script setup>
import store from '@/store/store'
</script>

<script>
import axios from 'axios'
import ProdEditModal from '../components/ProdEditModal.vue'
import CreateModal from '../components/CreateModal.vue'
import { mdiAccount, mdiDelete, mdiPencil, mdiShareVariant } from '@mdi/js'
import ShowDetails from '../components/ShowDetails.vue'

export default {
  components: { ShowDetails },
  mounted() {
    store.commit('getProducts')
  }
}

let checked
function deleteProd(p) {
  store.commit('deleteProduct', p.id)
}

function editProd(p) {
  store.state.editModal = true
  store.state.editData = p
}

function showProd(p) {
  store.state.showModal = true
  store.state.showData = p
}

function check(p) {
  console.log('checked', p.checked)

  if (!store.state.quotation) {
    store.state.quotation = []
  }
  if (p.checked == true) {
    p.checked = true
    store.commit('addToQuotation', p)
    store.commit('checkedProducts', p)
  } else {
    p.checked = false
    store.commit('removeFromQuotation', p)
    store.commit('unCheckedProducts', p)
  }
}

function addQuotation(p) {
  store.commit('addToQuotation', p)
}
function createModalFunc() {
  store.state.openModal = true
}
</script>

<template>
  <ProdEditModal />
  <CreateModal />
  <ShowDetails />
  <div class="home">
    <h1 class="home-text">Inventory Store</h1>
    <div class="create-btn"><v-btn @click="createModalFunc"> create item</v-btn></div>
    <div>
      <v-table class="custom-table">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Price</th>
            <th>Desc</th>
            <th>Basra Stock</th>
            <th>Baghdad Stock</th>
            <th>Erbil Stock</th>
            <th>Total Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in store.state.products" :key="p.id">
            <td>
              <input type="checkbox" id="checkbox" v-model="p.checked" @change="check(p)" />
            </td>
            <td class="truncate-description">{{ p.name }}</td>
            <td class="truncate-description">{{ p.price }}</td>
            <td class="truncate-description">{{ p.description }}</td>
            <td>{{ p.stock[0].quantity }}</td>
            <td>{{ p.stock[1].quantity }}</td>
            <td>{{ p.stock[2].quantity }}</td>
            <td>
              {{ p.stock[0].quantity + p.stock[1].quantity + p.stock[2].quantity }}
            </td>
            <td>
              <v-btn @click="deleteProd(p)" class="action-button"> Delete </v-btn>
              <v-btn @click="editProd(p)" class="action-button"> Edit </v-btn>
              <v-btn @click="showProd(p)" class="action-button"> Show </v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
    </div>
  </div>
</template>
<style scoped>
.custom-table {
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
  border: 2px solid #ccc;
  margin-bottom: 50px;
}
.create-btn {
  margin-right: 10px;
  display: flex;
  justify-content: end;
}
.home {
  margin-top: 50px;
}
.home-text {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}
.action-button {
  width: 70px;
  margin-right: 10px;
}
.truncate-description {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px; /* Adjust the width as needed */
}
</style>

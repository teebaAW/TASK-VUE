<script setup>
import store from '@/store/store'
</script>

<script>
import CreateModal from '../components/CreateModal.vue'
import UpdateModal from '../components/UpdateModal.vue'
import QuantityModal from '../components/QuantityModal.vue'
import ShowDetails from '../components/ShowDetails.vue'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {}
  },

  computed: {
    ...mapGetters({ products: 'products' })
  },
  methods: {
    createModalFunc() {
      store.state.openCreateModal = true
    },
    editProd(p) {
      store.state.openEditModal = true
      store.state.editData = p
    },
    deleteProd(p) {
      store.dispatch('DELETE_PRODUCT', p)
    },
    showProd(p) {
      store.state.openDetailsModal = true
      store.state.showData = p
      console.log('clicked')
    },

    addToQuotation(p) {
      store.state.openQuantityModal = true
      store.state.quantityModalData = p
    }
  }
}
</script>

<template>
  <CreateModal />
  <UpdateModal />
  <ShowDetails />
  <QuantityModal />
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
          <tr v-for="p in products" :key="p.id">
            <td>
              <v-btn @click="addToQuotation(p)" class="small-btn"> quotation </v-btn>
            </td>
            <td class="truncate-name">{{ p.name }}</td>
            <td class="truncate-item">{{ p.price }}</td>
            <td class="truncate-item">{{ p.description }}</td>
            <td class="truncate-quantity">{{ p.stock[0].quantity }}</td>
            <td class="truncate-quantity">{{ p.stock[1].quantity }}</td>
            <td class="truncate-quantity">{{ p.stock[2].quantity }}</td>
            <td class="truncate-quantity">
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
      <v-snackbar v-model="store.state.snackbarTwo" :timeout="500">
        Added to qoutation
        <template v-slot:actions>
          <v-btn color="pink" variant="text" @click="store.state.snackbarTwo = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>
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
.truncate-item {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 150px;
}
.truncate-quantity {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 50px;
}

.truncate-name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 150px;
}
.small-btn {
  font-size: 10px;
}
</style>

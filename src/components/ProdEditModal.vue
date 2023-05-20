<script setup>
import store from '../store/store'
console.log('store.state.editDataaaa', store.state.editData)
</script>

<script>
import { reactive, watch } from 'vue'

export default {
  created() {
    console.log('store.state.editData', store.state.editData)
  },
  setup() {
    const formState = reactive({
      name: store.state.editData?.name,
      price: '5',
      description: '5',
      erbil: '5',
      baghdad: '5',
      basra: '5'
    })

    axios
      .get(`http://localhost:8000/state/${store.state.editData}`)
      .then((response) => {
        state.products = response.data
      })
      .catch((error) => {
        console.log(error)
      })
    function editProd(values) {
      console.log(values)
    }

    return {
      formState,
      editProd
    }
  }
}
</script>

<template>
  <v-dialog v-model="store.state.editModal" width="auto">
    <v-card class="asd">
      <v-card-title class="text-h5"> EDIT PRODUCT </v-card-title>
      <v-card-text>
        <v-text-field required :value="store.state.editData.name"></v-text-field>
        <v-text-field required :value="store.state.editData.price"></v-text-field>
        <v-text-field required v-model="store.state.editData.description"></v-text-field>
        <v-text-field required :value="store.state.editData.stock[0].quantity"></v-text-field>
        <v-text-field required v-model="store.state.editData.stock[1].quantity"></v-text-field>
        <v-text-field required v-model="store.state.editData.stock[2].quantity"></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn color="" block @click="editProd(store.state.editData.price)">Edit</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style>
.asd {
  width: 500px;
}
</style>

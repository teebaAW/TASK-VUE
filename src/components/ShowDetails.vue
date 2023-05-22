<script setup>
import store from '../store/store'
function modalBtn() {
  store.state.showModal = false
}
</script>

<template>
  <template>
    <div class="text-center">
      <v-dialog v-model="store.state.showModal" width="auto">
        <v-card>
          <v-card-title class="text-h5"> PRODUCT DETAILS</v-card-title>

          <v-card-text>
            <div class="detail-modal">
              <div>
                <h3>Product Name</h3>
                <h5>{{ store.state.showData.name }}</h5>
                <h3>Product price</h3>
                <h5>{{ store.state.showData.price }}</h5>

                <h3>Product description</h3>
                <h5 class="description">{{ store.state.showData.description }}</h5>
              </div>
              <div>
                <h3>Quantity in Basra</h3>
                <h5>{{ store.state.showData.stock[0].quantity }}</h5>

                <h3>Quantity in Baghdad</h3>
                <h5>{{ store.state.showData.stock[1].quantity }}</h5>
                <h3>Quantity in Erbil</h3>
                <h5>{{ store.state.showData.stock[2].quantity }}</h5>
              </div>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" block @click="modalBtn">Close Dialog</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </template>
</template>

<style>
.asd {
  width: 500px;
}
.detail-modal {
  display: flex;
  justify-content: space-between;
  gap: 28px;
}
.description {
  display: inline-block;
  max-width: 300px;
  word-wrap: break-word;
  white-space: pre-line;
}
</style>

<template>
  <h1 class="quotation-text">Quotation</h1>
  <div>
    <p>Date: {{ currentDate }}</p>
    <v-table class="custom-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Total Price</th>
          <th>Description</th>
          <th>Total Quantity</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in store.state.quotatiom" :key="p.id">
          <td class="truncate-description">{{ p.name }}</td>
          <td class="truncate-description">{{ p.price * p.totalQuantity }}</td>
          <td class="truncate-description">{{ p.description }}</td>
          <td class="truncate-description">
            {{ p.totalQuantity }}
          </td>

          <td><v-btn @click="deleteQuote(p)">delete</v-btn></td>
        </tr>
        <tr>
          <td>total price</td>
          <td>{{ calculateTotalPrice() }}</td>
        </tr>
      </tbody>
    </v-table>
    <v-btn @click="goToPrintPage" type="submit"> go to qoutation to print</v-btn>
  </div>
</template>

<script setup>
import store from '../store/store'

function getCurrentDate() {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')
  const currentDate = `${year}-${month}-${day}`
  return currentDate
}
const currentDate = getCurrentDate()

function deleteQuote(p) {
  store.dispatch('DELETE_QUOTATION', p)
}

function goToPrintPage() {
  window.open('/quote', '_blank')
}
function calculateTotalPrice() {
  if (store.state.quotatiom)
    return store.state.quotatiom?.reduce((sum, item) => sum + parseFloat(item.totalPrice), 0)
}
</script>

<style scoped>
.field-margin {
  width: 200px;
  margin-top: 10px;
}
.custom-table {
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
  border: 2px solid #ccc;
  margin-bottom: 50px;
}
.quotation-text {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  margin-top: 20px;
}
.quotation-header {
  display: flex;
  justify-content: space-between;
  margin-right: 10px;
  margin-left: 10px;
}
.truncate-description {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px; /* Adjust the width as needed */
}
.hidden-on-screen {
  display: none;
}
</style>

<style>
#app {
  margin-top: 60px;
  text-align: center;
}
.box {
  display: block;
}
</style>

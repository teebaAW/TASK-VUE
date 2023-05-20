<template>
  <h1 class="quotation-text">Quotation</h1>
  <div class="quotation-header">
    <p>Date: {{ currentDate }}</p>
    <v-btn @click="exportToPDF">Export to PDF</v-btn>
  </div>

  <v-table class="custom-table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Price</th>
        <th>Description</th>
        <th>Quantity</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="p in data" :key="p.id">
        <td class="truncate-description">{{ p.name }}</td>
        <td class="truncate-description">{{ p.price }}</td>

        <td class="truncate-description">{{ p.description }}</td>
        <td>
          <v-text-field
            hide-details
            single-line
            type="number"
            class="field-margin"
            label="Specify a quantity"
          />
        </td>
      </tr>
      <tr>
        <td>total price :</td>
        <td> {{ calculateTotalPrice() }}</td>
      </tr>
    </tbody>
  </v-table>
</template>

<script setup>
import store from '../store/store'

const data = JSON.parse(localStorage.getItem('quotation'))
console.log('data', data)
function exportToPDF() {
  window.print()
}
function getCurrentDate() {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')

  const currentDate = `${year}-${month}-${day}`
  return currentDate
}
const currentDate = getCurrentDate()

function calculateTotalPrice() {
  return data.reduce((sum, item) => sum + parseFloat(item.price), 0)
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
</style>

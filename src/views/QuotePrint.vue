<template>
  <div class="quotation-header">
    <div></div>
    <v-btn @click="exportToPDF">Export to PDF</v-btn>
  </div>
  <div id="element-to-convert">
    <h1 class="quotation-text">Quotation</h1>
    <p>Date: {{ currentDate }}</p>
    <v-table class="custom-table" id="element-to-convert">
      <thead>
        <tr>
          <th>Name</th>
          <th>Total Price</th>
          <th>Description</th>
          <th>Total Quantity</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in data" :key="p.id">
          <td class="truncate-description">{{ p.name }}</td>
          <td class="truncate-description">{{ p.totalPrice }}</td>
          <td class="truncate-description">{{ p.description }}</td>
          <td class="truncate-description">{{ p.totalQuantity }}</td>
        </tr>

        <tr>
          <td>total price :</td>
          <td>{{ calculateTotalPrice() }}</td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script setup>
import store from '../store/store'
import html2pdf from 'html2pdf.js'

const data = JSON.parse(localStorage.getItem('quotation'))

function getCurrentDate() {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')
  const currentDate = `${year}-${month}-${day}`
  return currentDate
}
const currentDate = getCurrentDate()
function exportToPDF() {
  html2pdf(document.getElementById('element-to-convert'), {
    margin: 1,
    filename: 'quotation.pdf'
  })
}
function calculateTotalPrice() {
  if (data) return data?.reduce((sum, item) => sum + parseFloat(item.totalPrice), 0)
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
  margin-top: 10px;
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

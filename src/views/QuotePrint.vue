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
          <th>Price</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in data" :key="p.id">
          <td class="truncate-description">{{ p.name }}</td>
          <td class="truncate-description">{{ p.price }}</td>
          <td class="truncate-description">{{ p.description }}</td>
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
function deleteFunction(p) {
  console.log('p', p)
}

function calculateTotalPrice() {
  if (data) return data?.reduce((sum, item) => sum + parseFloat(item.price), 0)
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
<!-- <template>
  <div id="app" ref="document">
    <div id="element-to-convert">
      <center>
        <img width="400" src="./assets/constellation.png" />
      </center>
    </div>
    <button @click="exportToPDF">Export to PDF</button>
  </div>
</template> -->

<!-- <script>
import html2pdf from 'html2pdf.js'

export default {
  name: 'app',
  methods: {
    exportToPDF() {
      html2pdf(document.getElementById('element-to-convert'), {
        margin: 1,
        filename: 'i-was-html.pdf'
      })
    }
  }
}
</script> -->

<style>
#app {
  margin-top: 60px;
  text-align: center;
}
.box {
  display: block;
}
</style>

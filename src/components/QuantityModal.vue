<template>
  <v-dialog v-model="store.state.openQuantityModal" width="auto">
    <v-card>
      <v-card-title class="text-h5"> ADD PRODUCT </v-card-title>
      <form @submit.prevent="submit" class="asd">
        <h3>{{ store.state.quantityModalData.name }}</h3>
        <h5>
          Available Quantity is
          {{
            store.state.quantityModalData.stock[0].quantity +
            store.state.quantityModalData.stock[1].quantity +
            store.state.quantityModalData.stock[2].quantity
          }}
        </h5>
        <v-text-field
          v-model="quantity.value.value"
          hide-details
          single-line
          type="number"
          class="field-margin"
          label="Quantity in erbil"
        />
        <div class="form-btn">
          <v-btn class="me-4" type="submit"> submit </v-btn>
          <v-btn @click="handleReset"> clear </v-btn>
        </div>
        <v-snackbar v-model="snackbar" :timeout="1000">
          Not Enough items in Stock
          <template v-slot:actions>
            <v-btn color="pink" variant="text" @click="snackbar = false"> Close </v-btn>
          </template>
        </v-snackbar>
      </form>
    </v-card>
  </v-dialog>
</template>

<script>
import { useField, useForm } from 'vee-validate'
import store from '../store/store'
import { ref } from 'vue'

export default {
  setup() {
    const { handleSubmit, handleReset } = useForm({})

    const quantity = useField('quantity')
    let snackbar = ref(false)

    const submit = handleSubmit((values) => {
      if (
        values.quantity >
        store.state.quantityModalData.stock[0].quantity +
          store.state.quantityModalData.stock[1].quantity +
          store.state.quantityModalData.stock[2].quantity
      ) {
        snackbar.value = true
      } else {
        store.state.quantityModalData.totalQuantity = values.quantity
        store.dispatch('ADD_TO_QUOTATION', store.state.quantityModalData)
        store.state.openQuantityModal = false
        store.state.snackbarTwo = true
        quantity.value.value = ''
      }

      //   store.dispatch('ADD_NEW', products)
    })

    return {
      quantity,
      snackbar,
      store,
      submit,
      handleReset
    }
  }
}
</script>
<style>
.asd {
  width: 500px;
  margin: 30px;
}
.field-margin {
  margin-bottom: 10px;
}
.form-btn {
  margin-top: 30px;
}
</style>

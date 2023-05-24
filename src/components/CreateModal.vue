<template>
  <v-dialog v-model="store.state.openCreateModal" width="auto">
    <v-card>
      <v-card-title class="text-h5"> ADD PRODUCT </v-card-title>
      <form @submit.prevent="submit" class="asd">
        <v-text-field
          v-model="name.value.value"
          :counter="10"
          :error-messages="name.errorMessage.value"
          label="Name"
        ></v-text-field>
        <v-text-field
          v-model="price.value.value"
          :counter="7"
          :error-messages="price.errorMessage.value"
          label="price"
        ></v-text-field>
        <v-text-field
          v-model="description.value.value"
          :error-messages="description.errorMessage.value"
          label="description"
        ></v-text-field>
        <v-text-field
          v-model="basra.value.value"
          hide-details
          single-line
          type="number"
          class="field-margin"
          label="Quantity in basra"
        />
        <v-text-field
          v-model="baghdad.value.value"
          hide-details
          single-line
          type="number"
          class="field-margin"
          label="Quantity in baghdad"
        />
        <v-text-field
          v-model="erbil.value.value"
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
      </form>
    </v-card>
  </v-dialog>
</template>

<script>
import { ref } from 'vue'
import { useField, useForm } from 'vee-validate'
import store from '../store/store'

export default {
  setup() {
    const { handleSubmit, handleReset } = useForm({
      validationSchema: {
        name(value) {
          if (value?.length >= 2) return true

          return 'Name needs to be at least 2 characters.'
        },

        price(value) {
          if (/^\d+(\.\d+)?$/.test(value)) return true

          return 'Price must be a valid number.'
        },
        description(value) {
          if (value?.length >= 2) return true

          return 'Name needs to be at least 2 characters.'
        }
      }
    })
    const name = useField('name')
    const price = useField('price')
    const description = useField('description')
    const basra = useField('basra')
    const baghdad = useField('baghdad')
    const erbil = useField('erbil')

    const submit = handleSubmit((values) => {
      let randomNumber = Math.random()
      randomNumber = Math.floor(randomNumber * 100) + 21
      let products = {
        id: randomNumber,
        name: values.name,
        price: values.price,
        description: values.description,
        stock: [
          {
            name: 'Basra',
            quantity: parseInt(values.basra)
          },
          {
            name: 'Baghdad',
            quantity: parseInt(values.baghdad)
          },
          {
            name: 'Erbil',
            quantity: parseInt(values.erbil)
          }
        ]
      }
      store.dispatch('ADD_NEW', products)
      store.state.openCreateModal = false
    })

    return {
      name,
      price,
      description,
      erbil,
      basra,
      baghdad,
      submit,
      handleReset,
      store
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

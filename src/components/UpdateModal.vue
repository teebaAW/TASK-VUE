<template>
  <v-dialog v-model="store.state.openEditModal" width="auto">
    <v-card>
      <v-card-title class="text-h5"> EDIT PRODUCT </v-card-title>
      <form @submit.prevent="submit" class="asd">
        <v-text-field
          :counter="10"
          :error-messages="name.errorMessage.value"
          label="name"
          v-model="name.value.value"
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
        stocks in basra
        <v-text-field
          v-model="basra.value.value"
          hide-details
          single-line
          type="number"
          class="field-margin"
        />
        stocks in baghdad
        <v-text-field
          v-model="baghdad.value.value"
          hide-details
          single-line
          type="number"
          class="field-margin"
        />
        stocks in baghdad
        <v-text-field
          v-model="erbil.value.value"
          hide-details
          single-line
          type="number"
          class="field-margin"
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
import { useField, useForm } from 'vee-validate'
import store from '../store/store'

export default {
  setup() {
    const { handleSubmit, handleReset } = useForm({
      validationSchema: {
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
    name.value.value = store?.state?.editData?.name

    price.value.value = store?.state?.editData?.price
    description.value.value = store?.state?.editData?.description
    basra.value.value = store?.state?.editData?.stock[0].quantity

    baghdad.value.value = store?.state?.editData?.stock[1].quantity
    erbil.value.value = store?.state?.editData?.stock[2].quantity

    const submit = handleSubmit((values) => {
      // console.log('val', values)

      let products = {
        name: values.name,
        price: values.price,
        description: values.description,
        stock: [
          {
            name: 'Basra',
            quantity: values.basra
          },
          {
            name: 'Baghdad',
            quantity: values.baghdad
          },

          {
            name: 'Erbil',
            quantity: values.erbil
          }


        ]
      }

      // store.state.openEditModal = false

      console.log('products', products)
      store.dispatch('EDIT_PRODUCT', products)
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

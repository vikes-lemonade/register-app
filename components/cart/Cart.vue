<template>
  <div>
    <v-card max-height="400px" width="500px" class="overflow-y-auto">
      <v-card-title class="justify-center">
        Shopping Cart
      </v-card-title>
      <v-divider class="my-auto py-auto" />
      <v-card-text>
        <v-list two-line>
          <v-subheader>Item <v-spacer /> Price </v-subheader>
          <v-list-item v-for="(item, idx) in employeeCart" :key="idx">
            <v-list-item-avatar>
              <v-btn fab>
                {{ idx+1 }}
              </v-btn>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ item.id }}</v-list-item-title>
              <v-list-item-subtitle>
                Quantity: {{item.count}}
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action class="subtitle-1">$&nbsp;{{ calculateItemPrice(item.price, item.count) }}</v-list-item-action>
          </v-list-item>
          <v-divider />
          <v-list-item>
            <v-list-item-title>Subtotal: </v-list-item-title>
            <v-list-item-action class="subtitle-1">
              $&nbsp;{{ totalPrice() }}
            </v-list-item-action>
          </v-list-item>
        </v-list>
        
      </v-card-text>
      <v-card-actions>
        <v-container fluid>
          <v-row dense>
            <v-col cols="6">
              <v-btn @click="clearCart" block color="error">Clear Cart</v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn block color="primary">Checkout</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex"; 

export default {
  name: "Cart",
  props: [ "showCart" ],
  data: () => ({
    employeeCart: [
      {
        id: "123456",
        count: 2,
        price: 2.50
      },
      {
        id: "123456",
        count: 2,
        price: 2.50
      },
      {
        id: "123456",
        count: 2,
        price: 2.50
      }
    ]
  }),
  mounted() {
    if (localStorage.getItem("cart")) {
      try {
        this.employeeCart = JSON.parse(localStorage.getItem("cart"))
      } catch(e) {
        localStorage.removeItem("cart")
      }
    }
  },
  methods: {
    totalItems() {

    },
    totalPrice() {
      let price = 0
      this.employeeCart.forEach(item => {
        price = price + (item.price * item.count)
      })
      return price.toFixed(2)
    },
    calculateItemPrice(price, count) {
      return (price * count).toFixed(2)
    },
    addItem() {
      this.employeeCart.push("item")
      this.saveCart()
    },
    saveCart() {
      const parsed = JSON.stringify(this.employeeCart)
      localStorage.setItem('cart', parsed)
      this.$emit("updateCart")
    },
    clearCart() {
      localStorage.removeItem("cart")
      this.employeeCart = []
      this.$emit("updateCart")
    }
  }
}
</script>

<style>

</style>
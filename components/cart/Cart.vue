<template>
  <div>
    <v-card width="600px">
      <v-card-title class="justify-center">
        Shopping Cart ({{ employeeCart.length }} items)
        <v-spacer />
        <v-btn v-if="!editingCart" text @click="editingCart = true" class="editbtn" :disabled="employeeCart.length === 0">
          <v-icon>edit</v-icon>&nbsp;Edit Cart
        </v-btn>
        <v-btn v-else color="success" text @click="saveCart" class="editbtn">
          <v-icon>check</v-icon>&nbsp; Save
        </v-btn>
      </v-card-title>
      <v-divider class="my-auto py-auto" />
      <v-card-text style="max-height: 500px" class="overflow-y-auto scroll-target">
        <v-list two-line>
          <v-subheader>Item <v-spacer /> Price </v-subheader>
          <v-list-item v-for="(item, idx) in employeeCart" :key="idx">
            <v-list-item-avatar>
              <v-btn fab v-if="!editingCart">
                {{ idx+1 }}
              </v-btn>
              <v-btn v-else fab color="error" @click="$emit('removeProduct', item)">
                <v-icon>clear</v-icon>
              </v-btn>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ item.id }}</v-list-item-title>
              <v-list-item-subtitle v-if="!editingCart">
                Quantity: {{item.count}}
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action class="subtitle-1" v-if="!editingCart">$&nbsp;{{ calculateItemPrice(item.price, item.count) }}</v-list-item-action>
            <v-list-item-action v-else>
              <v-text-field v-model="item.count" label="Quantity" readonly>
                <v-icon slot="prepend" color="error" @click="item.count--">remove</v-icon>
                <v-icon slot="append-outer" color="success" @click="item.count++">add</v-icon>
              </v-text-field>
            </v-list-item-action>
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
              <v-btn block color="primary" @click="checkout">Checkout (${{ totalPrice() }})</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>

export default {
  name: "Cart",
  props: [ "loadCart", "employeeCart"],
  data: () => ({
    editingCart: false
  }),
  methods: {
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
    saveCart() {
      this.$emit('saveCart')
      this.editingCart = false
    },
    checkout() {
      this.$emit("checkout")
    },
    clearCart() {
      this.$emit("clearCart")
    }
  }
}
</script>

<style>
.editbtn:hover {
  animation: shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
  perspective: 1000px;
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }
  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-2px, 0, 0);
  }
  40%,
  60% {
    transform: translate3d(2px, 0, 0);
  }
}
</style>

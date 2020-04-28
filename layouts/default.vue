<template>
  <v-app dark style="background-color: #BDBDBD">
    <div>
      <v-snackbar v-model="showSnack" :timeout="5000" top :color="snackColor">
        {{ snackText }}<v-spacer />&nbsp;
        <v-icon @click="showSnack = false">close</v-icon>
      </v-snackbar>
      <v-toolbar>
        <v-toolbar-title>
          <span class="headline font-weight-medium">Register App |</span>
          <span class="headline font-weight-light text-uppercase">{{tab}}</span>
        </v-toolbar-title>
        <v-spacer/>
        <v-toolbar-items>

          <v-btn :to="items[0].to" text>
            <v-icon>{{items[0].icon}}</v-icon> {{items[0].title}}
          </v-btn>

          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-btn
                v-on="on"
                text
              >
                <v-icon>person</v-icon> User
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-if="isManager"
                :key="items[3].title"
                :to= "items[3].to"
              >
                <v-list-item-title>View employee details</v-list-item-title>
              </v-list-item>
              <v-list-item
                v-if="isManager"
                :key="items[4].title"
                :to= "items[4].to"
              >
                <v-list-item-title>View Transaction Report</v-list-item-title>
              </v-list-item>
              <v-list-item
                key="signOut"
                v-on:click="signOut"
              >
                <v-list-item-title>Sign out</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-menu offset-y :close-on-content-click="false">
            <template v-slot:activator="{ on: menu }">
              <v-tooltip bottom>
                <template v-slot:activator="{ on: tooltip }">
                  <v-btn v-on="{ ...tooltip, ...menu }" icon>
                    <v-icon>shopping_cart</v-icon>
                    ({{ cartLength }})
                  </v-btn>
                </template>
                View Shopping Cart or Checkout
              </v-tooltip>
            </template>
            <Cart
              id="cart"
              ref="cart"
              v-on:updateCart="updateCart"
              v-on:clearCart="clearCart"
              v-on:saveCart="saveCart"
              v-on:removeProduct="removeProduct"
              v-on:checkout="checkout"
              :employee-cart="employeeCart"
            />
          </v-menu>
        </v-toolbar-items>

      </v-toolbar>
    </div>
    <v-content>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-content>

    <v-footer>
      <span>&copy; 2020</span>
    </v-footer>
  </v-app>
</template>

<script>
import Cart from "../components/cart/Cart"
import EventBus from "../src/event-bus";

export default {
  components: { Cart },
  data () {
    return {
      items: [
        {
          icon: '',
          title: 'Main Menu',
          to: '/'
        },
        {
          icon: '',
          title: 'Product Listing',
          to: '/products'
        },
        {
          icon: '',
          title: 'Start Transaction',
          to: ''
        },
        {
          icon: '',
          title: 'Employee Detail',
          to: '/employee'
        },
        {
          icon: '',
          title: 'Cashier Report',
          to: ''
        },
        {
          icon: '',
          title: 'Sign out',
          to: ''
        }
      ],
      cartLength: 0,
      employeeCart: [],
      isManager: false,
      showSnack: false,
      snackText: null,
      snackColor: "success"
    }
  },
  methods: {
    say: function (msg) {
      alert(msg)
    },
    checkout() {
      const employee = JSON.parse(localStorage.getItem("employee"))
      const productsPurchased = this.employeeCart.map(e => { return e.id })
      let price = 0
      this.employeeCart.forEach(item => {
        price = price + (item.price * item.count)
      })
      price = price.toFixed(2)

      let post_obj = {
        cashierid: employee.employeeid,
        productspurchased: productsPurchased,
        totalproductcount: productsPurchased.length,
        transactiontotal: price
      }

      this.$axios
        .post("https://peaceful-bastion-45955.herokuapp.com/api/v1/transaction/create", post_obj)
        .then(res => {
          this.clearCart()
          this.cartLength = 0
          this.snackText = "Successfully completed your transaction. Transaction ID is [" + res.data.transactionid + "]"
          this.showSnack = true
        })
        .catch(err => {
          console.log(err)
        })
    },
    saveCart() {
      localStorage.setItem("cart", JSON.stringify(this.employeeCart))
    },
    updateCart() {
      try {
        if (localStorage.getItem("cart")) {
          this.cartLength = JSON.parse(localStorage.getItem("cart")).length
          this.employeeCart = JSON.parse(localStorage.getItem("cart"))
        }
      } catch(e) {
          localStorage.removeItem("cart")
      }
    },
    clearCart() {
      this.employeeCart = []
      localStorage.removeItem("cart")
    },
    removeProduct(product) {
      let newCart = []
      try {
        if (localStorage.getItem("cart")) {
          newCart = JSON.parse(localStorage.getItem("cart"))
          let idx = newCart.map(function (e) { return e.productId }).indexOf(product.productId)
          const removed = newCart.splice(idx, 1)
        }
      } catch(e) {
        console.log(e)
      }

      this.employeeCart = newCart
      localStorage.setItem("cart", JSON.stringify(newCart))
      this.cartLength = newCart.length
    },
    addProduct(product) {
      let cart = []
      try {
        if (localStorage.getItem("cart")) {
          cart = JSON.parse(localStorage.getItem("cart"))
          if (cart.filter(e => e.productId === product.productId).length > 0) {
            cart.forEach(e => {
              if (e.productId === product.productId) {
                e.count = e.count + product.count
              }
            })
          } else {
            cart.push(product)
          }
        } else {
          cart = [product]
        }
      } catch(e) {
        console.log(e)
      }

      this.employeeCart = cart
      localStorage.setItem("cart", JSON.stringify(cart))
      this.cartLength = cart.length
    },
    async signOut(){
      this.$store.dispatch('SIGN_OUT').then(() => {
        this.$router.push({name: 'login'})
      })
    }
  },
  mounted() {
    this.$store.dispatch("RETRIEVE_LOCAL")
    const employee = this.$store.state.employee

    if (employee.classification === 1 || employee.classification === 2) {
      this.isManager = true
    }

    try {
      if (localStorage.getItem("cart")) {
        this.cartLength = JSON.parse(localStorage.getItem("cart")).length
        this.employeeCart = JSON.parse(localStorage.getItem("cart"))
      }
    } catch(e) {
      localStorage.removeItem("cart")
    }

    EventBus.$on("addProduct", item => {
      this.addProduct(item)
    })
  },
  computed: {
    tab() {
      let path = this.$nuxt.$route.path
      if (path === "/") {
        return "MENU"
      } else {
        return path.split("/")[1]
      }
    },
  }
}
</script>

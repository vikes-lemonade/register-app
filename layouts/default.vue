<template>
  <v-app dark style="background-color: #BDBDBD">
    <div>
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
              >
                <v-icon>person</v-icon> User
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                :key="index"
                :to= "items[3].to"
              >
                <v-list-item-title>View employee details</v-list-item-title>
              </v-list-item>
              <v-list-item
                :key="index"
                :to= "items[4].to"
              >
                <v-list-item-title>View Transaction Report</v-list-item-title>
              </v-list-item>
              <v-list-item
                :key="index"
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
            <Cart v-on:updateCart="updateCartLength" />
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

export default {
  components: { Cart },
  methods: {
    say: function (msg) {
      alert(msg)
    },
    updateCartLength() {
      try {
        if (localStorage.getItem("cart")) {
          this.cartLength = JSON.parse(localStorage.getItem("cart")).length
        }
      } catch(e) {
      localStorage.removeItem("cart")
      }
    },
    async signOut(){
      this.$store.dispatch('SIGN_OUT').then(() => {
        this.$router.push({name: 'login'})
      })
    }
  },
  mounted() {
    this.$store.dispatch("RETRIEVE_LOCAL")
    try {
      if (localStorage.getItem("cart")) {
        this.cartLength = JSON.parse(localStorage.getItem("cart")).length
      }
    } catch(e) {
      localStorage.removeItem("cart")
    }
  },
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
          title: 'Transaction Report',
          to: '/error'
        },
        {
          icon: '',
          title: 'Sign out',
          to: '/login'
        }


      ],
      cartLength: 0
    }
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

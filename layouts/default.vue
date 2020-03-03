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
          <!--  <v-btn v-for="(item, index) in items" :key="index" :to="item.to" text>
            <v-icon>{{item.icon}}</v-icon>{{item.title}}
          </v-btn>
          -->
          <v-btn :to="items[0].to" text>
            <v-icon>{{items[0].icon}}</v-icon>| {{items[0].title}}
          </v-btn>
          <v-btn :to="items[1].to" text>
            <v-icon>{{items[1].icon}}</v-icon>| {{items[1].title}}
          </v-btn>
          <v-btn :to="items[2].to" v-on:click="say('Function has not been implemented!')" text>
            <v-icon>{{items[2].icon}}</v-icon>| {{items[2].title}}
          </v-btn>
          <v-btn :to="items[3].to" text>
            <v-icon>{{items[3].icon}}</v-icon>| {{items[3].title}}
          </v-btn>
          <v-btn :to="items[4].to" v-on:click="say('Function has not been implemented!')" text>
            <v-icon>{{items[4].icon}}</v-icon>| {{items[4].title}}
          </v-btn>
          <v-btn :to="items[5].to" v-on:click="signOut" text>
            <v-icon>{{items[5].icon}}</v-icon>| {{items[5].title}}
          </v-btn>

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

export default {
  methods: {
    say: function (msg) {
      alert(msg)
    },
    async signOut(){
      this.$store.dispatch('SIGN_OUT').then(() => {
        this.$router.push({name: 'login'})
      })
    }
  },
  mounted() {
    this.$store.dispatch("RETRIEVE_LOCAL")
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
          title: 'Cashier Report',
          to: ''
        },
        {
          icon: '',
          title: 'Sign out',
          to: ''
        }
      ],
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

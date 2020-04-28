<template>
  <div>
    <v-dialog v-model="show" width="800px" persistent>
      <v-card>
        <v-card-title>
          Creating a New Product
          <v-spacer />
          <v-btn fab @click="close" color="error"><v-icon>close</v-icon></v-btn>
        </v-card-title>
        <v-card-text>
          <v-container fluid>
            <v-row justify="space-between" align="center">
              <v-col cols="6">
                <v-text-field v-model="lookup_code" label="Lookup Code" />
              </v-col>
              <v-col cols="3">
                <v-text-field v-model="count" type="number" label="Count" />
              </v-col>
              <v-col cols="3">
                <v-text-field v-model="price" type="number" label="Price" prefix="$"/>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn block @click="submit" color="success" :loading="loading">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "CreateProduct",
  props: [ "showCreate" ],
  data: () => ({
    lookup_code: null,
    count: null,
    price: null,
    loading: false
  }),
  computed: {
    show: {
      get() {
        return this.showCreate
      },
      set(value) {
        this.$emit("close")
      }
    }
  },
  methods: {
    submit() {
      this.loading = true

      const payload = {
        lookup_code: this.lookup_code,
        count: parseInt(this.count).toFixed(0),
        price: parseInt(this.price).toFixed(0)
      }

      this.$axios
        .post("https://peaceful-bastion-45955.herokuapp.com/api/v1/products/create", payload)
        .then(res => {
          console.log(res)
          this.loading = false
          this.$emit("createdProduct")
        })
        .catch(err => {
          console.log(err)
          this.$emit("closeCreate")
        })
    },
    close() {
      this.lookup_code = null
      this.count = null
      this.price = null
      this.$emit("closeCreate")
    }
  }
}
</script>

<style scoped>

</style>

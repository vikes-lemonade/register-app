## Team Deep Dive
---
**Content to Cover**
1. Basic JavaScript
2. Nuxt.js [Docs](https://nuxtjs.org/)
3. Vue.js - [Docs](https://vuejs.org/v2/guide/instance.html#Instance-Lifecycle-Hooks)
4. Vuetify.js - [Docs](https://vuetifyjs.com/en/components/api-explorer)

##### Below are the Concepts I believe are pertinent to this project you can research and even test out
- Axios & making HTTP requests in JavaScript
    - This includes handling promises and how they are resolved
- The `asyncData` step in the request schema, this is the phase in which the server will fetch the data from the API
- Vuex: the centralized store where the data will live and all components will reference
    - This is important to see how we pass data between the Vuex store and components
    - Also we can see how to balance data between the client and the server
- Directives and HTML Interpolation in Vue.js
    - Learn how we interpolate data into HTML with vue, and how we can use directives to bind data values to components
    - Also how we can use logical expressions inside our HTML to make our page dynamically show different information
- Learn the structure of Vue files and Vue directories
    - Like how the layouts -> pages -> components structure works
    - Learn about the parent/child relationship between components, and how can we communicate between them
    - Learn about computed properties, VERY very helpful, but probably not super important in our project
- Vuetify: for Vuetify it's really open ended because they probably have 5 or more different components we could use to solve the problem at hand, but here are somethings I would consider important to learn
    - Learn how to structure a page, and the idea of "flexibility", basically how does the page handle resizing or different size screens
    - Data iteration components are what we will use to display the products
    - Learn about how we can use buttons or other things to show or hide other components (modals)
    - See the different ways we can use components, colors, fonts, typography, etc. to make the website aesthically pleasing as well
    - You can do some really cool stuff with vuetify, and they have great docs, its fun to see what you can make with it
    
##### Below is a list of everything we will need to (I will probably miss or forget stuff)
- Create and stand up an API server that works as a backend connection to our DB
- Create a Vuex Store to fetch and hold our data, it must include and use all these parts
    - State
    - Mutations
    - Actions
    - Getters
    - mapGetters
- **layouts/default.vue**: this component should include a toolbar and on the toolbar we need these things:
    - A button/icon that when clicked is a dropdown list that lets you swap the user using that "register"
    - A button/tab that enables the cart component, so when clicked it will open the cart component in a popup
- **pages/index.vue (homepage)**: this page will hold all subsequent components, as well as be responsible for working with Vuex to fetch our data *as soon as a request is made to the page*
    - This component is responsible for using a certain function with the Vuex store to fetch our data
    - It should also include the other child components and register them properly
- **Products Component**: this component will use some sort of data iterative vuetify component to display our products on the page
- **Cart/Checkout Component**: this component will work as a cart/checkout which holds all the items the cashier is trying to buy 
    - Note: this component will also make an API request when a purchase is made so we can make a report later
    - This component will also be a popup
---
**Extra I guess?**: A component that uses the Vuex store and API to fetch the data needed for generating an owner for the report

> Its possible that I forgot stuff in the list above, we will see as we go along, but that covers most of what I think we will need in the project.
> If/when we get all that base stuff done, we can probably try and add things to increase the complexity of it if we feel like it.

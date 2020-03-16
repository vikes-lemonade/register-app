### SPRINT 3: PLANNING
---
**GOALS FOR THE SPRINT**:
- Generate trello tasks corresponding with the tasks to create the transaction procedure
  - *Every one should have atleast one task*
- Put together a *presentation* that we will give in class at the beginning of the next sprint.
  - *Ideally* everyone would talk


- Things we will need according to the bullets provided:
  - A cart component
    - Must be able to adjust quantity of an item in the cart
    - Must be able to remove products from the cart
    - Display a transaction summary
      - Display each product with price/quantity
      - Display total product count
      - Display total price count
    - The ability to cancel the transaction as a whole
  - Extending product component
    - Include search functionality
    - Adding items to cart, adjusting quantiy before adding to cart
    - Support communication between the cart component
  - API support for persisting a completed transaction to the database

<br>
<br>

- Other tasks that aren't required in next sprint, but could/should be focused on
  - Moving route protection into middleware
    - This will require probably adding support for handling authenticated user state in the database as well as in local storage
  - Improving the toolbar to do more toolbar-like things such as:
    - Having a clickable user dropdown that has options relevant to the user such as: View User Info, Logout, etc.
    - Including the toolbar in the functionality of the cart
    - Using the toolbar tabs to act more as tabs since we are using the menu component now
    - I have an example of this I wrote up in my spare time that could serve as a reference to go from
  - Possibly swapping infrastructures to use a more competent system such as AWS or Google Cloud


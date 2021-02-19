# Full stack Amazon Clone

bulding Amazon Clone with react js + firebase

# building

1. header

- logo ( pngimg.com )
- path to homepage
- input
  - icon ( material-ui )
- option
  - auth
  - orders
  - Prime
  - Basket

2. home page

- banner
- products
  - rows
  - product container
    - title
    - price
    - rating
    - image
    - button: add to basket ( react context api =? redux랑 비슷 )
      - state provider
      - initialState & reducer
        - initialState = initial state
        - reducer = pulling/pushing action connecting to data-layer
          - action: ADD_TO_BASKET
      - update header basket
      - update checkout page
        - update number of items
        - update total price
          - selector

3. checkout page

- left
  - ad banner
  - checkout product
    - get basket data
    - button: remove basket
      - reducer
        - action: REMOVE_FROM_BASKET
- right
  - subtotal checkout ( react-currency-format )
  - get data from state provider

4. login page

- frontend
  - login logo
    - Link to homepage
  - login form
- backend ( user authentication w/ Firebase )
  - register
  - login
  - loggedIn listener
    - reducer
      - action: SET_USER
    - handleAuthentication in header

5. deploying

- firebase login
- firebase init
- npm run build
- firebase deploy

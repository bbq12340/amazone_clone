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
      - update header basket

3. Router

4. checkout page

- left
  - ad banner
  - checkout basket
- right
  - subtotal checkout ( react-currency-format )

# Emin's Grocery Store

Grocery store web app

# Backend data

I have used predefined Github json files for backend data, which can be found at my public GitHub repo:
https://github.com/Eminakkoc/ecommerce

I have created separate files with pagination for each filter and sort option.

For example: veggies-desc-2 means the 2nd page of veggies which are sorted as descending(prices high to low)

# Store

Zustand is used for cart items, which are to be displayed at cart popup and at the checkout page.

Total payment amount will be calculated from this data.

Cart data will be stored at local storage if the transaction has not been completed.

# Main page

Main page has 2 main parts which are:

- Filter/Sort sidebar
- Product list

User can select filter/sort options to update the url, and each time the url is updated the server component ProductList will fetch the corresponding data from the backend.

Product list lists the product items data visualized in a grid. These product items has images of the products which are also retrieved from the backend.

Each product item in the grid is a <Link/> element which redirects users to their detail page.

# Header

Header component displays the logo, Login button (if not been logged in yet) and a cart button which opens a popup to display the cart status.

# Product Detail Page

Product detail page is another server page which retrieve the product item data from the id provided in the search params.

It displays the product item information alongside the related product of each product items represented at the bottom grid.

# Login

I have created an api route which checks the username and password and returns a response accordingly.

The predefined username and password can be updated from the constants file. Its default is:

`Username: test
Password: 1234`

Login page call this api route when user clicks login button.

If login page is a redirected page (in our case /checkout) , then the user will be redirected to the "redirectTo" page if the login is successful.

# Cart & Checkout

Cart button is on the right side of the header, a popup appears when user clicks to that button displaying the cart items with amount spinners and a remove option.

User can proceed to checkout by clicking the "proceed" button to confirm payment in the checkout page.

All items added/deleted/updated in the cart are sync with zustand and I have also used the persist feature of zustand to sync them with local storage as well.

When the payment is successful, a success modal will appear and if user clicks "Done" button in that modal,
store will be emptied and user will be redirected to the homepage.

# Node & npm versions

Node: v20.19.3
Npm: 10.8.2

# Scripts

npm run dev -> Run project on local server

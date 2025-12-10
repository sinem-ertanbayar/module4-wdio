Feature: Core user flows in Practice Software Testing Toolshop

  # 1) Sign Up
  Scenario: User successfully registers with valid information
    Given I am on the Toolshop registration page
    And I am a new user without an existing account
    When I fill in the registration form with valid and unique information
    And I submit the registration form
    Then I should see a message confirming that my account has been created
    And I should be redirected to the login page

  # 2) Sign In
  Scenario: User cannot sign in with an incorrect password
    Given I am on the Toolshop login page
    And I have a registered account
    When I attempt to sign in using a valid email but an incorrect password
    Then I should see an error message indicating invalid credentials
    And I should remain on the login page

  # 3) User Profile Update
  Scenario: User successfully updates profile information
    Given I am logged in as a valid user
    And I am on the user profile page
    When I edit my profile information with valid data
    And I save the changes
    Then I should see a message confirming that my profile was updated
    And the updated information should be displayed on the profile page

  # 4) Product Purchase (Details → Basket → Checkout)
  Scenario: User completes checkout for a product from the product details page
    Given I am logged in as a valid user
    And I am on the main product listing page
    When I open the details page of a specific product
    And I add the product to my basket
    And I proceed to the checkout page
    And I provide valid shipping and payment information
    Then I should see an order confirmation page
    And the ordered product should appear in my order summary

  # 5) Favorites
  Scenario: User adds a product to favorites and views it in the favorites list
    Given I am logged in as a valid user
    And I am on the main product listing page
    When I mark a product as a favorite
    Then the product should be added to my favorites list
    And it should be visible under the Favorites section with correct details

  # 6) Search for Exact Product
  Scenario: User finds a product by searching its exact name
    Given I am on the main product listing page with the search bar visible
    When I enter the exact name of an existing product into the search field
    And I perform the search
    Then the matching product should appear in the search results
    And the product name and details should match my search term

  # 7) Language Change
  Scenario: User switches the language of the application
    Given I am on the Toolshop main page in English
    And the language switcher is available
    When I change the language to another supported language
    Then the interface should display all texts in the selected language
    And the navigation menu should also update to the chosen language

  # 8) Filtering and Sorting Products
  Scenario: User filters products by category and sorts them by lowest price
    Given I am on the main product listing page
    And product categories and sorting options are available
    When I filter products by a specific category
    And I sort the filtered results by price from low to high
    Then only products from the selected category should be displayed
    And the displayed products should be ordered in ascending price order

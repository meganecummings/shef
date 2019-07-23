# Shef
Shef will serve as the personal library for all your favorite recipes. Easily write, edit, delete and view all of your favorite recipes.

### Motivation
Recipes shouldn't need clean up.

### Planning Deliverables

**Project Scope**

Shef app will serve as your personal recipe library. Easily write, edit, delete and view all of your favorite recipes. 

**User Stories**

*At Home Page:*
User has access to hero graphic and Nav Bar. 
User can click on Log In or Sign Up. 

*At Log In:*
User has access to Nav Bar with Sign Up and Log In
User can enter Email & Password. When user enters Email & Password, an authentication check confirms: Active user and Password & Password matches User Account.
If login is successful (Email & Password are active and match), user is directed to Profile Page. 
If authentication check fails, User is prompted to re-enter Email and Password. 
If User clicks 'Sign Up' Button, user is redirected to Sign up page. 
If User clicks 'Log In' button, user is redirected to Log In Page (refreshed to current page)

*At Sign Up Page:*
User has access to Nav Bar with Sign Up and Log In
If User clicks 'Sign Up' Button, user is redirected to Sign up page  (refreshed to current page).
If User clicks 'Log In' button, user is redirected to Log In Page. 
On Sign Up Page, user can enter Name, Date of Birth, Favorite Food, Location,  Password, Confirm Password & Add an Image Attachment. 
Three Validations: Completion of all fields, confirmation that User Email is Original, Password & Confirm Password Match. Upon completion of all validations, User can click 'Sign Up' Button. If validations are not complete, User will see Error Messages. Error messages for each validation error are as follows: 
Completion of Fields: Custom Message after end of each field. 
User Email Unoriginal: Error Message that User email already exists, give option to enter new email or log in. 
Password & Confirm Password do not match, Request for matching passwords.
After successful Sign Up, user is redirected to Log In Page. 
After successful Log In, User is taken to Library page.
 
*At Library Page, user has access to:*
Images of all Recipes under User Profile. Recipe name on Image. Hover --> Expand Image. Click on Image --> Recipe page. 
Buttons to: Write a new recipe, delete a recipe.
Nav Bar (Access to Library, Profile, Randomizer, Log Out).
Profile page goes to Profile page.
Randomizer Link goes to Randomizer Page. 
Log Out to Log Out Page. 
Library to Library Page (refreshes).

*At Profile Page, user has access to:*
User Profile (Information from Sign Up, including image of user)
Nav Bar (Access to Library, Profile, Randomizer, Log Out). Link path established above.

*At recipe page, user has access to:*
Recipe Information (Schema Elements)
Button to: Edit Existing Recipe (show existing recipe, with edit ability), Delete Recipe (confirmation request), Add New Recipe (takes you to new recipe Page)
Nav Bar (Access to Library, Profile, Randomizer, Log Out). Link path established above.

*At new-recipe Page:*
User can input new Schema Data for new recipe. All fields must be completed, else error.
Nav Bar (Access to Library, Profile, Randomizer, Log Out). Link path established above.

*At Randomizer page:*
User sees page with random selection of 3 recipes for inspiration
Nav Bar (Access to Library, Profile, Randomizer, Log Out). Link path established above.

*At Log Out Page:* 
Logs you Out, Hero Image. 
Nav Bar has Log In or Sign Up Options (same as Log In Page)

**Wire Frames**

**Database Model**

Database Model: One to Many; Users -> Recipes
We plan to Reference Recipes within User Accounts/Profiles for an Reference Database

**ERD** 

![img_5274 1](https://media.git.generalassemb.ly/user/21286/files/fb3e9800-accc-11e9-9655-f7dea3009700)

**Schemas**

*User Schemas*
Name: String, 
Date of Birth: Number, 
Favorite Food: String, 
Location: String,
Img: String

*Recipe Schema*
Name: String, 
Ingredients: [ Objects ],
name: String,
amount: Number,
measurement unit: String,
Procedure: String,
Image: String, 
Reference: User

**Feasibility Options**
Front-End Data Validation
Authentication
Comments Section
Social Media Component (seeing other User Recipe Library)
API Bonus (connection with Spotify for vibe setting? Text to Library input)

GA © Meg & James

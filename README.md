# ![GitHub Logo](./client/public/images/happychoicelogo.PNG)  Happy Choice   #
### **The Creators:**  
* Project Manager: Miki Collins
* Front-end: Lisa Ewart & Julie Shockley
* Back-end: Miki Collins & Peter Perreiah
### **What Happy Choice does:**
For groups choosing between numerous options, Happy Choice puts the power of an advanced decision making algorithm in the palm of your hand.  Happy Choice finds the best option that maximizes total group satisfaction.   
### **How it works:**
A group member inputs a decision to be made and describes each of the nominated choices.  Invitations to vote on the decision are emailed to group members.  Voters then allocate their 100 preference points between the available choices and submit their ballots.   Happy Choice takes if from there. 

Votes are tallied for each choice and the lowest scoring choices are eliminated on succeeding rounds.   Voters do not lose points allocated to choices that are eliminated, since these point are reallocated to their remaining preferences.  Points can only be lost by a voter, if the voter is indifferent to the remaining choices (i.e. they have scored every remaining choice as a zero).   Happy Choice continues to execute voting rounds until two choices are left: a winner and a second place.  Finally, the results of each round are displayed to all group members.
### **Technologies Deployed:**
Javascript, React, Materialize, HTML, CSS, Express, MongoDB, Mongoose, AXIOS, Heroku, Node Mailer
### **Try out this app:**

* *Test on the Heroku server*
1) Copy & paste this link into your browser:  https://testhappy.herokuapp.com
2) Create an account by entering your Name, email and password, then press ‘Create Account.’
3) Use your email and password to sign in to your new account.
4) Click ‘Create New Survey’ to describe a decision, list choices and enter the emails of voters to be invited.  Then click ‘Send’ to email the decision to each participant.
5) Participating voters will then open their email invitations, allocate their 100 points to the choices and submit their ballots.
6) Results will then display on the decision maker’s account page.


* *Test Locally: note this app requires voters be able to submit their ballots to a common server, like Heroku.  However, an example of a decision can be viewed from data already seeded in the database.  A user can also create a decision and email herself multiple invitations to vote as a simulation.  The app will run locally and display the votes of the local instance.*
1) Create a directory on your local machine to store the Happy!Choice app.
2) On GitHub, clone this directory.
3) In bash on your local machine:
*    (a) navigate to the Happy!Choice directory, clone the GitHub directory to your local machine by running the following command in bash:  git clone <paste GitHub Happy!Choice address>
*    (b) in bash: npm init –y
*    (c) to launch the program in bash:  node server.js    This should open up a page in your browswer with the landing page of the Happy!Choice app.   
4) In the browser, Create an account by entering your Name, email and password, then press ‘Create Account.’
5) Use your email and password to sign in to your new account.
6) Click ‘Create New Survey’ to describe a decision, list choices and enter your own email address multiple times to simulate multiple voters to be invited.  Then click ‘Send’ to email the decision to each instance of your email.
7) Open your email invitations, vote the decision choices and submit.
8) After responding to all of the email invitations, you can view the results in Results page.


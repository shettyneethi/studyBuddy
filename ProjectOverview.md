# Project Overview

#### What is your project all about? What are you trying to achieve?

Our project is a web application that enables students’ to find peers, with required skills and qualifications, to help with their learning. These can include activities like homework, projects, assignment, and things not related to academics as well. On the whole, it can be viewed as a collaboration app. 

#### Features and Workflow:

We will use the term “Study Buddy” to represent any peer, which the student/user is looking for. As a user when I log in to the system, if  I want to make a request for a study buddy I will provide the details such as course, skill, message and tag it with either homework, project or assignment etc. Every user can see the buddy requests he has made in the ‘My Requests’ page. A user can express his interest in a post by clicking the interested button. As of now,  there is no limit on the number of people who can show interest to a particular post. When a user shows interest in a post, the owner of the post will be notified. The owner of the post is allowed to select among the buddies who showed interest in his post. When he finds the required number of buddies to collaborate with, he can click on the Done button and the post will be deleted from the display on the homepage. 


#### What technologies are you using?

- Project planning: Pivotal tracker
- Testing tools: unittest, pytest
- Front-End framework:  React on Node.js
- Backend framework: Flask
- Data persistence: MongoDB
- Messaging: Kafka
- Production: Google App Engine
- Continuous Integration: Jenkins
- Continuous delivery: Jenkins


#### How are you deploying your system?

We are deploying our application on Google App Engine. NodeJS and Flask are deployed as two different services. MongoDB Atlas gives us access to a cluster through a service directly. Hence, we did not deploy it manually on App Engine.

#### What design decisions have you made?

We decided to use MongoDB as most of us were familiar with it. Usage of MongoDB Atlas was a choice we made over MongoDB because we can avoid all the work and time spent on setting up the environment for MongoDB locally as well as for the deployment. Since GCP gives access to most of its features with a free 300$ credit, we chose to use it as our production environment. We chose to use React as our frontend framework as ours is more or less a single page application and React provides components that can be used to build a dynamic interface. Jenkins was chosen because of its extensive plugins and the ease of use.


#### What processes are you using to coordinate your team?

There are main processes we are using for coordination between the team-
1. Daily updates/error handling on group chat
2. Weekly project meetings
3. Pair programming for certain demanding stories

#### How is work distributed across the team? Who is doing what for each iteration?

Work is usually distributed during the start of each iteration using consensus. The stories are divided irrespective of front-end/backend division so that everyone can have their fair share of experience on each side of the development. 


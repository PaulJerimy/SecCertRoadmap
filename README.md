# Security Certification Roadmap
An interactive HTML/CSS version of the Security Certification Roadmap found at https://pauljerimy.com/security-certification-roadmap/

This version is a rebuild of the CSS version using React.js. The goal of this version is to first build a framework for interactivity, then add features for education and career management.

If you have resources, tutorials, or a desire to accomplish the planned features below, please let me know.

Email:    paul@pauljerimy.com

Twitter:  https://twitter.com/PaulJerimy

LinkedIn: https://www.linkedin.com/in/paul-j-morgan/

## Current Progress
- Started the dev branch with React / Azure App Service starter code
- Set up an Azure tenant to host the web application
- Set up a test environment at https://www.credentialgap.com linked to Azure
- Created the CosmosDB (NoSQL)
  - Created a JSON object for certifying agency data in the ../CredData folder
  - Could not get connected to the CosmosDB with Javascript - will use the JSON locally until I sort that out

## Current Effort
- Organize and enter JSON objects for every certification
- Plan a strategy to build the chart with Javascript/React
  - I am considering building a JSON with the current chart data, then call it dynamically with Javascript to fill in a CSS Grid. This may cause problems adapting to a more dynamic system later, but it'll get me started.

## Planned Feature
- Certification database
  - Create a database with data for each domain, certifying agency, certification, exam, and keywords
  - Add data for each Certification
  - Add additional data
- Procedural chart building
  - Addition of a certification scoring system
  - Add certifications to the chart based on scores
  - Build consistent readability rules into certification placement
- Certification Filtering
  - Highlight based on selectors such as agency, security domain, and personal criteria
  - Allow searching for keywords in the database
  - Filter out certifications based on user input and redraw using procedural rules
- Chart templates
  - Add additional default layouts based on other frameworks such as CompTIA or SABSA
  - Create recommended training path templates
  - Print templates for different paper types
- Personalized charts
  - Utilize cookies to allow viewers to create their own chart
  - Allow tagging for past / current / future goals
  - Allow tagging for individual rankings
- Resource linking
  - Add linking to training resources
  - Add linking to mentions in social media
  - Add linking to mentions on blogs / other engagement
- Career recommendations
  - Templates with certification flows matched to job roles
  - Analysis of completed certifications and desired positions to recommend certification flows
  - Inclusion of non-certification recommendations such as positions, degrees, and skillsets
  - Certification recommendations based on current and desired skills
  - Skills recommendation based on current and desired certifications

## Relational Database Design
- I will adapt this to a NoSQL design
![Database design](https://pauljerimy.com/OC/DBDesign20201118.png)

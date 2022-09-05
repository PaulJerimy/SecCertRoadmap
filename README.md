## Security Certification Roadmap Alpha Build
Interactive version of the Security Certification Roadmap found at https://pauljerimy.com/security-certification-roadmap/

Building a Javascript/React version of the above CSS chart to allow dynamic building options such as filtering, highlighting, searching, and persaonalized charts.

I am a cyber guy with system infrastructure experience. My coding experience consists of bash and powershell scripts and two Java courses in college. I've been studying Javascript and am moving on to study React now.
 
Any help is very welcomed!

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

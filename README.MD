# Security Certification Roadmap
An interactive HTML/CSS version of the Security Certification Roadmap found at https://pauljerimy.com/security-certification-roadmap/

This version will rebuild the roadmap dynamically using React.js and the existing CSS. The goal of this version is to first build a framework for interactivity, then add features for education and career management.

If you have resources, tutorials, or a desire to accomplish the planned features below, please let me know.

Email:    paul@pauljerimy.com

Twitter:  https://twitter.com/PaulJerimy

LinkedIn: https://www.linkedin.com/in/paul-j-morgan/

## Current Issues
- Unable to authenticate with the CosmosDB. Error:
  - code: 'Unauthorized',
    message: 'Required Header authorization is missing. Ensure a valid Authorization token is passed.
  - Primary key has been entered. Looking into what else I need to pass in.
- Need to develop logic to build chart based on how many elements (certificates) it finds in the DB. Will add segrating them into domains later.

## Current Progress
- A development environment is set up at www.credentialgap.com and linked to the dev branch of this repo
- Created Azure tenant to host web application
  - Azure Web App Service online
  - Azure CosmosDB online
  - Azure Storage online
- CosmosDB schema drafted - see raw JSONs in the CredData folder
  - agencyInfo.JSON ready and inputted into the DB
  
## Next Steps
- Connect database to front end so we can pull data
- Add certification data to JSONs
- Add JSONs to DB
- Start Javascript logic for building a CSS Grid from data pulled from the DB
  - Count all certs and determine how many rows and columns the grid should be
    - Maybe I hard set this to the existing 27 x 39 and just build the chart from the bottom left corner
    - When building count logic, make sure to be mindful that restriction logic will be added later
  - Determine how many columns each domain needs
  - Determine how many columns each sub-domain needs (remove if 0)
  - Add certs to the chart and color based on their primary domain
    - Certs of a certain domain need to stay in their domain columns
    - Some placeholder ranking needs to be entered into the cert JSON until ranking systems are fleshed out
  - Add domain lines around each domain's columns
    - padding needs to be programatically added between columns of different domains
  
## Development Roadmap
- Certification database
  - Create a NoSQL database - CosmosDB (Complete)
  - Add data for each Certifying agency (Complete)
  - Add data for each Certification
  - Add KSAs from NICE Cybersecurity Workforce Framework
  - Add Work roles and tasks from NICE Cybersecurity Workforce Framework
  - Integrate DB with React.js site
- Procedural chart building
  - Build chart dynamically
    - Build chart based on all certifications
    - Allow limiting certifications included on build by attribute
      - By Agency
      - By keyword
      - By exam type (Multiple choice vs practical)
      - By price
      - By prerequisite (other Certs required, course required, ect)
      - By score (dependent on scoring system feature)
      - By IT Career Roadmap job titles
      - By NICE KSAs
      - By NICE Work Roles
      - By SFIA skills
- Certification Filtering
  - Highlight based on attributes such as agency, security domain, and personal criteria
  - Allow searching for keywords in the database - highlight the matching certifications
  - Addition of a certification scoring system
    - Determine programmatic scoring layers
      - Syllabus based
        - Crawl syllabus and assign score to keywords based on domain.
        - How do I make this fair?
        - How do I prevent agencies from fluffing their syllabus to trick the score?
        - What about agencies who have limited to no syllabi?
      - Social media reputation
        - Start with manually curated score
        - Add automatic crawling based on searches / mentions / keyword associations
        - Use custom roadmaps to aide reputation score.
      - Job board presence
        - Check how often certs are mentioned in job board posts
        - Check how often KSAs for certs are mentioned in job board posts
        - Buy data from Foote Partners and use for scoring scheme
      - Voting system
        - Create score based on the votes of site users
    - Allow adding retired certifications back to the roadmap
  - Add certification reputation voting
    - Add ^ and v buttons to certifications to allow people to vote for its position to go up or down
    - Store the votes and allow people to add the vote scoring layer when building the chart
    - Don't add this by default, but perhaps include the votes in the social media reputation score equation
  - Build consistent readability rules into certification placement
    - Show certification in only the primary domain by default
    - Add an attribute to the cert's JSON saying how much the cert falls into each of the domains. Allow certs with minimum scores for domains to extend over those domains by default. Allow toggling this off.
    - Allow users to select cross domain placement by toggle. 2 domains, 3 domains, 4 domains, ect
- Chart templates
  - Add additional default layouts based on other frameworks such as CompTIA or SABSA
  - Create recommended training path templates
  - Print templates for different paper types
- Personalized charts
  - Utilize cookies to allow viewers to create their own chart
  - Upgrade to login accounts to save their information, roadmaps, and career plans
  - Allow tagging for past / current / future goals
  - Allow options to rank on personal score weights
  - Add drag and drop reordering
  - Code an evaluation of all custom roadmaps to determine most popular charts & use in reputation scoring
  - Have a page displaying the most popular custom roadmaps
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
- Automate certification information updates
  - Pull updates from Credential Engine
  - Build APIs to or web scrappers of certification agencies to get updated information
  - Build an authenticated way for certification owners to update their information manually
- Job board integration
  - Check job boards to see how often certs and their KSAs are mentioned in job postings
  - Check job boards for how much positions that require certs are paying.
    - Compare against similar posts that don't have the cert listed
    - Gather data to see if certain KSAs add value
  - Check salary / glassdoor / linkedin for salaries of job titles commonly asking for certs and their KSAs
    - This data is also available from Foote Partners for a fee

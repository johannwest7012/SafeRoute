# SafeRoute


## Inspiration

My inspiration for building SafeRoute was to make it easy for people to stay informed to make the best decisions possible when traveling. Previously, while there are many great resources to research safety and personal freedoms when travelling abroad, I have always found them to lack any sort of intuitive user interface to present the data. In fact the data source SafeRoute utilizes, the CATO Human Freedom Index, is only available as an Excel spreadsheet, JSON file, or PDF download. All of which are cumbersome for end point users, especially in the modern day. 

## What it does

SafeRoute is a webapp that allows users to put in their travel iterary and receive relevant information regarding safety and personal freedoms of the countries they might want to travel to, all with an intuitive UI. 

SafeRoute makes it easy to stay aware, giving the user the intel needed to craft their next journey on their terms, safely. 

## How we built it


As I approached the project, I knew there would be three main areas to cover to produce the finished product. 

1. The frontend map component, which needed to be interactive and be capable of rerendering quickly, and also support geoJson data to allow for countries borders to be drawn, and popups to be tied to coordinates on the map. 

2. The source data. This includes both the data collected from the CATO Human Freedom Index, and also geoJson data defining both coordinates and properties for each country geoJson object. Neither of these were acessible by any API endpoints that I could find, so I was going to need to build a database and build my own APIs. I tried many ways of aggreating the necessary data, and in the end I ended up having two data collections, one for the geoJson polygons, and one for the Human Freedom Index data. Both of these had to be manually inserted into MongoDb Atlas. 

3. Rest API system to first aggregate all necessary data points, and then allow that data to be accessed by the frontend map upon the user altering the input of their selected destinations. I ended up creating endpoints to first initialize the database with geoJson and Human Freedom Index objects for each country, and then endpoints to retrive both of those. 

I chose React.js for the frontend, since it had quality support for the maplibre library which I had researched and expected to be a good solution for what I wanted to do. I had support for popups, was interactive, and utilized geoJson. I chose MongoDB for the database, as my biggest concern was staying flexible with the data schema. I was still unsure how exactly I was going to aggregate the data, so using MongoDB over a traditional relational database was beneficial to me. I chose Express.js for the backend, mainly so I had the benefit of staying consistent to the javascript syntax, while still having enough functionality to achieve my goals. 




## Challenges we ran into

One challenge that took me too long to overcome was getting the polygon geoJson data into MongoDB. These were json files, but the problem was that the file I needed was over 20mb large. This was too large to have VS code to index, so I needed to store it in a real db. However, it was too large to upload to MongoDB in a single try, so I had to first split the file in half using a script, and then upload both halves to MongoDB. It was a rough solution but it worked. I would say my weakness was how I handled the data overall. It ended up being operational but quite messy. Planning it out better before starting to tackle it would have benefited me, and I learned a lesson with the 20mb json file struggle. 


## Accomplishments that we're proud of

While data was were I struggled and could have done better, I was very proud of my frontend development for this. The map, while being mostly an imported library, looked and worked great, and the search bar and the country cards in the sidebar all looked great, had nice hover animations, I even gave the X button a nice hover animation. Also its a small detail, but the button on the landing page is very nice.

## What we learned

My biggest consious lesson was to plan out data schemas and what I am going to do to source and handle the data before building out systems reliant on that data, I actually started with the frontend, new I needed some sort of geoJson mixed with the statistics, and then started the backend, which looking back was backwards. 

## What's next for SafeRoute

I did not have time to get it deployed somewhere, but I would love to get this deployed and keep it up if I can find a low cost hosting option. Would love to have this accessible to show potential employers. There are a few features I did not get to that I would love to get to, most of it is design oriented. The theme of this application was that this was all data you could find on the internet, but having it in this accessible manner was a benefit. 

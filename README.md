# Owls of Bavaria

This is a web mapping application to display owl sightings in Bavaria using data from iNaturalist.

This project is still in progress, but you can [view the current version of the project here](https://owls-of-bavaria.pages.dev/).

## About

This web mapping application is being built in honor of my mother who enjoys birding and is really into owls. The application takes owl observation data from iNaturalist and displays it on a map. The observations generally come with images and the names of the owl species and zooming in on the location allows birders to see, where owl observations are being made in their area. Users can currently filter the observation by owl species. It is also intended to motivate users to go out and make their own animal observations which they can then add to iNaturalist where is can be used by scientists. 

Future additions will come with more information about the owls and options to filter by dates.

## Tools Used

* React using Vite
* Redux
* ESRI's ArcGIS Maps SDK for JavaScript
* iNaturalist API

## Showcase

In a neutral state the page shows the map with all of the observations on the right and a list of the owl species observed with observation counts on the left.


![](docs_images/OwlsBavariaFullSite.png)

After selecting an individual owl observation from the map, a popup appears with an image of the observation and related information.

![](docs_images/OwlsBavariaObservation.png)

You can filter the observations by species by selecting the filter button on the species card that you want to see. This will highlight observations of the relevant species and grey out all other observations.

![](docs_images/OwlsBavariaFiltered.png)

On the mobile version of the website, the map moves to the bottom of the page and the owl species cards move to a horizontally scrollable section at the top.

![](docs_images/OwlsBavariaMobile.png)

When opening features on the mobile version of the website, the popup shows up below the map and can be expanded by clicking the arrow on the right.

![](docs_images/OwlsBavariaMobileObservation.png)
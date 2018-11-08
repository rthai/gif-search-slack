# GIF Search

A single page web application that displays trending GIFs on Giphy. Now, with Slack sharing.

Demo

![](https://thumbs.gfycat.com/WhisperedAmbitiousAmurminnow-size_restricted.gif)

Responsive

![](https://thumbs.gfycat.com/ImpressiveWeepyBarbet-size_restricted.gif)

Share to Slack

![](https://thumbs.gfycat.com/FaintSophisticatedBull-size_restricted.gif)

## Features

* Responsive web design for desktop, tablet, and mobile devices with flexbox and media queries.
* Sort by ascending or descending upload dates.
* GIFs are displayed in a grid gallery.
* Select your favorite GIFs by hovering over a GIF and clicking the check mark. See them in the 'Favorites' page.
* Upload to Giphy
* Search bar is powered by Giphy Search.
* Share GIF to slack: Clicking a GIF brings up a lightbox with a 'Share to Slack' button that will post a message on the Slack workspace associated with the webhook


## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

```
Node v8.11.1 or newer
npm 5.6.0 or newwer
```

### Installation Overview

1. git clone
1. npm install
1. create a .env file in the root folder
1. npm start


### Creating .env file

This project uses environment variables. 

A dummy .env file, `.env.copy` is included in the root folder of the repository. Make a copy of `.env.copy` and rename `.env.copy` to `.env` and insert your Giphy API key. 

This is to prevent exposing your personal API key to the public. Only the dummy file will be pushed. 

```
// .env

REACT_APP_GIPHY_API_KEY=yoursecretcodehere
```

### Running the tests

```
npm test
```

## Deployment

Docker files included


## Built with

* [create-react-app](https://github.com/facebook/create-react-app)
* [react-router](https://reacttraining.com/react-router/)
* [react-grid-gallery](https://benhowell.github.io/react-grid-gallery/)

## Future Improvements
In no particular order...
* Expand upload to include files
* State management is a bit messy. Refactor with redux.
* Clean up CSS with [styled-components](https://www.styled-components.com/). (in progress)
* Refine gallery: customize react-grid-gallery
* Customize GIF message to post to Slack
* Lazy loading to improve network performance: will alllow app to get higher quality GIFs instead of loading the lower quality preview GIFs
* Pagination on scroll: when user scrolls to the bottom of the page, get more GIFs (in progress)
* More testing
* Prevent memory leak when component unmounted
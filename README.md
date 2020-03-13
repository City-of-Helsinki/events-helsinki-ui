This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Event Helsinki client UI / SSR server

## Development with Docker

To build the project, you will need [Docker](https://www.docker.com/community-edition).

Building the project

    cp .env.example .env
    docker-compose build

Starting the application

    docker-compose up -d

The web application will run on http://localhost:3000

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

Both client ssr server and client are built

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn start:server`

Runs the app in the production mode. Client ssr express server is used to serve the application<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn update-sitemaps`

Fetches events data from Linkedevents and collections data from cms and generates sitemaps for Google. See `.env` for configuration.

Sitemaps will be used when MVP is released. This script should be added to docker production build in the future. Sitemaps should be added only in production.  

### `yarn lint`

Run linter to all the files in app

### `yarn format-code`

Fix all the linter errors

## Debugging

### Debugging project in VS Code

To debug in VS Code:

1. Install the "Debugger for Chrome" extension to VS Code
2. Run `yarn start`
3. Set a breakpoint
4. Run "Chrome" debug configuration in VS Code
5. Reload the project in your browser

### Debugging Tests in VS Code

No plugin is needed.

1. Set a breakpoint
2. Run the "Debug tests" debugger configuration

### Debugging Tests in Chrome

We recommend using VS Code's debugger.

1. Place a `debugger;` statement in any test
2. Run yarn `test:debug`
3. Open `about:inspect` in Chrome
4. Select `inspect` on you process, press Play and you're good to go.

See more detailed instructions here:
https://create-react-app.dev/docs/debugging-tests#debugging-tests-in-chrome

### Debugging social media metadata

Facebook, Twitter and LinkedIn all provide a debugger you can use to see how each platform's scraper would format a given link for your page.

- Facebook: https://developers.facebook.com/tools/debug/ (requires Facebook login)
- Twitter: https://cards-dev.twitter.com/validator (requires Twitter login)
- LinkedIn: https://www.linkedin.com/post-inspector/inspect/ (requires LinkedIn login)

The addresses you provide for these tools need to be accessible for them. In other words, you can't use localhost directly.

You have at least two good strategies:

- use the staging server to run your code in a place that is accessible for these tools
- use a tunneling solution which allows you to expose localhost to the outside world

Two popular options are [ngrok](https://ngrok.com/) and [localtunnel](https://www.npmjs.com/package/localtunnel). `ngrok` does not work with Facebook's tool.

## Notes about social media sharing

The app includes controls that can be used to share pages on social media. In essence, these are integrations to different social media platforms. In this section of the readme, we will go over how these integrations are expected to behave and what logic was used when applying the metadata.

### Server Side Rendering and scraping

Social media platforms rely on scrapers to find metadata they can use to enrich links which are shared on their platform. It's beneficial to conform to these metadata requirements, because they allow for the shared content to be displayed in a way that is more engaging.

To our reprieve, server side rendering means that we can offer the correct content for the scrapers with relative ease. If you set tags from within the client code with `react-helmet`, the changes should be visible to scrapers as long as they are part of the content that gets rendered when a page is first accessed.

However, you have to keep in mind that scraping will only work when you are making use of server side rendering. With client side rendering, the meta tags won't be available during first the response. This makes developing, testing and debugging more cumbersome for these features.

### Canonical url

Because of SSR, we can't rely on client side information about current the current path. Instead, we have to use properties found from the request object of Express on the server side.

For now, canonical urls are applied for all pages on the server side of the code.

### Commonly used metadata and the expectations platforms have form them

Facebook is the original entity behind the Open Graph initiative and makes use of it for its sharing API. Although Twitter provides its own dialect for declaring metadata, it can also read Open Graph tags. LinkedIn also relies on Open Graph tags.

That's why the three most important tags are `og:title`, `og:description` and `og:image`. On top of these Facebook requires `og:url` whereas Twitter strongly recommends `twitter:card`.

When applying Open Graph tags, be mindful of using `property` instead of `name`.

```jsx
<meta property="og:title" content="Lorem ipsum..." />
```

**`og:title`**

`Facebook`: The title of your article without any branding such as your site name. <sup>[1]</sup>
`Twitter`: Title of content (max 70 characters) <sup>[2]</sup>  
`LinkedIn`: Title of the article <sup>[3]</sup>

**`og:description`**

`Facebook`: A brief description of the content, usually between 2 and 4 sentences. This will displayed below the title of the post on Facebook. <sup>[1]</sup>  
`Twitter`: Description of content (maximum 200 characters) <sup>[2]</sup>  
`LinkedIn`: Description that will show in the preview <sup>[3]</sup>. Minimum of 100 characters according to debugger.

**`og:image`**

`Facebook`: Facebook: The minimum allowed image dimension is 200 x 200 pixels, the size of the image file must not exceed 8 MB, use images that are at least 1200 x 630 pixels for the best display on high resolution devices. At the minimum, you should use images that are 600 x 315 pixels to display link page posts with larger images. <sup>[1]</sup>  
`Twitter`: (For a summary card) A URL to a unique image representing the content of the page. You should not use a generic image such as your website logo, author photo, or other image that spans multiple pages. Images for this Card support an aspect ratio of 1:1 with minimum dimensions of 144x144 or maximum of 4096x4096 pixels. Images must be less than 5MB in size. The image will be cropped to a square on all platforms. JPG, PNG, WEBP and GIF formats are supported. Only the first frame of an animated GIF will be used. SVG is not supported. <sup>[2]</sup>  
`LinkedIn`: Max file size: 5 MB, Minimum image dimensions: 1200 (w) x 627 (h) pixels, Recommended ratio: 1.91:1. <sup>[3]</sup>

### Explanations for platform specific metadata

**`twitter:card`**: (Twitter) The card type, which will be one of “summary”, “summary_large_image”, “app”, or “player”. <sup>[4]</sup>

**`og:url`**: (Facebook) The canonical URL for your page. This should be the undecorated URL, without session variables, user identifying parameters, or counters. Likes and Shares for this URL will aggregate at this URL. For example, mobile domain URLs should point to the desktop version of the URL as the canonical URL to aggregate Likes and Shares across different versions of the page. <sup>[1]</sup>

**`fb:app_id`**: (Facebook) In order to use Facebook Insights you must add the app ID to your page. Insights lets you view analytics for traffic to your site from Facebook. Find the app ID in your App Dashboard. <sup>[1]</sup> _We do not need to include the app ID in the meta information for sharing to work. We need to pass it when we want to share from within our application. If we apply it in the metadata, Facebook is able to provide better metrics about sharing in our application._

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

---

[1] https://developers.facebook.com/docs/sharing/webmasters/#markup  
[2] https://developer.twitter.com/en/docs/tweets/optimize-with-cards/overview/markup  
[3] https://www.linkedin.com/help/linkedin/answer/46687/making-your-website-shareable-on-linkedin?lang=en  
[4] https://developer.twitter.com/en/docs/tweets/optimize-with-cards/guides/getting-started

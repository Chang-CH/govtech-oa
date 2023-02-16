# Govtech Online Assessment submission: Chang Chuan Hao

Submission for *Financial Planning Digital Service – Technical Take-Home Assessment*, Govtech 2023

## Setup guide

### Installation

1. Make sure you have the latest version of [nodeJs](https://nodejs.org/en/). This project was built on version `v16.13.1`.
2. Install [pnpm](https://pnpm.io/installation).
   - For windows, powershell: `iwr https://get.pnpm.io/install.ps1 -useb | iex`
   - For POSIX systems: `wget -qO- https://get.pnpm.io/install.sh | sh -` or `curl -fsSL https://get.pnpm.io/install.sh | sh -`
3. Install dependencies: run `pnpm install`.

### Start development server

1. run `pnpm dev`

### Build production build

1. run `pnpm build`
2. build output is `/dist`
3. To serve the output locally, make sure you have `serve` installed: `npm install -g serve`
4. enter the `dist` directory: `cd dist`
5. run serve: `serve -s`

## Changes made

### Merge weather component with location list

**Reason for change**: Weather component is sticking out for react web version, which looks awkward.

**Changes made**: Weather data has been moved into the location table, such that for each camera location
we also know the weather at the location at the point in time. To compensate for the added length of each
 entry in the table, camera ID is hidden when a mobile viewport is detected.

## Assumptions

1. We assume date should not be in the future. The API will return us empty results anyways, so we disable dates ahead of the current date in `DatePicker`.

## Design considerations

1. Displaying weather all in one: In this app, weather data is joined with camera data. I feel that it allows users to instantly see weather data immediately without having to click on a table entry, which might feel cumbersome. Since the returned dataset is not too big (~90 camera entries, ~50 weather), joining with a simple for loop should not be too computationally intensive, especially since date and time cannot be changed so fast. We can optimize this in the future by creating a hashmap from location to weather in the future for O(n) access.
2. Filters for camera and location: The most likely use case for this app is likely for a person to view the cameras (or weather) near their location. Filters would help with that. Location filter is regenerated from each query, as opposed to being hardcoded as a constant. This is done so that in the even location data changes in the future, the filter would still work. If performance becomes an issue we can update location filters only once on startup.
3. Pagination: Since the returned data is very long, it makes sense to paginate. default page size is kept to 5 since most locations do not have more than 5 cameras anyway.

## Project setup

- This project is structured with extensibility in mind. Reusable stuff (shared components, shared constants, shared styles) are kept outside of the pages folder with resolve aliases set up so new pages and components can easily access them.
- Code splitting: the `/traffic` page is lazily imported to allow bundle sizes to be kept small, only importing resources of pages we need. while this app is only a single page at the moment, as more pages get added in the future this will gain importance.
- minify: we use `build.minify` to compress file sizes produced by vite
- uglify: CSS class names are uglified to shorten the names as well as hide internal class names from clients. Class names are a combination of file path, file name, class name and hash in development build to identify problematic css.
-  


# Govtech Online Assessment submission: Chang Chuan Hao

Submission for *Financial Planning Digital Service – Technical Take-Home Assessment*, Govtech 2023

## Setup guide

### Installation

1. Make sure you have [nodeJs](https://nodejs.org/en/) installed. This project was built on version `v16.13.1`.
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

### Testing

1. run `pnpm test`

## Changes made

### Merge weather component with location list

**Reason for change**: Weather component is sticking out for react web version, which looks awkward.

**Changes made**: Weather data has been moved into the location table, such that for each camera location
we also know the weather at the location at the point in time. To compensate for the added length of each
 entry in the table, camera ID is hidden when a mobile viewport is detected.

## Assumptions

1. We assume date should not be in the future. The API will return us empty results anyways, so we disable dates ahead of the current date in `DatePicker`.

## Design considerations

1. Displaying weather all in one: In this app, weather data is joined with camera data. This will improve UX since users can see weather data immediately. Since the returned dataset is not too big (~90 camera entries, ~50 weather), performance trade off is justifiable.
2. Filters for camera and location: The most likely use case for this app is likely for a person to view the cameras (or weather) near their location. Filters would help with that.
3. Pagination: Since the returned data is very long, it makes sense to paginate. default page size is kept to 5 since most locations do not have more than 5 cameras anyway.
4. Handling load state: since we need to query multiple APIs, using an enum to represent fetch status is not good enough. For example, we get `api1` and `api2`, if `api1` returns and sets loading state to true when `api2` has yet to return we are incorrectly setting load states. To handle this we use a number to represent the number of APIs we are waiting for instead.

## Project setup

- This project is structured with extensibility in mind. Reusable stuff (shared components, shared constants, shared styles) are kept outside of the pages folder with resolve aliases set up so new pages and components can easily access them.
- Code splitting: the `/traffic` page is lazily imported to allow bundle sizes to be kept small, only importing resources of pages we need. while this app is only a single page at the moment, as more pages get added in the future this will gain importance.
- minify: we use `build.minify` to compress file sizes produced by vite
- uglify: CSS class names are uglified to shorten the names as well as hide internal class names from clients. Class names are a combination of file path, file name, class name and hash in development build to identify problematic css.
- autoprefixer: autoprefixer is added to translate modern css syntax into legacy compatible syntax with vendor prefixes (-webkit-*) where applicable to try and improve backwards compatibility

## Tech stack

1. React: I have the most experience with this compared to vue or angular.
2. Vite (+pnpm): essentially a more performant webpack. Decreases build times by a lot, and has hot module replacement configured out the box.
3. Ant design: UI framework. While ant lacks the expressiveness of other libraries like Material or Chakra, I feel that its built in functionalities and overall robustness makes it ideal for this project
4. Eslint: linter for typescript files
5. Prettier: code formatter for all files
6. Husky (+lint staged): pre-commit hooks, runs eslint and prettier on relevant files before commiting.

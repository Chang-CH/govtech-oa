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

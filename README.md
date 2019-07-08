# Gas Station Network Site

The official front end for the Gas Station Network.  The current staging site is [here](https://gsn-staging.netlify.com)

You can run the project against a local Tabookey-Gasless instance. More on that project [here](https://github.com/tabookey/tabookey-gasless)

# Setup

1. tabookey-gasless Setup:

In your local tabookey-gassless project install the dependencies with `yarn` (or `npm`).

Make sure Docker is installed and ready, then run `yarn gsn-dock-relay-ganache`.

Leave the tabookey-gasless server running and look at the CLI output for the RelayHub contract address. It will look something like:

`2019/07/08 17:32:20 RelayHttpServer.go:244: Using RelayHub address: 0x9C57C0F1965D2259...`

The address starting with "0x9C..." is what we need to copy and paste into the app to use.

2. Install 'gsn-site' dependencies:

```
$ yarn
```

To run the local server, run:

```
$ yarn dev
```

To build the production version of the site run:

```
$ yarn build
```

##### Made with :heart: by [Delta Camp](https://delta.camp)

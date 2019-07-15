# Gas Station Network Site

The official front end for the Gas Station Network.  The current staging site is [here](https://gsn-staging.netlify.com)

You can run the project against a local Tabookey-Gasless instance. More on that project [here](https://github.com/tabookey/tabookey-gasless)

# Local Setup

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

# Production Deployment

The app can currently be deployed to Netlify.  Url re-write rules are required so that static pages can serve dynamic urls.  The url re-write configuration lives in `netlify.toml`.

To build the production version of the site run:

```
$ yarn build
```

# Configuring the built-in RelayHub addresses

The directory `networks` contains a configuration file for each network the contracts are deployed to.  Network files are named according to the network id: contracts for mainnet live in `networks/1.json`, contracts for rinkeby live in `networks/4.json` etc.

Network files are JSON formatted and the expected structure is an array of objects.  For example:

```
[
  {
    "contractName": "RelayHub",
    "address": "0x4FC8ac0210527bCA8c5C66a595Da78B428862276"
  }
]
```

You can add and edit the network config files to add new RelayHubs.  Only one RelayHub per network is supported by the application.

##### Made with :heart: by [Delta Camp](https://delta.camp)

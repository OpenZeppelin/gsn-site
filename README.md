# Gas Station Network Site

The official front end for the Gas Station Network.  The staging site is [here](https://gsn-staging.netlify.com).

# Local Setup

The GSN site can be run locally using just a few commands:

```
# install dependencies
yarn
```

```
# Start up the local server
yarn dev
```

Now navigate to `http://localhost:3000` in your browser.  You'll be able to build against test nets such as Rinkeby.

For full control over the smart contracts you'll want to setup the Gas Station Network locally.

## Gas Station Network Test Environment

Setup a local clone of [tabookey-gasless](https://github.com/tabookey/tabookey-gasless).  

Once the dependencies are set up you can run:

```
./restart-relay.sh
```

This will start up a local ganache, deploy the contracts, create a sample recipient, and create a relay.

To mint Ether to yourself on the ganache instance, use the command:

```
./scripts/ganache-fund.js 10 0x1234...
```

Replace `0x1234...` with your address.

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

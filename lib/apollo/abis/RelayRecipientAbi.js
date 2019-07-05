export default [
  {
    "constant": true,
    "inputs": [
      {
        "name": "relay",
        "type": "address"
      },
      {
        "name": "from",
        "type": "address"
      },
      {
        "name": "encodedFunction",
        "type": "bytes"
      },
      {
        "name": "gasPrice",
        "type": "uint256"
      },
      {
        "name": "transactionFee",
        "type": "uint256"
      },
      {
        "name": "approval",
        "type": "bytes"
      }
    ],
    "name": "acceptRelayedCall",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "relay",
        "type": "address"
      },
      {
        "name": "from",
        "type": "address"
      },
      {
        "name": "encodedFunction",
        "type": "bytes"
      },
      {
        "name": "success",
        "type": "bool"
      },
      {
        "name": "usedGas",
        "type": "uint256"
      },
      {
        "name": "transactionFee",
        "type": "uint256"
      },
      {
        "name": "preRetVal",
        "type": "bytes32"
      }
    ],
    "name": "postRelayedCall",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "relay",
        "type": "address"
      },
      {
        "name": "from",
        "type": "address"
      },
      {
        "name": "encodedFunction",
        "type": "bytes"
      },
      {
        "name": "transactionFee",
        "type": "uint256"
      }
    ],
    "name": "preRelayedCall",
    "outputs": [
      {
        "name": "",
        "type": "bytes32"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getHubAddr",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getRecipientBalance",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "origSender",
        "type": "address"
      },
      {
        "name": "msgData",
        "type": "bytes"
      }
    ],
    "name": "getSenderFromData",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getSender",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getMessageData",
    "outputs": [
      {
        "name": "",
        "type": "bytes"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
]
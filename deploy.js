const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
    'sting pupil lottery satoshi perfect innocent tiger crisp enable delay smooth orchard',
    'https://rinkeby.infura.io/v3/2941a6bf73df4fd7aaa05984b6692e84'
)

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log("Attempting to deploy from account ", accounts);

    const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data: bytecode, arguments: ['Hi There!']})
    .send({gas: '1000000', from: accounts[0]})

    console.log('Contract deployed to', result.options.address);
};

deploy()
    .catch(error => console.log(error.message))

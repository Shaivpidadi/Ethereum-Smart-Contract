const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const {interface, bytecode } = require('../compile');

const web = new Web3(ganache.provider())

let accounts;
let inbox;

beforeEach(async() => {
    accounts = await web.eth.getAccounts();

    inbox = await new web.eth.Contract(JSON.parse(interface))
    .deploy({data: bytecode, arguments: ['Hi There!']})
    .send({from: accounts[0], gas: '1000000'});
});

describe('Inbox', () => {
    it('diploys a contract', () => {
        assert.ok(inbox.options.address);
    });

    it('has a default message', async() => {
        const message = await inbox.methods.message().call();
        assert.equal(message, 'Hi There!');
    });
    
    it('can change the message', async() => {
        await inbox.methods.setMessage('bye').send({ from: accounts[0] });
        const message = await inbox.methods.message().call();
        assert.equal(message, 'bye');
    });
})
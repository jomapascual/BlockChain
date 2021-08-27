const {Transaction} = require('./transaction');
const {Blockchain} = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('b6871b1991d5062c39df8f1924356b4c0e6c31231cfa15e7926dd0cfce0bf804');
const myWalletAddress = myKey.getPublic('hex');

// TESTS // creating a blockchain (https://www.youtube.com/watch?v=zVqczFZr124)
let jCoin = new Blockchain();

const tx1 = new Transaction(myWalletAddress, 'to public key goes here', 10);
tx1.signTransaction(myKey);
jCoin.addTransaction(tx1);

// console.log('Mining block 1...');
// jCoin.addBlock(new Block(1, "07/21/2021", {amt: 10}));

// console.log('Mining block 2...');
// jCoin.addBlock(new Block(2, "07/22/2021", {amt: 1}));

// console.log('Mining block 3...');
// jCoin.addBlock(new Block(3, "07/23/2021", {amt: 7}));

// //console.log(JSON.stringify(jCoin, null, 4));
// console.log('is blockchain valid?' + jCoin.isChainValid());

// jCoin.addTransaction(new Transaction('address1', 'address2', 100));
// jCoin.addTransaction(new Transaction('address2', 'address1', 50));

console.log('\n Starting the miner...');
jCoin.minePendingTransactions(myWalletAddress);

console.log('\n Balance of miner is ', jCoin.getBalanceOfAddress(myWalletAddress));

// console.log('\n Starting the miner again...');
// jCoin.minePendingTransactions('miners-address');

// console.log('\n Balance of miner is ', jCoin.getBalanceOfAddress('miners-address'));

jCoin.chain[1].transactions[0].amount = 1;

console.log('is blockchain valid?' + jCoin.isChainValid());
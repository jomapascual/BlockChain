const {Block} = require('./block');
const {Transaction} = require('./transaction');
const SHA256 = require('crypto-js/sha256'); 

// creating a blockchain (https://www.youtube.com/watch?v=zVqczFZr124)
class Blockchain
{
    constructor()
    {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
        this.pendingTransactions = [];
        this.miningReward = 100;
    }

    createGenesisBlock()
    {
        return new Block("07/20/2021", "Genesis block", "0");
    }

    getLatestBlock()
    {
        return this.chain[this.chain.length - 1];
    }

    minePendingTransactions(miningRewardAddress)
    {
        // send rewards
        const rewardTX = new Transaction(null, miningRewardAddress, this.miningReward);
        this.pendingTransactions.push(rewardTX);

        // in real world, can't add all transactions (exceeds)
        // mining requires choosing which transactions to include
        let block = new Block(Date.now(), this.pendingTransactions, this.getLatestBlock().hash);
        block.mineBlock(this.difficulty);

        console.log('Block successfully mined!');
        this.chain.push(block); // add block to chain

        // reset transactions array
        this.pendingTransactions = []
    }

    // add transaction to pending transactions array
    addTransaction(transaction)
    {
        if(!transaction.fromAddress || !transaction.toAddress)
        {
            throw new Error('Transaction must contain a to and from addess.');
        }

        if(!transaction.isValid())
        {
            throw new Error('Cannot add an invalid transaction to blockchain.');
        }

        this.pendingTransactions.push(transaction);
    }

    getBalanceOfAddress(address)
    {
        let balance = 0;

        for(const block of this.chain)
        {
            for(const trans of block.transactions)
            {
                if(trans.fromAddress === address)
                {
                    balance -= trans.amount;
                }

                if(trans.toAddress === address)
                {
                    balance += trans.amount;
                }
            }
        }

        return balance;
    }

    //----old method to add block before adding transactions and reward functionality----
    // addBlock(newBlock)
    // {
    //     newBlock.previousHash = this.getLatestBlock().hash;
    //     newBlock.mineBlock(this.difficulty);
    //     this.chain.push(newBlock);
    // }

    // test method to check validity of blockchain
    isChainValid()
    {
        for(let i = 1; i < this.chain.length; i++)
        {
            const currBlock = this.chain[i];
            const prevBlock = this.chain[i - 1];

            if(!currBlock.hasValidTransaction())
            {
                return false;
            }

            if(currBlock.hash !== currBlock.calculateHash())
            {
                return false;
            }
            if(currBlock.previousHash !== prevBlock.hash)
            {
                return false;
            }
        }

        return true;
    }
}

// export class to be used in other classes
module.exports.Blockchain = Blockchain;
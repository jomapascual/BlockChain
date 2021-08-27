const SHA256 = require('crypto-js/sha256'); 

// creating a blockchain (https://www.youtube.com/watch?v=zVqczFZr124)
class Block
{
    constructor(timestamp, transactions, previousHash = '')
    {
        // this.index = index;
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash()
    {
        return SHA256(this.index + this.timestamp + this.previousHash + JSON.stringify(this.transactions) + this.nonce).toString();
    }

    // proof-of-work (https://www.youtube.com/watch?v=HneatE69814)
    mineBlock(difficulty)
    {
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0"))
        {
            this.nonce++;
            this.hash = this.calculateHash();
        }

        console.log("Block mined: " + this.hash);
    }

    hasValidTransaction()
    {
        for(const tx of this.transactions)
        {
            if(!tx.isValid())
            {
                return false
            }
        }

        return true;
    }
}

// export class to be used in other classes
module.exports.Block = Block;
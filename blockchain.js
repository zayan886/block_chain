const SHA256 = require("crypto-js/sha256");

class Block {
    constructor(blockIndex, timestamp, blockData, previousBlockHash = '') {
        this.blockIndex = blockIndex;
        this.previousBlockHash = previousBlockHash;
        this.timestamp = timestamp;
        this.blockData = blockData;
        this.hash = this.computeHash();
    }

    computeHash() {
        // calculate the hash using the SHA256 library function
        return SHA256(this.blockIndex + this.previousBlockHash + this.timestamp + JSON.stringify(this.blockData)).toString();
    }
}

class Blockchain {
    constructor() {
        // initialize the chain with the genesis block
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock() {
        // create an object of Block initialized with values for the genesis block
        return new Block(0, "01/01/2019", "Genesis Block", "0");
    }

    getLatestBlock() {
        // return the last block from the chain
        return this.chain[this.chain.length - 1];
    }

    addNewBlock(nBlock) {
        // get the hash of the latest block on the chain and assign to nBlock's previousBlockHash
        nBlock.previousBlockHash = this.getLatestBlock().hash;
        // recalculate hash
        nBlock.hash = nBlock.computeHash();
        // push this new block nBlock to the chain
        this.chain.push(nBlock);
    }

    isChainValid() {
        // iterate through each block in the chain starting from 1
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            // if the current block's previous hash is not equal to the previous block hash, return false
            if (currentBlock.previousBlockHash !== previousBlock.hash) {
                return false;
            }

            // if the current block's hash does not match to the computed hash value, return false
            if (currentBlock.hash !== currentBlock.computeHash()) {
                return false;
            }
        }
        // if all the validations pass, then return true
        return true;
    }

    getBlock(blkIndex) {
        // return the block identified by the given index
        return this.chain.find(block => block.blockIndex === blkIndex);
    }
}

let myChain = new Blockchain();
console.log('<<Adding 1st block>>');
myChain.addNewBlock(new Block(1, "09/04/2019", { qty: 15 }));

console.log('<<Adding 2nd block>>');
myChain.addNewBlock(new Block(2, "09/04/2019", { qty: 25 }));

console.log('Is chain valid?', myChain.isChainValid());
console.log('Block with index 1:', myChain.getBlock(1));


// SPDX-License-Identifier: uNLICENSED

pragma solidity ^0.8.13;

contract Transactions {
    uint256 transactionCount;

    event Transfer(
        address from,
        address receiver,
        uint256 amount,
        string message,
        uint256 timestamp,
        string keyword
    );

    struct TransferStruct {
        address sender;
        address receiver;
        uint256 amount;
        string message;
        uint256 timestamp;
        string keyword;
    }

    TransferStruct[] transactions;

    function addToBlockchain(
        address payable receiver,
        uint256 amount,
        string memory message,
        string memory keyword
    ) public {
        // add transaction to list of all transactions
        transactionCount += 1;
        transactions.push(
            TransferStruct(
                msg.sender,
                receiver,
                amount,
                message,
                block.timestamp,
                keyword
            )
        );

        // make actual transfer
        emit Transfer(
            msg.sender,
            receiver,
            amount,
            message,
            block.timestamp,
            keyword
        );
    }

    function getAllTransactions()
        public
        view
        returns (TransferStruct[] memory)
    {
        return transactions;
    }

struct UserTransactions {
    TransferStruct[] transactions;
}

mapping(address => UserTransactions) userTransactions;

function getUserTransactions() public  returns (TransferStruct[] memory) {
    uint256 counter = 0;
    for (uint256 i = 0; i < transactions.length; i++) {
        if (
            transactions[i].sender == msg.sender ||
            transactions[i].receiver == msg.sender
        ) {
            userTransactions[msg.sender].transactions.push(transactions[i]);
            counter++;
        }
    }
    TransferStruct[] memory result = new TransferStruct[](counter);
    for (uint256 j = 0; j < counter; j++) {
        result[j] = userTransactions[msg.sender].transactions[j];
    }
    return result;
}



    function getTransactionCount() public view returns (uint256) {
        return transactionCount;
    }

}

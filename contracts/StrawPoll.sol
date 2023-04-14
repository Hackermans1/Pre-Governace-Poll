
// SPDX-License-Identifier: GPL-3.0-only
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.6/interfaces/AggregatorV3Interface.sol";
import "./DemocracyInterface.sol";
import "@hyperlane/contracts/contracts/Hyperlane.sol";

contract StrawPoll {
    
    //Struct with proposal details
    struct Proposal{     
        uint256 upVotes;
        uint256 downVotes;
        string uri;
        address proposer;
        string name;        
    }
    Hyperlane hyperlaneInstance;
    
    constructor() {
    hyperlaneInstance = new Hyperlane();
  }
  //using QueryAPI provided by hyperlane to call function across both testnets.

  function transferMessage(uint256 recipientChainId, address recipientAddress, string memory message) public {
    bytes memory data = abi.encode(message);
    hyperlaneInstance.transfer(recipientChainId, recipientAddress, data);
  }
   
    //array of proposals
    Proposal[] public proposals;
    Proposal public lastWeek;

    //add a proposal's uri to address of the voter  to keep track of all those who have voted
    mapping(string => address[]) uriToUpVoterMapping;
    mapping(string => address[]) uriToDownVoterMapping;

    //directly get proposal index through uri
    mapping(string => uint) uriToProposalIndex;
    //get preimage hash from uri
    mapping(string => bytes32) uriToHash;

    //add a proposal 
    function addProposal(string memory _uri, address _proposer,string memory _name,bytes32 _hash) public{
        Proposal storage newProposal = proposals.push();
        newProposal.upVotes = 0;
        newProposal.downVotes = 0;
        newProposal.uri = _uri;
        newProposal.proposer = _proposer;
        newProposal.name = _name;
        
        uriToProposalIndex[_uri]=proposals.length-1;
        uriToHash[_uri]=_hash;
    }

    //upvote a proposal    
    function upVote(string memory _uri, address _voter) public {
        uint i=uriToProposalIndex[_uri];
        for(uint j=0;j<uriToDownVoterMapping[_uri].length;j++){
            if(uriToDownVoterMapping[_uri][j] ==_voter){
                proposals[i].downVotes -=1;                        
                delete(uriToDownVoterMapping[_uri][j]);
            }                    
        }
        if(uriToUpVoterMapping[_uri].length == 0){
            proposals[i].upVotes +=1;                     
            uriToUpVoterMapping[_uri].push(_voter);
        }
        else{
            uint256 temp = 0;
            for(uint j=0;j<uriToUpVoterMapping[_uri].length;j++){
                if(uriToUpVoterMapping[_uri][j] ==_voter){
                    temp=1;                                                 
                }                    
            }
            if(temp==0){
                proposals[i].upVotes +=1;                     
                uriToUpVoterMapping[_uri].push(_voter); 
            }
        }          
    }

    //number of likes on a particular proposal
    function getUpVotes(string memory _uri) public view returns(uint256 _upVotes){  
        uint i=uriToProposalIndex[_uri];    
        return proposals[i].upVotes;
    }

    //downvote a proposal
    function downVote(string memory _uri, address _voter) public {
        uint i=uriToProposalIndex[_uri];
        for(uint j=0;j<uriToUpVoterMapping[_uri].length;j++){
            if(uriToUpVoterMapping[_uri][j] ==_voter){
                proposals[i].upVotes -=1;                        
                delete(uriToUpVoterMapping[_uri][j]);
            }                    
        }
        if(uriToDownVoterMapping[_uri].length == 0){
            proposals[i].downVotes +=1;                     
            uriToDownVoterMapping[_uri].push(_voter);
        }
        else{
            uint temp=0;
            for(uint j=0;j<uriToDownVoterMapping[_uri].length;j++){
                if(uriToDownVoterMapping[_uri][j] ==_voter){
                    temp=1;              
                }                   
            }
            if(temp==0){
                proposals[i].downVotes +=1;                     
                uriToDownVoterMapping[_uri].push(_voter);
            }
        }
    }

    //number of dislikes on a particular proposal
    function getDownVotes(string memory _uri) public view returns(uint256 _downVotes){
        uint i=uriToProposalIndex[_uri];
        return proposals[i].downVotes;
    }

    //top contract and its details
    function topContract() view public returns(Proposal memory){
        int256 topVote=0;
        uint256 topProp=0;
        for(uint i=0;i<proposals.length;i++){
            int256 totalVotes = int256(proposals[i].upVotes) - int256(proposals[i].downVotes);
            if(topVote<=totalVotes ){
                topVote= totalVotes;
                topProp=i;
            }
        }
        return proposals[topProp];
    }

    //get the details of a contract given the uri 
    function proposalDetail(string memory _uri) view public returns(Proposal memory){
        return proposals[uriToProposalIndex[_uri]];
    }


    //number of votes in a proposal
    function noOfVotes(string memory _uri) view public returns(uint256){
        uint256 tempNumberUp;
        uint256 tempNumberDown;
        uint256 i= uriToProposalIndex[_uri];
        tempNumberDown = proposals[i].downVotes;
        tempNumberUp = proposals[i].upVotes;        
        uint256 tempNumber = tempNumberUp - tempNumberDown;
        return tempNumber;
    }

    //workaround to get price conversion of glmr to dollar
    function getPriceGLMRToDollar() view public returns(uint256){
        AggregatorV3Interface priceFeed =  AggregatorV3Interface(0xa39d8684B8cd74821db73deEB4836Ea46E145300);
        (,int256 price,,,) = priceFeed.latestRoundData();
        return uint256(price/1e8);
    }
  
    //display all proposals
    function viewAllProposals() view public returns(Proposal[] memory){      
        return proposals;
    }

    //submit for governance
    function governancePush() public payable {
        Democracy  myContract = Democracy(0x0000000000000000000000000000000000000803);
        string memory p = topContract().uri;
        bytes32 b = uriToHash[p];
        bytes memory c = abi.encodePacked(b);
        myContract.notePreimage(c);
        myContract.propose(b,4000000000000000000);   
    }

    //save last week Top contract
    //call after governancePush()
    function saveLastWeek() internal{
        lastWeek= topContract();
        proposals[uriToProposalIndex[topContract().uri]] = proposals[proposals.length - 1];
        proposals.pop();
        delete uriToUpVoterMapping[topContract().uri];
        delete uriToDownVoterMapping[topContract().uri];
        delete uriToProposalIndex[topContract().uri];
    }
    
    //show last week top proposal
    function showLastWeek() public view returns(Proposal memory){
        return lastWeek;
    }

    //if Proposer wants to remove his proposal
    function removeProposals(string memory _uri, address _voter) public {
        uint256 i=uriToProposalIndex[_uri];
        if(proposals[i].proposer==_voter){
            proposals[i] = proposals[proposals.length - 1];
            proposals.pop();
            delete uriToUpVoterMapping[_uri];
            delete uriToDownVoterMapping[_uri];
            delete uriToProposalIndex[_uri];
            return;
        }
    }
}

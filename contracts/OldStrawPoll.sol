// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.7;

// contract StrawPoll {
//     struct Proposal {
//         uint256 upVotes;
//         uint256 downVotes;
//         string uri;
//         address proposer;
//     }    
//     //array of proposals
//     Proposal[] public proposals;
//     //add a proposal's uri to address of the voter  to keel track of all those who have voted
//     mapping(string => address[]) uriToUpVoterMapping;
//     mapping(string => address[]) uriToDownVoterMapping;
//     //add a proposal
//     function addProposal(string memory _uri, address _proposer) public {
//         Proposal storage newProposal = proposals.push();
//         newProposal.upVotes = 0;
//         newProposal.downVotes = 0;
//         newProposal.uri = _uri;
//         newProposal.proposer = _proposer;
//     }
//     //upvote a proposal
//     function upVote(string memory _uri, address _voter) public {
//         for (uint256 i = 0; i < proposals.length; i++) {
//             if (keccak256(bytes(proposals[i].uri)) == keccak256(bytes(_uri))) {
//                 for (
//                     uint256 j = 0;
//                     j < uriToDownVoterMapping[_uri].length;
//                     j++
//                 ) {
//                     if (uriToDownVoterMapping[_uri][j] == _voter) {
//                         proposals[i].downVotes -= 1;
//                         delete (uriToDownVoterMapping[_uri][j]);
//                     }
//                 }
//                 if (uriToUpVoterMapping[_uri].length == 0) {
//                     proposals[i].upVotes += 1;
//                     uriToUpVoterMapping[_uri].push(_voter);
//                 } else {
//                     uint256 temp = 0;
//                     for (
//                         uint256 j = 0;
//                         j < uriToUpVoterMapping[_uri].length;
//                         j++
//                     ) {
//                         if (uriToUpVoterMapping[_uri][j] == _voter) {
//                             temp = 1;
//                         }
//                     }
//                     if (temp == 0) {
//                         proposals[i].upVotes += 1;
//                         uriToUpVoterMapping[_uri].push(_voter);
//                     }
//                 }
//             }
//         }
//     }
//     //downvote a proposal
//     function downVote(string memory _uri, address _voter) public {
//         for (uint256 i = 0; i < proposals.length; i++) {
//             if (keccak256(bytes(proposals[i].uri)) == keccak256(bytes(_uri))) {
//                 for (uint256 j = 0; j < uriToUpVoterMapping[_uri].length; j++) {
//                     if (uriToUpVoterMapping[_uri][j] == _voter) {
//                         proposals[i].upVotes -= 1;
//                         delete (uriToUpVoterMapping[_uri][j]);
//                     }
//                 }   
//                 if (uriToDownVoterMapping[_uri].length == 0) {
//                     proposals[i].downVotes += 1;
//                     uriToDownVoterMapping[_uri].push(_voter);
//                 } else {
//                     uint256 temp = 0;
//                     for (
//                         uint256 j = 0;
//                         j < uriToDownVoterMapping[_uri].length;
//                         j++
//                     ) {
//                         if (uriToDownVoterMapping[_uri][j] == _voter) {
//                             temp = 1;
//                         }
//                     }
//                     if (temp == 0) {
//                         proposals[i].downVotes += 1;
//                         uriToDownVoterMapping[_uri].push(_voter);
//                     }
//                 }
//             }
//         }
//     }
//     //value at mapping
//     // function testUp(string memory _uri) view public returns(address[] memory){
//     //     return uriToUpVoterMapping[_uri];
//     // }
//     // function testUpLength(string memory _uri) view public returns(uint256){
//     //     return uriToUpVoterMapping[_uri].length;
//     // }
//     //number of votes in a proposal
//     function noOfVotes(string memory _uri) public view returns (uint256) {
//         uint256 tempNumberUp;
//         uint256 tempNumberDown;
//         for (uint256 i = 0; i < proposals.length; i++) {
//             if (keccak256(bytes(proposals[i].uri)) == keccak256(bytes(_uri))) {
//                 tempNumberDown = proposals[i].downVotes;
//                 tempNumberUp = proposals[i].upVotes;
//             }
//         }
//         uint256 tempNumber = tempNumberUp - tempNumberDown;
//         return tempNumber;
//     }
//     //display all proposals
//     function viewAllProposals() public view returns (Proposal[] memory) {
//         return proposals;
//     }
// }
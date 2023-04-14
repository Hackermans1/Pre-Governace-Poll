# Updated:
* Latest Deployment: [Netlify](https://fastidious-sopapillas-f53247.netlify.app/)

# Wallet of bounty
0x0FBdbb708C7D8De94eB3C9c32557554476e629fd

# How to run locally

## Prereqs:
NPM.

## To run:

```
$ npm install
$ npm run start
```


# Project Story

![Landing Page](https://raw.githubusercontent.com/alluringambiguous/Frontend-StrawPoll/master/a%20landing%20page.png)
*<div align="center"> The StrawPoll Dapp</div>*

## Inspiration

Currently a minimum bond of 400 GLMR to make a proposal which is eventually refunded. Still, not all users will have easy access to 400 GLMR or feel comfortable with locking it for an indeterminate amount of time. <br>

* This financial barrier stagnates the overall improvement of the blockchain as many good ideas would be left un-proposed.
* Many community members don't put their vote in the proposal because of high fees, which is reflected in governance process as lack of representation of members who don't have enough coins. This in turn centralizes power to stakeholders with more coins.
* A good proposal that only caters only those members having less coins, might get unnoticed.
* Using <b>Hyperlane</b> we made the platform more accessable as it's functionalities are extended to multiple chains, and one doesn't need tokens from specific chain to make contribution to the governance.
<br><br>
## What it does
A strawpoll is an unofficial poll that usually takes place before a official governance poll.<br>
Our *"Straw Poll" Dapp* is a intuitive and a community-based web solution that lets users **submit, read, discuss and interact** with proposals published by other users. The exciting part is that the web platform is avaible across multiple chains thus making it more easily available <br>
The app collects proposal information (i.e. likes, dislikes, proposer etc) **on-chain**. Users can read, vote and discuss the proposals. Further, the top voted proposal is **submitted for official governance periodically**. This information is then conveyed **across all the associated chains**. <br>
 We have launched our app on the Moonbase Alpha and goerli Testnets.
 
 ![Home page](https://raw.githubusercontent.com/alluringambiguous/Frontend-StrawPoll/master/homepage.png)
 *<div align="center"> Website Homepage </div>*
 
<br><br>
## How we built it

![Architecture](https://raw.githubusercontent.com/alluringambiguous/Frontend-StrawPoll/master/architecture.png)
*<div align="center"> Dapp Architecture </div>*

### Smart Contract
We started with deploying the smart-contract on the monnbase alpha test net. The smart contract records the details of the proposals and encloses a wide variety of usable functions that provide decentralization to our project.

### Frontend
Then, we build the front-end. We designed the website on **figma** keeping in mind user accesibility. The frontend is written in react. We used **moralis** hooks to connect our smart contract to metamask wallet and to call methods on the smart contract. We have also added packages that provide personalised profile pictures.

### Hyperlane
Hyperlane connects your applications across many blockchains. This allows users to interact with your application from the chain they're on. Reducing the amount of hoops they have to jump through just to get to your app. It's about abstracting away the complexity of navigating between chains, and letting you and your users simply focus on your app.
Here Hyperlane plays a important part as it help the platforms to be function on multiple chains, thus being true to the original purpose of being easy to access. Here, we use QueryAPI provided by hyperlane to call function across both moonbase alpha and goerli testnets.

### IPFS for Data Storage
We store the proposal metadata on-chain using **ipfs** leveraging **pinata** apis.

### Flask Backend and Database
Each proposal has a discussion page, where users can post comments on the proposal, and vote on other users' comments. These discussions are stored in a **SQL** database connected through **REST API** built on **Flask**. 
<br><br>
## Challenges we ran into
As beginners in web3.0 development attempting to build a solution from scratch, we faced a lot of challenges. We learn a lot in the way and overcame most of the challenges!

### Cross-Chain Asset Transfers
Transfering data across chains can be tricky, but hyperlane solved the issue neatly. Though this issue was made easy, it was quite a learning experience as it was our first time trying to tranfer assests across chains. The docs and the discords channels were a great help. 

### What data to upload on chain?
Storing data on chain comes with an extra cost in the form of fees that has to be paid by the user. Data such as the discussion under a proposal can be stored in centralized database with no issues.
The proposal hash is already on the chain which can be used to verify that the proposal is unaltered. <br>

### No support for chainlink keepers
We wanted to use a chainlink keeper to periodically call the `pushToGovernance()` function, but the support is not yet availabe. <br>
We found a workaround by using **Open Zeppelin Defender**.

### Identification of unique users across chains ( Proof of Uniqueness )
The issue is that the platform is not yet sybil attack resistant
This issue is yet to be solved, but we have some possible solutions to this.
Options:

1. Token Gating & NFT Gating : This will involve making it so that only people with certain special tokens and NFTs are able to vote on the proposals. This could be a possible solution voting in small organisations or schools but is a rather centralised solution of widespread uses.
2. Gitcoin like trust based system : This would mean, using github, or some other public profile as basis to check the trust level of the user.

### Who sends the proposal for governance?
At the end of the week we want to push the top proposal on chain. We had to decide whether to push it for governance automatically or allow users to do it at the end of the week themselves.

Options:

1. The user pushes the proposal to for the official governance poll. They are allowed to do so only once the 7-day expiration period is over. <br>
When solidity receives a request to push a proposal, it verifies the request using the time-stamp of that proposal stored on chain. <br><br>
It verifies the following: <br>
a. Is the proposal at least 7 days old? <br>
b. Is it the most voted proposal?<br>
c. Has a proposal already been sent this week? <br>
<br>
Only after the three checks are verified, the smart contract will send the proposal to chain.
<br>

2. Open Zeppelin defender is integrated with our smart contract, which periodically calls the `pushToGovernance()` function to push the proposal for official governance poll. <br><br>

## Accomplishments that we're proud of

On running into all the challenges mentioned above, we read relavant articles, documentations and other literature for days, and finally built a working solution!

### Cross-chain Asset Transfer
Transfering data, though made simple using hyperlane, is a very powerful tool. We are proud to make use of this to make the platform available across various chains.

### Putting proposal metadata on IPFS
Proposal metadata is put on IPFS. Discussion is built on flask and stored in SQL database. We decided not to put user comments on chain to save gas fees.


### UI/UX Design
We designed a web solution that is more intuitive to use and interact with for users belonging to both technical and non-technical backgrounds. <br><br>

## What we learned

* Quick developement in a fast paced hackathon project
* Chainlink, ipfs, smart contract, Open Zepplin
* Hyperlane
* React + moralis, 
* Database, flask, heroku backend
* Worked with team, of developers and UI designers
<br><br>


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
*<div align="center"> The Pre Governance Poll Dapp</div>*

## Inspiration

Currently anyone can propose a referendum by depositing the minimum amount of tokens for a certain which is eventually refunded.If someone agrees with the proposal, they may deposit the same amount of tokens to support it - this action is called endorsing. The proposal with the highest amount of bonded support will be selected. But for instance, three accounts bonding 20 DOT each would "outweigh" ten accounts bonding a single DOT each and also if the lock period for one is less than the other, leads to their voting power counting as less. And since many low level accounts don't feel comfortable with locking it for an indeterminate amount of time hence it becomes a problem. <br>

* This financial barrier stifles overall blockchain improvement by preventing many good ideas from being submitted
*  Because of the high fees, many community members do not vote on the proposal, which is represented in the governance process as a lack of representation of members who do not have enough coins. This, in turn, Centralizes authority in the hands of stakeholders with more currency.
* A good suggestion that exclusively caters to members with fewer coins may go overlooked.
* Using <b>Hyperlane</b> we made the platform more accessable as it's functionalities are extended to multiple chains, and one doesn't need tokens from specific chain to make contribution to the governance.
<br><br>
## What it does
A Preliminiary Opinon poll is an unofficial poll that usually takes place before a official governance poll.<br>
Our *"Pre Governance" Dapp* is a intuitive and a community-based web solution that lets users **submit, read, discuss and interact** with proposals published by other users. The exciting part is that the web platform is avaible across multiple chains thus making it more easily available <br>
The app collects proposal information (i.e. likes, dislikes, proposer etc) **on-chain**. Users can read, vote and discuss the proposals. Further, the top voted proposal is **submitted for official governance periodically**. This information is then conveyed **across all the associated chains**. <br>

 
 ![Home page](https://raw.githubusercontent.com/alluringambiguous/Frontend-StrawPoll/master/homepage.png)
 *<div align="center"> Website Homepage </div>*
 
<br><br>
## How we built it

![Architecture](https://github.com/Hackermans1/Pre-Governace-Poll/blob/5d1b35465ee66da92b3f63a189cef98710859a7f/photo_6181549303475057727_y.jpg)
*<div align="center"> Dapp Architecture </div>*

### Smart Contract
We started with deploying the smart-contract on Replit. The smart contract records the details of the proposals and encloses a wide variety of usable functions that provide decentralization to our project.

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



## Accomplishments:

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
* Database, flask, REPLIT backend
<br><br>


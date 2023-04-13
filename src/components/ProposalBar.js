import React, { useState, useEffect } from "react"
import "./ProposalBar.css"
import ProposalCard from "./ProposalCard"
import { useMoralis, useWeb3Contract } from "react-moralis"
import abig from "../abig.json"
import abim from "../abim.json"
import contractAddressData from "../constants/contractAddress.json"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faPlus,
    faArrowDown,
    faArrowUp,
    faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons"
import ModalTab from "./Modal"
import { Link } from "react-router-dom"

import { ApiPromise, WsProvider } from "@polkadot/api"

function ProposalBar({ userAddr,setOpenAlert }) {
    const [proposals, setProposals] = useState([])
    const [open, setOpen] = React.useState(false)
    const [sortLatestFirst, setSortLatestFirst] = useState(true)
    // const contractAddress = contractAddressData.contractAddress
    const contractAddressM = contractAddressData.contractAddressM
    const contractAddressG = contractAddressData.contractAddressG

    const temp = []
    
console.log(` this is in proposal ${userAddr}`)
    const { chainId, isWeb3Enabled } = useMoralis()
    // console.log(contractAddress.contractAddress)
    console.log(chainId);
    let abi;
    let contractAddress;
    if (chainId == 0x5) {
        contractAddress = contractAddressG
        abi = abig
    } else {
        contractAddress = contractAddressM
        abi = abim
    }
    const { runContractFunction: viewAllProposals } = useWeb3Contract({
        abi: abi,
        contractAddress: contractAddress,
        functionName: "viewAllProposals",
        params: {},
    })
    // console.log(open)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    useEffect(() => {
        async function updateUi() {
            const allProposalsFromContract = await viewAllProposals()
            // // const api = await ApiPromise.create();
            // const wsProvider = new WsProvider("wss://rpc.polkadot.io")
            // const api = await ApiPromise.create({ provider: wsProvider })
            // const txHash = api.tx.system
            //     .remarkWithEvent("anighma")
            //     .method.hash.toHex()
            // await console.log(open);

            let allProposalsCleaned = []
            if (isWeb3Enabled)
                for (var i = 0; i < allProposalsFromContract.length; i++) {
                    const {
                        name,
                        uri,
                        proposer,
                        upVotes,
                        downVotes,
                    } = await allProposalsFromContract[i]

                    const upvotes = parseInt(upVotes)
                    const downvotes = parseInt(downVotes)
                    // console.log(api.tx.system.remarkWithEvent('anighma').method.hash.toHex())

                    // console.log(`${txHash}`)

                    allProposalsCleaned.push({
                        name,
                        uri,
                        proposer,
                        upvotes,
                        downvotes,
                    })
                }

            setProposals(
                allProposalsCleaned
                    .map((proposal, i) => {
                        return (
                            <ProposalCard
                                key={i}
                                name={proposal.name}
                                uri={proposal.uri}
                                proposer={proposal.proposer}
                                upvote={proposal.upvotes}
                                downvote={proposal.downvotes}
                                
                                setOpenAlert={setOpenAlert}
                            />
                        )
                    })
                    .reverse()
            )
        }
        updateUi()
    }, [isWeb3Enabled])

    // for (var i = 0; i < temp.length; i++) {
    //     setProposals((oldArray) => [...oldArray, <ProposalCard />])
    // }

    return (
        <div className="proposalBarContainer">
            <div className="titleProposalContainer">
                <div className="sortingContainer">
                    <div className="sortingOptionContainer">
                        <div className="titleProposalTopContainer">
                            Latest Proposals
                        </div>
                        <div
                            className="titleProposalTopUnselectedContainer"
                            onClick={() => {
                                setSortLatestFirst(!sortLatestFirst)
                                setProposals(proposals.reverse())
                            }}
                        >
                            <div>Sort by</div>
                            <FontAwesomeIcon
                                icon={sortLatestFirst ? faArrowUp : faArrowDown}
                                width={16}
                                className="downArrowContainer"
                            />
                        </div>
                        <div className="titleProposalTopUnselectedContainer">
                            <div>Your Proposals</div>
                        </div>
                    </div>
                    <hr
                        className="lineSortContainer"
                        style={{
                            background: "#b3b3b3 ",
                            color: "#b3b3b3 ",
                            borderWidth: "0px",
                            height: "1.5px",
                            width: "90%",
                        }}
                    />
                </div>

                <div className="searchBarContainer">
                    <div className="searchNameContainer">Search</div>

                    <FontAwesomeIcon icon={faMagnifyingGlass} width={16} />
                </div>

                <div onClick={handleOpen} className="addProposalContainer">
                    <div className="addProposalButtonContainer">
                        Add Proposal
                    </div>
                    <FontAwesomeIcon
                        icon={faPlus}
                        width={16}
                        className="plusContainer"
                    />
                </div>
            </div>
            <ModalTab
                userAddr={userAddr}
                open={open}
                handleClose={handleClose}
                setOpenAlert={setOpenAlert}
            />
            <div className="proposalCardsContainer">{proposals}</div>
        </div>
    )
}

export default ProposalBar

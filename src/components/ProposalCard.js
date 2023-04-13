import React, { useState, useEffect } from "react"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { Link } from "react-router-dom"
import contractAddressData from "../constants/contractAddress.json"
import "./ProposalCard.css"
import Alert from "@mui/material/Alert"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faThumbsUp,
    faThumbsDown,
    faComment,
    faTrash,
} from "@fortawesome/free-solid-svg-icons"
import abig from "../abig.json"
import abim from "../abim.json"
import ProfilePicture from "./ProfilePicture"

function ProposalCard({ name, uri, proposer, upvote, downvote,setOpenAlert }) {
    const [like, setLike] = useState(upvote)
    const [dislike, setDislike] = useState(downvote)
    const { account,chainId, isWeb3Enabled } = useMoralis()

    // let contractAddress 
    const contractAddressG = contractAddressData.contractAddressG
    const contractAddressM = contractAddressData.contractAddressM
    // const [userCardAddr,setUserCardAddr] = useState(account)
    // console.log(`thsi is in propsoal card${account}`)
    
    let contractAddress 
    let contractAddressAlt 
    let abi

    if (chainId == 0x5) {
    contractAddress = contractAddressG
        contractAddressAlt = contractAddressM
        abi = abig;
        
    } else {
        contractAddress = contractAddressM
        contractAddressAlt = contractAddressG
        abi = abim
        
        
    }
    const { runContractFunction: upVote } = useWeb3Contract({
        abi: abi,
        contractAddress: contractAddress,
        functionName: "upVote",
        params: {
            _uri: uri,
            _voter: account,
            _contractAddress: contractAddressAlt,

        },
    })
    const { runContractFunction: downVote } = useWeb3Contract({
        abi: abi,
        contractAddress: contractAddress,
        functionName: "downVote",
        params: {
            _uri: uri,
            _voter: account,
            _contractAddress: contractAddressAlt,
        },
    })
    const { runContractFunction: getDownVotes } = useWeb3Contract({
        abi: abi,
        contractAddress: contractAddress,
        functionName: "getDownVotes",
        params: {
            _uri: uri,
        },
    })
    const { runContractFunction: getUpVotes } = useWeb3Contract({
        abi: abi,
        contractAddress: contractAddress,
        functionName: "getUpVotes",
        params: {
            _uri: uri,
        },
    })
    const handleLike = async () => {
        setOpenAlert(true)
        await upVote({ onSuccess: (tx) => handleSuccess(tx) })
    }
    const handleChange = async (upvotes, downvotes) => {
        setLike(parseInt(upvotes))
        setDislike(parseInt(downvotes))
    }
    const handleSuccess = async (tx) => {
        await tx.wait(1)
        console.log("success entered")
        console.log("tx", tx)
        const downvotes = await getDownVotes()
        const upvotes = await getUpVotes()
        console.log(downvotes)
        await handleChange(upvotes, downvotes)
        return ["success", tx]
    }
    const handleDislike = async () => {
        setOpenAlert(true)
        await downVote({ onSuccess: (tx) => handleSuccess(tx) })
    }

    return (
        <div className="proposalCardContainer">
            <div className="porposalCardDataContainer">
                <div className="proposalCircleContainer">
                    <ProfilePicture address={proposer} />
                </div>
                <div className="proposalAuthorDataContainer">
                    <Link
                        to={`/proposal/${uri.split("/").pop()}`}
                        key="proposalIpfsHash"
                        style={{ textDecoration: "none" }}
                        className="proposalTitleContainer"
                    >
                        {name ? (
                            <div style={{ display: "flex", width: "100%" }}>
                                {name.slice(0, 18)}
                                {name.length > 18 ? <>...</> : <div></div>}
                                
                                {/* {proposer ===
                                "0xD3Ff96cf6925a905dce544140F06B9745e2bcBae" ? (
                                    <div style={{ marginLeft: "auto" }}>
                                        
                                        <FontAwesomeIcon
                                            icon={faTrash}
                                            style={{ width: " 12px" }}
                                            className="trashContainer"
                                        />
                                    </div>
                                ) : (
                                    <div></div>
                                )} */}
                                {/* <div ></div> */}
                            </div>
                        ) : (
                            <div></div>
                        )}
                    </Link>

                    <div className="proposalAuthorContainer">
                        {proposer.slice(0, 6)}...
                        {proposer.slice(proposer.length - 4)}
                    </div>
                </div>
            </div>
            <div className="proposalReactionsContainer">
                <div className="proposalReactionContainer">
                    <FontAwesomeIcon
                        icon={faThumbsUp}
                        onClick={async () => {
                            handleLike()
                        }}
                        className="reactionContainer"
                    />
                    <div>{like}</div>
                </div>
                <div className="proposalReactionContainer">
                    <FontAwesomeIcon
                        icon={faThumbsDown}
                        onClick={async () => {
                            handleDislike()
                        }}
                        className="reactionContainer"
                    />
                    

                    <div>{dislike}</div>
                </div>
                <div className="proposalReactionContainer">
                    <FontAwesomeIcon
                        icon={faComment}
                        className="reactionContainer"
                    />
                    <div>{0}</div>
                </div>
            </div>
        </div>
    )
}

export default ProposalCard

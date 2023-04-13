import React, { useState } from "react"
import { ethers, BigNumber } from "ethers"
// import strawPoll from "../StrawPoll.json"
import IntroBar from "./IntroBar"
import DataBar from "./DataBar"
import ProposalBar from "./ProposalBar"
import Alert from "@mui/material/Alert"
import IconButton from "@mui/material/IconButton"
import Collapse from "@mui/material/Collapse"
import Button from "@mui/material/Button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faClose
} from "@fortawesome/free-solid-svg-icons"

import "./MainDash.css"
// import { useMoralis } from "react-moralis"

// const strawPollAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
function MainDash() {
    // const { enableWeb3 } = useMoralis()//a function that we get from hook useMoralis
    const [userAddr, setUserAddr] = useState()
    const [openAlert, setOpenAlert] = useState(false)

    return (
        <div className="mainDashContainer">
            <Collapse className="alertMainDash" in={openAlert} Alert>
                <Alert
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            
                            onClick={() => {
                                setOpenAlert(false)
                            }}
                        >
                            <FontAwesomeIcon
                                icon={faClose}
                                width={16}
                                className="downArrowContainer"
                            />
                        </IconButton>
                    }
                    sx={{ mb: 2 }}
                >
                    Please refresh the page after a short while!!
                </Alert>
            </Collapse>

            <div className="introBarContainer">
                <IntroBar userAddr={userAddr} setUserAddr={setUserAddr} />
            </div>
            <div className="dataBarContainer">
                <DataBar />
            </div>
            <div className="proposalBarContainer">
                <ProposalBar userAddr={userAddr}  setOpenAlert={setOpenAlert}/>
            </div>
        </div>
    )
}

export default MainDash

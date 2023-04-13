import React, { useState, useEffect } from "react"
import "./IntroBar.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBell, faCircle } from "@fortawesome/free-solid-svg-icons"
import { useMoralis } from "react-moralis"

import ProfilePicture from "./ProfilePicture"

function IntroBar({ userAddr, setUserAddr }) {
    const {
        enableWeb3,
        account,
        isWeb3Enabled,
        Moralis,
        deactivateWeb3,
        isWeb3EnableLoading,
    } = useMoralis()
    useEffect(() => {
        if (isWeb3Enabled) return
        if (typeof window !== "undefined") {
            if (window.localStorage.getItem("connected")) {
                enableWeb3()
                setUserAddr(account)
                // console.log(userAddr)
            }
        }
    }, [isWeb3Enabled])
    useEffect(() => {
        setUserAddr(account)
        console.log(userAddr)
    }, [account])
    useEffect(() => {
        Moralis.onAccountChanged((account) => {
            if (account == null) {
                window.localStorage.removeItem("connected")
                deactivateWeb3()
            }
        })
    }, [])

    return (
        <div className="introBarContainer">
            <div className="welcomeContainer">
                {account ? (
                    <div className="headingContainer">
                        Hi, {account.slice(0, 6)}...
                        {account.slice(account.length - 4)}{" "}
                    </div>
                ) : (
                    <div className="headingContainer">Hey,</div>
                )}
                <div className="descContainer">
                    Welcome, check the lastest proposals this week
                </div>
            </div>
            <div className="profileContainer">
                <div className="notifContainer">
                    <FontAwesomeIcon icon={faBell} />
                </div>
                <div className="profilePicContainer">
                    {<ProfilePicture address={account} />}
                </div>
            </div>
            <div className="connectButtonContainer">
                {account ? (
                    <div className="connectedWalletContainer">
                        <FontAwesomeIcon
                            icon={faCircle}
                            width={8}
                            className="indicatorContainer"
                        />
                        <div>Connected</div>
                    </div>
                ) : (
                    <button
                        className="connectWalletContainer"
                        onClick={async () => {
                            await enableWeb3()
                            if (typeof window !== "undefined") {
                                window.localStorage.setItem(
                                    "connected",
                                    "injected"
                                )
                            }
                            setUserAddr(account)
                            console.log(userAddr)
                        }}
                        disabled={isWeb3EnableLoading}
                    >
                        Connect to Metamask
                    </button>
                )}
            </div>
        </div>
    )
}

export default IntroBar

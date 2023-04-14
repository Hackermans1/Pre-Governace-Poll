import React from "react"
import "./SideNav.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub, faFacebook,faTwitter,faDiscord } from "@fortawesome/free-brands-svg-icons"


function SideNav() {
    return (
        <div className="sideNavContainer">
            <div className="logoContainer">A Straw Poll</div>
            <div className="sideOptionsContainer">
                <div className="optionContainer">Dashboard</div>
                <div className="optionUnselectedContainer">My Proposal</div>
                <div className="optionUnselectedContainer">Settings</div>

            </div>
            <div className="socialContainer">
                <div className="githubContainer"><FontAwesomeIcon icon={faGithub} width={24 } /></div>
                <div className="discordContainer"><FontAwesomeIcon icon={faTwitter} width={24 }/></div>
                <div className="twitterContainer"><FontAwesomeIcon icon={faDiscord}width={24 } /></div>
                <div className="facebookContainer"><FontAwesomeIcon icon={faFacebook} width={24 }/></div>
            </div>
        </div>
    )
}
export default SideNav

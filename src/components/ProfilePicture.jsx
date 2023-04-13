import React from "react"
import { ReactSVG } from 'react-svg'

import { multiavatar } from "@multiavatar/multiavatar"
import { useEffect } from "react"
import axios from "axios"

function ProfilePicture({address}) {

    return (
        <img src={`https://api.multiavatar.com/${address}.svg`} width="48px" height="64px" />
   )
}

export default ProfilePicture

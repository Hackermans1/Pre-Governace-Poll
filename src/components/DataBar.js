import React, { useEffect, useState } from "react"
import "./DataBar.css"
import DataCard from "./DataCard"
import { useMoralis, useWeb3Contract } from "react-moralis"
import abig from "../abig.json"
import abim from "../abim.json"
import contractAddressData from "../constants/contractAddress.json"

function DataBar() {
    const [topAddr, setTopAddr] = useState()
    const [topName, setTopName] = useState("")
    const [card, setCard] = useState([])
    // const contractAddress = contractAddressData.contractAddress
    const contractAddressM = contractAddressData.contractAddressM
    const contractAddressG = contractAddressData.contractAddressG

    const { chainId, isWeb3Enabled } = useMoralis()
    let contractAddress
    let contractAddressAlt 
    let abi;

    if (chainId == 0x5) {
    contractAddress = contractAddressG
         contractAddressAlt = contractAddressM
        abi = abig;
    } else {
        contractAddress = contractAddressM
        contractAddressAlt = contractAddressG
        abi = abim
        
    }
    const { runContractFunction: topContract } = useWeb3Contract({
        abi: abi,
        contractAddress: contractAddress,
        functionName: "topContract",
        params: {},
    })
    const { runContractFunction: getPriceDOTToDollar } = useWeb3Contract({
        abi: abi,
        contractAddress: contractAddress,
        functionName: "getPriceDOTToDollar",
        params: {},
    })
    async function updateUi() {
        const topCont = await topContract()
        const dotToUSD = await getPriceDOTToDollar()
        const topA = await topCont.uri
        const topN = await topCont.name
        setCard([])
        console.log("hello")
        let weekday = new Date().getDay()
        console.log(weekday)
        let dayLeft = 7 - weekday

        console.log(topCont.uri)
        setTopName(topN)
        setTopAddr(topA)
        console.log(topName)
        setCard((oldArray) => [
            ...oldArray,
            [
                <DataCard
                    key={1}
                    Title={"This Weeks Top Proposal"}
                    Data={topN}
                    TopContractAddress={topA}
                />,
                <DataCard
                    key={2}
                    Title={"DOT Price"}
                    Data={`$ ${dotToUSD?(Math.round(dotToUSD / 6.67)):(6.60)}`}
                    TopContractAddress={"http://dottousdconverter"}
                />,
                <DataCard
                    key={3}
                    Title={"Push for Governance in"}
                    Data={`${dayLeft} days to go`}
                    
                    Progress={dayLeft}
                />,
                <DataCard
                    key={4}
                    Title={"Last Weeks Top Proposal"}
                    Data={"NaN"}
                    TopContractAddress={"0xurietyoreitweoriutw"}
                />,
            ],
        ])
    }

    useEffect(() => {
        updateUi()
    }, [isWeb3Enabled])
    return (
        <div className="dataBarContainer">
            <div className="tempContainer">
                {card}
                {/* <DataCard
                    Title={"This Weeks Top Proposal"}
                    Data={topName}
                    Link={"http:/ex...s.com"}
                    TopContractAddress = {topAddr}
                /> */}
                {/* <DataCard Title={"Price of DOT"} Data={"$ 6.28"} />
                <DataCard
                    Title={"Next Burn"}
                    Data={"4 Days"}
                    Circle={"4/7 in circle form"}
                />
                <DataCard
                    Title={"Last Weeks Top Proposal"}
                    Data={"0xd34w...45fd"}
                    Link={"http:/ex...s.com"}
                /> */}
            </div>
        </div>
    )
}

export default DataBar

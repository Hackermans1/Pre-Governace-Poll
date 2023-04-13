import "./App.css"
import SideNav from "./components/SideNav"
import MainDash from "./components/MainDash"
import Proposal from "./pages/Proposal.jsx"
import LandingPage from "./pages/Landing"
import { MoralisProvider } from "react-moralis"
import { BrowserRouter, Routes, Route } from "react-router-dom";



function App() {

    function HomePage() {
        return (
            <div className="container">
                <SideNav className="sideContainer" />
                <MainDash className="mainContainer" />
            </div>)
    }

    function ProposalPage() {
        return (
            <div className="container">
                <SideNav className="sideContainer" />
                <Proposal className="proposalContainer" />
            </div>)
    }

    return (
        <MoralisProvider >

            <BrowserRouter>

                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/home" element={<HomePage/>}/>
                    <Route path="/proposal/:proposalIpfsHash" element={<ProposalPage />} />
                </Routes>
            </BrowserRouter>
        </MoralisProvider>

    )



}

export default App


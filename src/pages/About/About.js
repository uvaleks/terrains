import React from 'react'
import './about.scss'

import AboutFeature from '../../components/AboutFeature/AboutFeature.js'
import desert from './desert.gif'
import nowar from './no-war.png'
import climatepositive from './climate-positive.png'
import nftlogo from './nft-logo.png'
import opensealogo from './opensea-logo.png'
import metamasklogo from './metamask-logo.png'

const PAGE_ABOUT_SECTION = 'about-section'

class About extends React.Component {
    render() {
        return (
            <section id={ PAGE_ABOUT_SECTION } className="about-section">
                <div className="section-title">Overview</div>
                <AboutFeature title="Multiuser collectables" image={desert} imagealt="NFT Terrains">
                    Fill in the terrain with your unique assets together with other users. Each terrain and its fragments are hand-drawn by <a href="https://www.behance.net/zhenyaartemjev" target="_blank" rel="noreferrer">Zhenya Artemjev</a>
                </AboutFeature>
                <AboutFeature title="Militarism issues" image={nowar} imagealt="Antimilitarism">
                    Some fragments of the terrain demonstrate expressions of militarism and its consequences. We are <a href="https://en.wikipedia.org/wiki/Antimilitarism" target="_blank" rel="noreferrer">against aggressive wars and imperialism</a>
                </AboutFeature>
                <AboutFeature title="Climate positive" image={climatepositive} imagealt="Climate positive">
                We are aware of the harm to nature from additional carbon emissions when calculating blockchain transactions and we offset it by <a href="https://www.wren.co/projects/community-tree-planting" target="_blank" rel="noreferrer">planting trees</a>
                </AboutFeature>
                <AboutFeature title="Assets tokenized by the NFTs" image={nftlogo} imagealt="NFT">
                <a href="https://en.wikipedia.org/wiki/Non-fungible_token" target="_blank" rel="noreferrer">NFT</a> is a unique and non-interchangeable unit of data stored on a blockchain, a form of digital ledger. NFTs can be associated with reproducible digital files such as photos, videos, audio and even <a href="https://www.christies.com/auctions/christies-x-opensea" target="_blank" rel="noreferrer">art objects</a>. NFTs use a digital ledger to provide a public proof of ownership
                </AboutFeature>
                <AboutFeature title="NFTs placed on OpenSea" image={opensealogo} imagealt="OpenSea">
                    <a href="https://opensea.io" target="_blank" rel="noreferrer">OpenSea</a> is the world's first and largest NFT marketplace. It has a market share of 97%. OpenSea is all set up to allow users to buy, sell, and bid on items. Using OpenSea makes our project convenient and reliable. Items are available through the initial item offer. The cost of each item is fixed and amounts to 0.1 ETH
                </AboutFeature>
                <AboutFeature title="Use MetaMask to buy & store" image={metamasklogo} imagealt="MetaMask">
                    The simplest yet most secure way to purchase item is to install  <a href="https://metamask.io/download/" target="_blank" rel="noreferrer">MetaMask</a> and link your crypto wallet to it. Ensure you have enough ETH in your wallet to cover the cost of the item plus the associated gas fees. Approve the desired transaction on MetaMask and item will be delivered to your wallet and OpenSea account
                </AboutFeature>


                <div className="section-title">Roadmap</div>
                    <div className="roadmap">
                        <div className="timeline--wrapper">
                            <div className="timeline--basis">
                                <div className="timeline"></div>
                                <div className="Milestone--point milestone--1 pink"></div>
                                <div className="Milestone--point milestone--2 purple"></div>
                                <div className="Milestone--point milestone--3 indigo"></div>
                                <div className="Milestone--point milestone--4 blue"></div>
                                <div className="Milestone--point milestone--5 cyan"></div>
                                <div className="Milestone--point milestone--6"></div>
                                <div className="Milestone--point milestone--7"></div>
                                <div className="Milestone--point milestone--8"></div>
                            </div>
                        </div>
                        <div className="milestones">
                        
                            <div className="milestone--wrapper">
                            <div className="milestone--left">
                                <div className="Milestone--date--wrapper">
                                    <span className="Milestone--date">September 2021</span><div className="Milestone--status pink">Done</div>
                                </div>
                                <div className="Milestone--title--wrapper">
                                    <span className="Milestone--title">A flight of fancy</span>
                                </div>
                                <span className="Milestone--description">The idea and concept are formed.<br></br>Development began</span>
                            </div>
                            </div>

                            <div className="milestone--wrapper">
                            <div className="milestone--right">
                                <div className="Milestone--date--wrapper">
                                    <span className="Milestone--date">November 2021</span><div className="Milestone--status purple">Done</div>
                                </div>
                                <div className="Milestone--title--wrapper">
                                    <span className="Milestone--title">Putting finger in the pie</span>
                                </div>
                                <span className="Milestone--description"><br></br>Alpha Wordpress site launched.<br></br>Arctic Terrain Collection Series 1 minted</span>
                            </div>
                            </div>

                            <div className="milestone--wrapper">
                            <div className="milestone--left">
                                <div className="Milestone--date--wrapper">
                                    <span className="Milestone--date">January</span><div className="Milestone--status indigo">Done</div>
                                </div>
                                <div className="Milestone--title--wrapper">
                                    <span className="Milestone--title">Second to none face</span>
                                </div>
                                <span className="Milestone--description">Responsive React.js website launched<br></br>with Live Collection Cards & Dark mode</span>
                            </div>
                            </div>

                            <div className="milestone--wrapper">
                            <div className="milestone--right">
                                <div className="Milestone--date--wrapper">
                                    <span className="Milestone--date">March</span><div className="Milestone--status blue">Done</div>
                                </div>
                                <div className="Milestone--title--wrapper">
                                    <span className="Milestone--title">Icing on the cake</span>
                                </div>
                                <span className="Milestone--description">Advanced OpenSea API integration:<br></br>owner info, price & selling status</span>
                            </div>
                            </div>

                            <div className="milestone--wrapper">
                            <div className="milestone--left">
                                <div className="Milestone--date--wrapper">
                                    <span className="Milestone--date">June</span><div className="Milestone--status cyan">You are here</div>
                                </div>
                                <div className="Milestone--title--wrapper">
                                    <span className="Milestone--title">Come to the point</span>
                                </div>
                                <span className="Milestone--description">Terrains are completely launched<br></br>on multiple domains and social platforms</span>
                            </div>
                            </div>

                            <div className="milestone--wrapper">
                            <div className="milestone--right">
                                <div className="Milestone--date--wrapper">
                                    <span className="Milestone--date">Q3</span><div className="Milestone--status gray">Expected</div>
                                </div>
                                <div className="Milestone--title--wrapper">
                                    <span className="Milestone--title">Don't miss the boat!</span>
                                </div>
                                <span className="Milestone--description">Desert Terrain will be revealed.<br></br>Current holders of three or more NFTs<br></br>will be rewarded with exclusive<br></br>Desert Terrain Collection airdrop</span>
                            </div>
                            </div>

                            <div className="milestone--wrapper">
                            <div className="milestone--left">
                                <div className="Milestone--date--wrapper">
                                    <span className="Milestone--date">October</span><div className="Milestone--status gray">Expected</div>
                                </div>
                                <div className="Milestone--title--wrapper">
                                    <span className="Milestone--title">The moment of truth</span>
                                </div>
                                <span className="Milestone--description">Depending on the success of the project,<br></br>a decision will be made on the creation<br></br>of new terrains or the unification<br></br>of the existing ones into a single continent</span>
                            </div>
                            </div>

                            <div className="milestone--wrapper">
                            <div className="milestone--right">
                                <div className="Milestone--date--wrapper">
                                    <span className="Milestone--date">Q4</span><div className="Milestone--status gray">Expected</div>
                                </div>
                                <div className="Milestone--title--wrapper">
                                    <span className="Milestone--title">The early bird gets the worm</span>
                                </div>
                                <span className="Milestone--description">Seaside Terrain will be revealed.<br></br>Current holder of five or more NFTs<br></br>will be rewarded with exclusive<br></br>Seaside Terrain Collection airdrop</span>
                            </div>
                            </div>
                        </div>
                     
                    </div>
                </section>
        )
    }
}

export { About, PAGE_ABOUT_SECTION }
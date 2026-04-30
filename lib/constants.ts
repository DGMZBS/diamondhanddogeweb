// lib/constants.ts
// ⚠️ All external links and addresses live here. Never hardcode in components.

export const CONTRACT_ADDRESS = '9GnXzTS4ik2CAfrkaoVZbdzZ98xQ2ehbHQVnnJp6pump'

export const LINKS = {
  raydium: 'https://raydium.io/swap/?inputMint=sol&outputMint=9GnXzTS4ik2CAfrkaoVZbdzZ98xQ2ehbHQVnnJp6pump',
  dexscreener: 'https://dexscreener.com/solana/3UG4RvNMV9idmR9FpaEXz6ov9A9DkczDGuxMbGyFWFH2',
  dextools: 'https://www.dextools.io/token/diamondhanddoge',
  telegram: 'https://t.me/diamondhanddoge',
  x: 'https://x.com/dhdxcommunity?s=21',
  email: 'dogehanddiamond@gmail.com',
  chartEmbed: 'https://dexscreener.com/solana/3UG4RvNMV9idmR9FpaEXz6ov9A9DkczDGuxMbGyFWFH2?embed=1&theme=dark',
  phantom: 'https://phantom.app',
  solflare: 'https://solflare.com',
}

export const BURN_WALLETS = [
  {
    address: 'GXpjQVSHQZ9vGDCuaMqcqf67LXLMFQD3Pe6B2yH1LMJp',
    label: '🔥 First Burn',
    trigger: '$250K MCAP',
    percent: '5%',
    solscan: 'https://solscan.io/account/GXpjQVSHQZ9vGDCuaMqcqf67LXLMFQD3Pe6B2yH1LMJp',
  },
  {
    address: '4tCRyUyyyXUHCqPdoicw4DepnnzjsREBd2sYPxgbo12c',
    label: '🔥 Second Burn',
    trigger: '$10M MCAP',
    percent: '10%',
    solscan: 'https://solscan.io/account/4tCRyUyyyXUHCqPdoicw4DepnnzjsREBd2sYPxgbo12c',
  },
  {
    address: 'BK5ejx8h6EBrCL1xEz2F6mQsydTCzDyFjiMfbA67xr1r',
    label: '🔥 Third Burn',
    trigger: '$100M MCAP',
    percent: '15%',
    solscan: 'https://solscan.io/account/BK5ejx8h6EBrCL1xEz2F6mQsydTCzDyFjiMfbA67xr1r',
  },
]

export const DEXSCREENER_API = 'https://api.dexscreener.com/latest/dex/pairs/solana/3UG4RvNMV9idmR9FpaEXz6ov9A9DkczDGuxMbGyFWFH2'

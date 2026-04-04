# DHD Website Content Audit
**Scraped from:** https://www.diamondhanddoge.com + on-chain Solana RPC + DEX Screener API  
**Date:** April 2026  
**Purpose:** Single source of truth for all site content before any code is written.

---

## Contract Address

```
9GnXzTS4ik2CAfrkaoVZbdzZ98xQ2ehbHQVnnJp6pump
```

---

## Logo File

Token logo is available at `/public/images/dhd-token.JPG` in the project root.  
When setting up the Next.js project, place it at `public/images/dhd-token.JPG`.

---

## How to Buy Steps

The live site has **3 steps**. The PRD's 4-step structure (Wallet → SOL → DEX → Swap) is an improvement. Use the 4-step PRD structure with the body copy below as the basis. Both DEX Screener and Raydium should be referenced — Raydium as the primary CTA button, DEX Screener also linked.

**Step 1 — Create a Wallet**
> "Create any wallet of your choice, we recommend Phantom."

**Step 2 — Fund Your Wallet**
> "Fund your wallet with Solana, you can buy Solana from an exchange."

**Step 3 — Go to Raydium or DEX Screener**
> Visit Raydium DEX and connect your wallet to swap. Alternatively, use DEX Screener for cross-chain support and seamless transactions across multiple chains.

**Step 4 — Swap for DHD**
> Paste the DHD contract address, set your slippage to 1–5%, and confirm your swap. Welcome to the pack! 💎

**CTA buttons on this section:** Primary → "Buy DHD on Raydium" (Raydium link) + Secondary → "View on DEX Screener" (DEX Screener link)

---

## Roadmap Milestones

All body copy below is taken verbatim from the live site screenshots.

### Phase 1 — COMPLETED ✅
- Create Socials
- Team KYC
- Organic Community Growth
- DexTools Update
- Listing On Exchanges
- Twitter Spaces

### Phase 2 — IN PROGRESS ⏳ (as of 3/29/26)
**$250K MCAP actions:**
- Introduction to list on Jupiter — "Expanding our reach and liquidity."
- CoinGecko & CoinMarketCap — "So we can track our progress and get recognized by more investors."
- Phantom — "Increasing accessibility and exposure for Diamond Hand Doge holders."

### Phase 3 — UPCOMING 🔒
**$1M MCAP actions:**
- 5% Burn — tokens sent from wallet `GXpjQVSHQZ9vGDCuaMqcqf67LXLMFQD3Pe6B2yH1LMJp`
- 🔥 First Burn
- Entering Small Exchanges: BitMart ✅, MEXC ✅, XT.com ✅, LBank ✅

> "Once we hit the $1 million market cap, we're taking things to the next level! At this stage, we'll start getting listed on some smaller, but powerful centralized exchanges, including: BitMart, MEXC, XT.com, LBank."

### Phase 4 — UPCOMING 🔒
**$5M–$6M MCAP actions:**
- Major Exchange Listings: Gate.io ✅, KuCoin ✅

> "Now, this is where things get serious. At $10 million market cap or even earlier if our volume and growth qualify us we'll aim for some major CEX listings like: Gate.io, KuCoin. These are major stepping stones that will give Diamond Hand Doge the credibility and reach it deserves. Our goal is to keep growing, attracting more investors, and proving that we are here to stay!"

### Phase 5 — UPCOMING 🔒
**$10M MCAP actions:**
- 🔥 Second Burn — 10% of tokens from wallet `4tCRyUyyyXUHCqPdoicw4DepnnzjsREBd2sYPxgbo12c`

**$100M MCAP actions:**
- 🔥 Third Burn — 15% of tokens from wallet `BK5ejx8h6EBrCL1xEz2F6mQsydTCzDyFjiMfbA67xr1r`
- Beyond $10M: Ultimate Goal — Binance listing

> "Once we break past the $10 million market cap, we will set our sights on the BIGGEST goal of all: getting listed on Binance. We know it won't be easy, but with strong community support, solid volume, and continued marketing, we will do everything in our power to make it happen."

---

## Tokenomics (Live On-Chain Data)

All figures pulled live from Solana RPC (`api.mainnet-beta.solana.com`) and DEX Screener API.  
**These are live values — the site will fetch these dynamically at runtime via the DEX Screener API + Solana RPC.**

| Field | Value | Source |
|---|---|---|
| Total Supply | 999,911,104 DHD (~1 Billion) | Solana RPC — getTokenSupply |
| Token Decimals | 6 | Solana RPC |
| Price (USD) | $0.0001316 | DEX Screener API |
| Market Cap / FDV | $131,685 | DEX Screener API |
| Liquidity (USD) | $37,491.85 | DEX Screener API |
| 24h Volume | $460.90 | DEX Screener API |
| 24h Price Change | +4.86% | DEX Screener API |
| Pair Created | January 20, 2025 | DEX Screener API |
| DEX | Raydium (Solana) | DEX Screener API |

### Burn Wallet On-Chain Balances (Live)

| Wallet | Trigger | Burn % | Current Balance | Status |
|---|---|---|---|---|
| `GXpjQVSHQZ9vGDCuaMqcqf67LXLMFQD3Pe6B2yH1LMJp` | $1M MCAP | 5% | 50,000,000 DHD | Funded, not yet burned |
| `4tCRyUyyyXUHCqPdoicw4DepnnzjsREBd2sYPxgbo12c` | $10M MCAP | 10% | 100,000,000 DHD | Funded, not yet burned |
| `BK5ejx8h6EBrCL1xEz2F6mQsydTCzDyFjiMfbA67xr1r` | $100M MCAP | 15% | 0 DHD (no token account) | Not yet funded |

**Total currently locked in burn wallets:** 150,000,000 DHD (≈15% of supply)  
**No burns have been executed yet** (all 3 burn wallets still hold their pre-burn allocations or are unfunded).

### Implementation Note for Tokenomics Section
- Market cap, liquidity, and price: fetch live from `https://api.dexscreener.com/latest/dex/pairs/solana/3UG4RvNMV9idmR9FpaEXz6ov9A9DkczDGuxMbGyFWFH2`
- Burn wallet balances: fetch live from Solana RPC `getTokenAccountsByOwner` for each wallet
- Total supply: fetch live from Solana RPC `getTokenSupply`
- No additional locked/team/treasury wallets exist beyond the 3 burn wallets above

---

## Burn Wallet Addresses (for Tokenomics display)

| Wallet Address | Label | Solscan Link |
|---|---|---|
| `GXpjQVSHQZ9vGDCuaMqcqf67LXLMFQD3Pe6B2yH1LMJp` | 🔥 First Burn — $1M MCAP | https://solscan.io/account/GXpjQVSHQZ9vGDCuaMqcqf67LXLMFQD3Pe6B2yH1LMJp |
| `4tCRyUyyyXUHCqPdoicw4DepnnzjsREBd2sYPxgbo12c` | 🔥 Second Burn — $10M MCAP | https://solscan.io/account/4tCRyUyyyXUHCqPdoicw4DepnnzjsREBd2sYPxgbo12c |
| `BK5ejx8h6EBrCL1xEz2F6mQsydTCzDyFjiMfbA67xr1r` | 🔥 Third Burn — $100M MCAP | https://solscan.io/account/BK5ejx8h6EBrCL1xEz2F6mQsydTCzDyFjiMfbA67xr1r |

---

## Disclaimer Text

The live site at `/disclaimer` covers these 8 topics. Use as the structural basis when writing the new disclaimer page — write professional, human-sounding prose around each point:

1. **No Financial Advice** — Content is informational and educational only; consult licensed professionals.
2. **Market Risks** — Cryptocurrency is volatile; DHD value fluctuates significantly; no liability guarantees.
3. **No Guarantees** — Holding DHD does not ensure profits; past performance doesn't indicate future results.
4. **Security & Responsibility** — Users must secure their own wallets and verify official sources.
5. **Regulatory Compliance** — Users must follow applicable laws in their jurisdiction.
6. **Third-Party Links** — The site is not responsible for external platform reliability or security.
7. **Community-Driven Project** — DHD is community-based, not a formal business entity.
8. **Release of Liability** — Users agree to release developers and community members from all claims.

---

## Social & Platform Links (Confirmed)

| Platform | URL |
|---|---|
| Twitter/X | `https://x.com/dogehanddiamond?s=21` |
| Telegram | `https://t.me/diamondhanddoge` |
| DEX Screener | `https://dexscreener.com/solana/3UG4RvNMV9idmR9FpaEXz6ov9A9DkczDGuxMbGyFWFH2` |
| Raydium | `https://raydium.io/swap/?inputMint=sol&outputMint=9GnXzTS4ik2CAfrkaoVZbdzZ98xQ2ehbHQVnnJp6pump` |
| DEX Tools | `https://www.dextools.io/token/diamondhanddoge` |
| Email (primary) | `dogehanddiamond@gmail.com` |
| Email (airdrops) | `dhdairdrop@gmail.com` |

---

## API Endpoints for Live Data (use at runtime, not hardcoded)

```
DEX Screener (price, mcap, liquidity, volume):
GET https://api.dexscreener.com/latest/dex/pairs/solana/3UG4RvNMV9idmR9FpaEXz6ov9A9DkczDGuxMbGyFWFH2

Solana RPC — Total Supply:
POST https://api.mainnet-beta.solana.com
{ "jsonrpc":"2.0","id":1,"method":"getTokenSupply","params":["9GnXzTS4ik2CAfrkaoVZbdzZ98xQ2ehbHQVnnJp6pump"] }

Solana RPC — Burn Wallet Balance (repeat for each wallet):
POST https://api.mainnet-beta.solana.com
{ "jsonrpc":"2.0","id":1,"method":"getTokenAccountsByOwner","params":["<WALLET_ADDRESS>",{"mint":"9GnXzTS4ik2CAfrkaoVZbdzZ98xQ2ehbHQVnnJp6pump"},{"encoding":"jsonParsed"}] }
```

---

## Content Not on Current Site (New for Redesign)

The following sections exist in the PRD but have no equivalent content on the current site. Copy must be written fresh or confirmed by Muzzamil:

- **About section** (3 cards) — PRD has placeholder copy ready to use
- **Vision section** (4 cards: Banking, Investment App, Gaming, Holder Rewards) — PRD has draft copy; framing is aspirational (not promises)
- **Hero tagline** — "Hold Strong. Mine Deep. Win Big." — used on current site footer, confirmed

---

## Resolved Questions

| # | Question | Resolution |
|---|---|---|
| 1 | Tokenomics numbers | ✅ Resolved — fetched live from chain + DEX Screener API |
| 2 | Primary buy DEX | ✅ Resolved — Raydium primary CTA, DEX Screener also linked |
| 3 | Additional locked/team wallets | ✅ Resolved — none; only the 3 burn wallets exist |
| 4 | Have any burns happened? | ✅ Resolved — no burns executed yet; wallets 1 & 2 funded, wallet 3 not yet funded |
| 5 | Roadmap phases complete | ✅ Resolved — all 5 phases captured from screenshots |
| 6 | Hero tagline confirmed | ✅ Resolved — "Hold Strong. Mine Deep. Win Big." |
| 7 | Logo file | ✅ Resolved — `dhd-token.JPG` in project root |

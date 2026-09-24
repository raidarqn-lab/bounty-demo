# Nova Sapphire demo

A standalone Last War alliance dashboard prototype. The bounty board uses synthetic members, rewards and standings. The R4 review example includes a user-authorized real game screenshot and manually transcribed rows. No authentication, backend requests, real uploads or personal data collection.

Open through a static web server. The demo is fixed to the September 21, 2026 sample week; week arrows generate other weeks. Leadership controls simulate setting the weekly VS opponent. State resets on refresh.

Game dates use a 19:00 America/Los_Angeles reset on the previous calendar date. Daily VS bounties run Monday–Saturday; donation bounties run Monday–Sunday. Weekly recaps close before the reset into Monday.

Visual assets are included only for this demo. No general asset license is granted.

The R4 Review tab uses a real screenshot supplied and authorized by the user for the public demo. The seven editable player rows are manually transcribed, not OCR output. The pinned personal row remains visible in the image. Every submitted screenshot must be marked reviewed before final approval. Identity/date/coverage/overlap checks and a note are also required. Approval writes only temporary demo profile stats for manually transcribed rows, keyed per example player; reset clears these stats. This single image does not establish complete leaderboard coverage, which leadership must independently confirm. No authentication, messaging, points or backend writes occur.

Each draft row now requires separate player and score confirmations. Profile references are explicitly demo-only; none is a real Portal ID. Unmatched/duplicate profile choices and invalid scores block final approval. Editing a match clears its identity confirmation; editing a score clears its score confirmation. Only fully confirmed rows enter temporary demo profile history. Run `node --test review-row-state.test.mjs` for the isolated approval-state checks. Live Portal matching, authenticated staff approvals and durable synchronization remain unimplemented in this public demo.

Player matching is an inline search in each row: type part of a name, alliance or demo ID, then explicitly choose a result. Editing the search clears the prior match and identity confirmation. Unmatched rows remain blocked. Search covers the included demonstration profiles only, not the live Portal database.

Confirm all players and scores bulk-confirms valid matched rows only; evidence-page and final submission checks remain separate. A separate, explicitly simulated completed-leaderboard scenario demonstrates points-only approvals for later matching submissions, scoped to bounty/date/matchup/board/revision. Changed or incomplete evidence requires review. The temporary reward ledger prevents repeat rewards per member and bounty scope; it never saves player stats. This is not automatic evidence matching or production reward processing. Reset clears the scenario and ledger.

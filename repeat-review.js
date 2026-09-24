// Temporary demo ledger. Production must enforce this behind authenticated R4 access.
const rewardKey=s=>JSON.stringify([s.scope.bounty,s.scope.date,s.member]);
const scopeKey=s=>JSON.stringify([s.bounty,s.date,s.matchup,s.board,s.revision]);
export function createRepeatReview(){
 const complete=new Set(),awards=new Map();
 return {
  complete(scope){complete.add(scopeKey(scope));},
  eligible(submission){return complete.has(scopeKey(submission.scope))&&submission.sameFinalLeaderboard===true&&!awards.has(rewardKey(submission));},
  award(submission){if(!this.eligible(submission))return false;awards.set(rewardKey(submission),{submission:submission.id,points:10,acceptedAt:new Date().toISOString()});return true;},
  reset(){complete.clear();awards.clear();}
 };
}

// Demo-only profile references. No Portal lookup or write occurs here.
export function createRowApprovals(initial){
 const originals=structuredClone(initial),rows=structuredClone(initial),players=new Map(),scores=new Map();
 const validScore=value=>/^\d+$/.test(value)&&Number.isSafeInteger(Number(value));
 const unique=id=>originals.some(row=>row.profileRef===id)&&!!id&&rows.filter(row=>row.profileRef===id).length===1;
 return {
  setProfile(i,value){if(rows[i].profileRef!==value){rows[i].profileRef=value;players.delete(i);}},
  setScore(i,value){if(rows[i].score!==value){rows[i].score=value;scores.delete(i);}},
  confirmPlayer(i,checked){players.delete(i);if(checked&&unique(rows[i].profileRef))players.set(i,rows[i].profileRef);},
  confirmScore(i,checked){scores.delete(i);if(checked&&validScore(rows[i].score))scores.set(i,rows[i].score);},
  view(i){const row=rows[i],playerConfirmed=unique(row.profileRef)&&players.get(i)===row.profileRef,scoreConfirmed=validScore(row.score)&&scores.get(i)===row.score;return {...row,playerConfirmed,scoreConfirmed,canConfirmPlayer:unique(row.profileRef),canConfirmScore:validScore(row.score),ready:playerConfirmed&&scoreConfirmed};},
  ready(){return rows.every((_,i)=>this.view(i).ready);},
  approved(){if(!this.ready())throw Error('UNCONFIRMED_ROWS');return rows.map((_,i)=>this.view(i));},
  reset(){rows.splice(0,rows.length,...structuredClone(originals));players.clear();scores.clear();}
 };
}

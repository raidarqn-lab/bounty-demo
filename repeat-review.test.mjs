import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createRepeatReview} from './repeat-review.js';
const scope={bounty:'daily-wed',date:'2026-09-23',matchup:'NvSP-UNIi',board:'daily-all-players',revision:1};
const sample={id:'later-1',member:'member-2',scope,sameFinalLeaderboard:true};
test('requires completed final leaderboard and matching evidence',()=>{const x=createRepeatReview();assert.equal(x.award(sample),false);x.complete(scope);assert.equal(x.award({...sample,sameFinalLeaderboard:false}),false);assert.equal(x.award(sample),true);});
test('different date, bounty, matchup, board and revision require review',()=>{const x=createRepeatReview();x.complete(scope);for(const key of Object.keys(scope))assert.equal(x.eligible({...sample,scope:{...scope,[key]:'different'}}),false);});
test('repeat click or new submission by same member cannot award twice; other members can earn',()=>{const x=createRepeatReview();x.complete(scope);assert.equal(x.award(sample),true);assert.equal(x.award(sample),false);assert.equal(x.award({...sample,id:'retry'}),false);assert.equal(x.award({...sample,id:'other',member:'member-3'}),true);x.reset();assert.equal(x.award(sample),false);});

test('a revised approval cannot pay the same member twice',()=>{const x=createRepeatReview();x.complete(scope);x.award(sample);const revised={...scope,revision:2};x.complete(revised);assert.equal(x.award({...sample,scope:revised}),false);});

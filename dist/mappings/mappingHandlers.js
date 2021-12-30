"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleSumRewarded = exports.handleStakingRewarded = void 0;
const types_1 = require("../types");
async function handleStakingRewarded(event) {
    const { event: { data: [account, newReward] } } = event;
    const entity = new types_1.StakingReward(`${event.block.block.header.number}-${event.idx.toString()}`);
    entity.accountId = account.toString();
    entity.balance = newReward.toBigInt();
    entity.date = event.block.timestamp;
    await entity.save();
}
exports.handleStakingRewarded = handleStakingRewarded;
function createSumReward(accountId) {
    const entity = new types_1.SumReward(accountId);
    entity.totalReward = BigInt(0);
    return entity;
}
async function handleSumRewarded(event) {
    const { event: { data: [account, newReward] } } = event;
    let entity = await types_1.SumReward.get(account.toString());
    if (entity === undefined) {
        entity = createSumReward(account.toString());
    }
    entity.totalReward = entity.totalReward + newReward.toBigInt();
    entity.blockheight = event.block.block.header.number.toNumber();
    await entity.save();
}
exports.handleSumRewarded = handleSumRewarded;

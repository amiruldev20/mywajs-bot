export default async function({ m, mywa }) {
//console.log(m)
if (/vote/i.test(m.body)){
if (m.quoted.type === 'poll_creation') {
    const options = m.body.slice(6).split('//');
    const voteCount = {};
    for (const pollVote of quotedMsg.pollVotes) {
        for (const selectedOption of pollVote.selectedOptions) {
            if (!voteCount[selectedOption]) voteCount[selectedOption] = 0;
            voteCount[selectedOption]++;
        }
    }
    const voteCountStr = Object.entries(voteCount).map(([vote, number]) => `  -${vote}: ${number}`).join('\n');
    m.reply(
        `Voting to poll ${m.quoted.body}, with options: ${options.join(', ')}\ncurrent vote count:\n${voteCountStr}`
    );
    m.vote(options);
} else {
    m.reply('Usage: !vote TEST1//TEST2');
}
}
}
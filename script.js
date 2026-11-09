const names = ['グー', 'チョキ', 'パー'];
const buttons = document.querySelectorAll('[data-hand]');
const playerScore = document.querySelector('#player-score');
const computerScore = document.querySelector('#computer-score');
const roundLabel = document.querySelector('#round');
const result = document.querySelector('#result');
const history = document.querySelector('#history');
const restart = document.querySelector('#restart');
let round = 0, playerWins = 0, computerWins = 0;

function play(player) {
  if (round >= 3) return;
  const computer = Math.floor(Math.random() * 3);
  const outcome = (player - computer + 3) % 3;
  const message = outcome === 0 ? 'あいこ' : outcome === 2 ? 'あなたの勝ち' : 'コンピューターの勝ち';
  if (outcome === 2) playerWins++;
  if (outcome === 1) computerWins++;
  round++;
  playerScore.textContent = playerWins;
  computerScore.textContent = computerWins;
  const item = document.createElement('li');
  item.textContent = `${round}回戦：あなた ${names[player]} / 相手 ${names[computer]} → ${message}`;
  history.appendChild(item);
  if (round === 3) {
    roundLabel.textContent = '3回戦終了！';
    result.textContent = playerWins === computerWins ? '結果は引き分け！' : playerWins > computerWins ? '結果はあなたの勝ち！🎉' : '結果はコンピューターの勝ち！';
    buttons.forEach(button => { button.disabled = true; });
    restart.hidden = false;
  } else {
    roundLabel.textContent = `${round + 1}回戦`;
    result.textContent = `${message}！ 次の手を選んでね。`;
  }
}
buttons.forEach(button => button.addEventListener('click', () => play(Number(button.dataset.hand))));
restart.addEventListener('click', () => {
  round = playerWins = computerWins = 0;
  playerScore.textContent = computerScore.textContent = '0';
  roundLabel.textContent = '1回戦';
  result.textContent = 'じゃんけん、ぽん！';
  history.replaceChildren();
  buttons.forEach(button => { button.disabled = false; });
  restart.hidden = true;
});

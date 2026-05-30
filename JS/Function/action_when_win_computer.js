function action_when_win_computer(array_position_scored) {
  for (let i = 0; i < array_position_scored.length; i++) {
    document.getElementById(array_position_scored[i]).style.backgroundColor =
      "#2ecc71";
  }
  let value_cell = document.getElementById(array_position_scored[0]).innerText;
  if (value_cell == "O") {
    score_bot++;
    console.log(score_bot);
    h1_score_bot.innerText = score_bot;
    setTimeout(function () {
      alert(`Bạn quá GÀ :((((( !!`);
    }, 200);
    reset_game();
  } else {
    score_player++;
    console.log(score_player);
    h1_score_player.innerText = score_player;
    setTimeout(function () {
      alert(`Lạy bố đánh hay thế = )) !!`);
    }, 200);
    reset_game();
  }
}

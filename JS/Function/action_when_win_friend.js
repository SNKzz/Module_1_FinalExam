function action_when_win_friend(array_position_scored) {
  for (let i = 0; i < array_position_scored.length; i++) {
    document.getElementById(array_position_scored[i]).style.backgroundColor =
      "#2ecc71";
  }
  let value_cell = document.getElementById(array_position_scored[0]).innerText;
  if (value_cell == "O") {
    score_player_O++;
    h1_score_player_O.innerText = score_player_O;
    setTimeout(function () {
      alert(`Player O win !!!`);
    }, 200);
    reset_game();
  } else {
    score_player_X++;
    h1_score_player_X.innerText = score_player_X;
    setTimeout(function () {
      alert(`Player X win !!!`);
    }, 200);
    reset_game();
  }
}

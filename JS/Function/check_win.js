//================ ROW ===================
function check_line_row(start, end, array_caro_1, row_position) {
  let array_check = [];
  let arr_failed = [];
  for (let i = start; i <= end; i++) {
    if (i == end) {
      array_check.push(row_position + "-" + end);
      break;
    }
    if (
      array_caro_1[row_position][i] == array_caro_1[row_position][i + 1] &&
      array_caro_1[row_position][i] != "_"
    ) {
      array_check.push(row_position + "-" + i);
    }
  }
  if (array_check.length == 5) {
    return array_check;
  } else {
    return arr_failed;
  }
}

function check_row(array_caro_1, row_position, col_position) {
  if (col_position - 4 >= 0) {
    let array_position_win = check_line_row(
      col_position - 4,
      col_position,
      array_caro_1,
      row_position,
    );
    if (array_position_win.length == 5) {
      return array_position_win;
    }
  }

  if (
    col_position - 3 >= 0 &&
    col_position + 1 < array_caro_1[row_position].length
  ) {
    let array_position_win = check_line_row(
      col_position - 3,
      col_position + 1,
      array_caro_1,
      row_position,
    );
    if (array_position_win.length == 5) {
      return array_position_win;
    }
  }

  if (
    col_position - 2 >= 0 &&
    col_position + 2 < array_caro_1[row_position].length
  ) {
    let array_position_win = check_line_row(
      col_position - 2,
      col_position + 2,
      array_caro_1,
      row_position,
    );
    if (array_position_win.length == 5) {
      return array_position_win;
    }
  }

  if (
    col_position - 1 >= 0 &&
    col_position + 3 < array_caro_1[row_position].length
  ) {
    let array_position_win = check_line_row(
      col_position - 1,
      col_position + 3,
      array_caro_1,
      row_position,
    );
    if (array_position_win.length == 5) {
      return array_position_win;
    }
  }

  if (col_position + 4 < array_caro_1[row_position].length) {
    let array_position_win = check_line_row(
      col_position,
      col_position + 4,
      array_caro_1,
      row_position,
    );
    if (array_position_win.length == 5) {
      return array_position_win;
    }
  }

  return false;
}

//================ COLUMN ===================
function check_line_col(start, end, array_caro_1, col_position) {
  let arr_check = [];
  let arr_failed = [];
  for (let i = start; i <= end; i++) {
    if (i == end) {
      arr_check.push(i + "-" + col_position);
    } else {
      if (
        array_caro_1[i][col_position] == array_caro_1[i + 1][col_position] &&
        array_caro_1[i][col_position] != "_"
      ) {
        arr_check.push(i + "-" + col_position);
      }
    }
  }

  if (arr_check.length == 5) {
    return arr_check;
  } else {
    return arr_failed;
  }
}

function check_col(array_caro_1, row_position, col_position) {
  if (row_position - 4 >= 0) {
    let array_position_win = check_line_col(
      row_position - 4,
      row_position,
      array_caro_1,
      col_position,
    );

    if (array_position_win.length == 5) {
      return array_position_win;
    }
  }

  if (row_position - 3 >= 0 && row_position + 1 < array_caro_1.length) {
    let array_position_win = check_line_col(
      row_position - 3,
      row_position + 1,
      array_caro_1,
      col_position,
    );
    if (array_position_win.length == 5) {
      return array_position_win;
    }
  }

  if (row_position - 2 >= 0 && row_position + 2 < array_caro_1.length) {
    let array_position_win = check_line_col(
      row_position - 2,
      row_position + 2,
      array_caro_1,
      col_position,
    );
    if (array_position_win.length == 5) {
      return array_position_win;
    }
  }

  if (row_position - 1 >= 0 && row_position + 3 < array_caro_1.length) {
    let array_position_win = check_line_col(
      row_position - 1,
      row_position + 3,
      array_caro_1,
      col_position,
    );
    if (array_position_win.length == 5) {
      return array_position_win;
    }
  }

  if (row_position + 4 < array_caro_1.length) {
    let array_position_win = check_line_col(
      row_position,
      row_position + 4,
      array_caro_1,
      col_position,
    );
    if (array_position_win.length == 5) {
      return array_position_win;
    }
  }

  return false;
}

//================ CROSS LINE LEFT -> RIGHT ===================

function check_line_cross_L_R(
  start,
  end,
  array_caro_1,
  row_position,
  col_position,
) {
  let arr_check = [];
  let arr_failed = [];
  for (let i = start; i <= end; i++) {
    let x = row_position + i;
    let y = col_position + i;
    if (i == end) {
      arr_check.push(x + "-" + y);
    } else {
      if (
        array_caro_1[x][y] == array_caro_1[x + 1][y + 1] &&
        array_caro_1[x][y] != "_"
      ) {
        let x = row_position + i;
        let y = col_position + i;
        arr_check.push(x + "-" + y);
      }
    }
  }

  if (arr_check.length == 5) {
    return arr_check;
  } else {
    return arr_failed;
  }
}

function check_cross_line_L_R(array_caro_1, row_position, col_position) {
  if (row_position - 4 >= 0 && col_position - 4 >= 0) {
    let array_position_win = check_line_cross_L_R(
      -4,
      0,
      array_caro_1,
      row_position,
      col_position,
    );

    if (array_position_win.length == 5) {
      return array_position_win;
    }
  }

  if (
    row_position - 3 >= 0 &&
    row_position + 1 < array_caro_1.length &&
    col_position - 3 >= 0 &&
    col_position + 1 < array_caro_1[row_position].length
  ) {
    let array_position_win = check_line_cross_L_R(
      -3,
      1,
      array_caro_1,
      row_position,
      col_position,
    );
    if (array_position_win.length == 5) {
      return array_position_win;
    }
  }

  if (
    row_position - 2 >= 0 &&
    row_position + 2 < array_caro_1.length &&
    col_position - 2 >= 0 &&
    col_position + 2 < array_caro_1[row_position].length
  ) {
    let array_position_win = check_line_cross_L_R(
      -2,
      2,
      array_caro_1,
      row_position,
      col_position,
    );
    if (array_position_win.length == 5) {
      return array_position_win;
    }
  }

  if (
    row_position - 1 >= 0 &&
    row_position + 3 < array_caro_1.length &&
    col_position - 1 >= 0 &&
    col_position + 3 < array_caro_1[row_position].length
  ) {
    let array_position_win = check_line_cross_L_R(
      -1,
      3,
      array_caro_1,
      row_position,
      col_position,
    );
    if (array_position_win.length == 5) {
      return array_position_win;
    }
  }

  if (
    row_position + 4 < array_caro_1.length &&
    col_position + 4 < array_caro_1[row_position].length
  ) {
    let array_position_win = check_line_cross_L_R(
      0,
      4,
      array_caro_1,
      row_position,
      col_position,
    );
    if (array_position_win.length == 5) {
      return array_position_win;
    }
  }

  return false;
}

//================ CROSS LINE RIGHT -> LEFT ===================

function check_line_cross_R_L(
  start,
  end,
  array_caro_1,
  row_position,
  col_position,
) {
  let arr_check = [];
  let arr_failed = [];
  for (let i = start; i <= end; i++) {
    let x = row_position + i;
    let y = col_position - i;
    if (i == end) {
      arr_check.push(x + "-" + y);
    } else {
      if (
        array_caro_1[x][y] == array_caro_1[x + 1][y - 1] &&
        array_caro_1[x][y] != "_"
      ) {
        let x = row_position + i;
        let y = col_position - i;
        arr_check.push(x + "-" + y);
      }
    }
  }

  if (arr_check.length == 5) {
    return arr_check;
  } else {
    return arr_failed;
  }
}

function check_cross_line_R_L(array_caro_1, row_position, col_position) {
  if (
    row_position - 4 >= 0 &&
    col_position + 4 < array_caro_1[row_position].length
  ) {
    let array_position_win = check_line_cross_R_L(
      -4,
      0,
      array_caro_1,
      row_position,
      col_position,
    );

    if (array_position_win.length == 5) {
      return array_position_win;
    }
  }

  if (
    row_position - 3 >= 0 &&
    row_position + 1 < array_caro_1.length &&
    col_position + 3 >= 0 &&
    col_position - 1 < array_caro_1[row_position].length
  ) {
    let array_position_win = check_line_cross_R_L(
      -3,
      1,
      array_caro_1,
      row_position,
      col_position,
    );
    if (array_position_win.length == 5) {
      return array_position_win;
    }
  }

  if (
    row_position - 2 >= 0 &&
    row_position + 2 < array_caro_1.length &&
    col_position - 2 >= 0 &&
    col_position + 2 < array_caro_1[row_position].length
  ) {
    let array_position_win = check_line_cross_R_L(
      -2,
      2,
      array_caro_1,
      row_position,
      col_position,
    );
    if (array_position_win.length == 5) {
      return array_position_win;
    }
  }

  if (
    row_position - 1 >= 0 &&
    row_position + 3 < array_caro_1.length &&
    col_position + 1 >= 0 &&
    col_position - 3 < array_caro_1[row_position].length
  ) {
    let array_position_win = check_line_cross_R_L(
      -1,
      3,
      array_caro_1,
      row_position,
      col_position,
    );
    if (array_position_win.length == 5) {
      return array_position_win;
    }
  }

  if (
    row_position + 4 < array_caro_1.length &&
    col_position - 4 < array_caro_1[row_position].length
  ) {
    let array_position_win = check_line_cross_R_L(
      0,
      4,
      array_caro_1,
      row_position,
      col_position,
    );
    if (array_position_win.length == 5) {
      return array_position_win;
    }
  }

  return false;
}

function reset_game() {
  count_turn = 0;
  turn = "person_turn";
  setTimeout(function () {
    for (let i = 0; i < array_caro_1.length; i++) {
      array_caro_2[i] = [];
      for (let j = 0; j < array_caro_1[i].length; j++) {
        array_caro_1[i][j] = "_";

        let cell = new Cell("_");
        array_caro_2[i].push(cell);
        document.getElementById(i + "-" + j).style.backgroundColor = "white";
        document.getElementById(i + "-" + j).innerHTML = "";
      }
    }
  }, 500);
  console.log(array_caro_2);
}
function game_tie() {
  setTimeout(function () {
    alert("Game Tie !!");
  }, 200);
  reset_game();
}

function check_win(array_caro_1, row_position, col_position, type_of_game) {
  let array_position_win = [];

  if (check_row(array_caro_1, row_position, col_position) != false) {
    array_position_win = check_row(array_caro_1, row_position, col_position);
  } else if (check_col(array_caro_1, row_position, col_position) != false) {
    array_position_win = check_col(array_caro_1, row_position, col_position);
  } else if (
    check_cross_line_L_R(array_caro_1, row_position, col_position) != false
  ) {
    array_position_win = check_cross_line_L_R(
      array_caro_1,
      row_position,
      col_position,
    );
  } else if (
    check_cross_line_R_L(array_caro_1, row_position, col_position) != false
  ) {
    array_position_win = check_cross_line_R_L(
      array_caro_1,
      row_position,
      col_position,
    );
  }
  console.log(array_position_win);
  if (array_position_win.length == 5) {
    if (type_of_game == "computer") {
      action_when_win_computer(array_position_win);
    } else {
      action_when_win_friend(array_position_win);
    }
  }
}

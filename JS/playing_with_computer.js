let table_caro = document.getElementById("table_caro");
let h1_score_player = document.getElementById("h1_score_player");
let h1_score_bot = document.getElementById("h1_score_bot");

let score_player = 0;
let score_bot = 0;

let total_cell = 0;
let array_caro_1 = [];
let array_caro_2 = [];
let turn = "person_turn";
let count_turn = 0;

window.onload = function create_table() {
  let array_size_selected = sessionStorage.getItem("size").split("-");

  let quantity_row = +array_size_selected[0];
  let quantity_col = +array_size_selected[1];
  total_cell = quantity_col * quantity_row;

  let queri_create_table_caro = "";
  for (let i = 0; i < quantity_row; i++) {
    array_caro_1[i] = [];
    array_caro_2[i] = [];
    queri_create_table_caro += `<tr id="${i}">`;
    for (let k = 0; k < quantity_col; k++) {
      let id_cell = i + "-" + k;
      queri_create_table_caro += `<td id="${id_cell}" onclick="click_cell_person('${id_cell}')"></td>`;
      array_caro_1[i].push("_");
      let cell = new Cell("_");
      array_caro_2[i].push(cell);
    }
    queri_create_table_caro += `</tr>`;
  }
  table_caro.innerHTML = queri_create_table_caro;
};

// Functions for checking to defense
function check_5_points_row_defense(start, end, i) {
  let count_X = 0;
  for (let k = start; k <= end; k++) {
    let value = array_caro_2[i][k].get_value();
    if (value == "X") {
      count_X++;
    } else if (value == "O") {
      return 0;
    }
  }

  switch (count_X) {
    case 1:
      return 10;

    case 2:
      return 100;

    case 3:
      return 1000;

    case 4:
      return 100000;

    default:
      return 0;
  }
}

function check_5_points_col_defense(start, end, j) {
  let count_X = 0;
  for (let k = start; k <= end; k++) {
    if (array_caro_2[k][j].get_value() == "X") {
      count_X++;
    } else if (array_caro_2[k][j].get_value() == "O") {
      return 0;
    }
  }

  switch (count_X) {
    case 1:
      return 10;
      break;
    case 2:
      return 100;
      break;
    case 3:
      return 1000;
      break;
    case 4:
      return 100000;
      break;
    default:
      return 0;
  }
}

function check_5_points_cross_L_R_defense(start, end, i, j) {
  let count_X = 0;
  for (let k = start; k <= end; k++) {
    if (array_caro_2[i + k][j + k].get_value() == "X") {
      count_X++;
    } else if (array_caro_2[i + k][j + k].get_value() == "O") {
      return 0;
    }
  }

  switch (count_X) {
    case 1:
      return 10;
      break;
    case 2:
      return 100;
      break;
    case 3:
      return 1000;
      break;
    case 4:
      return 100000;
      break;
    default:
      return 0;
  }
}

function check_5_points_cross_R_L_defense(start, end, i, j) {
  let count_X = 0;
  for (let k = start; k <= end; k++) {
    if (array_caro_2[i - k][j + k].get_value() == "X") {
      count_X++;
    } else if (array_caro_2[i - k][j + k].get_value() == "O") {
      return 0;
    }
  }

  switch (count_X) {
    case 1:
      return 10;

    case 2:
      return 100;

    case 3:
      return 1000;

    case 4:
      return 1000000;

    default:
      return 0;
  }
}

// Functions for checking to attack
function check_5_points_row_attack(start, end, i) {
  let count_O = 0;
  for (let k = start; k <= end; k++) {
    let value = array_caro_2[i][k].get_value();
    if (value == "O") {
      count_O++;
    } else if (value == "X") {
      return 0;
    }
  }

  switch (count_O) {
    case 1:
      return 10;

    case 2:
      return 100;

    case 3:
      return 1000;

    case 4:
      return 1000000;

    default:
      return 0;
  }
}

function check_5_points_col_attack(start, end, j) {
  let count_O = 0;
  for (let k = start; k <= end; k++) {
    if (array_caro_2[k][j].get_value() == "O") {
      count_O++;
    } else if (array_caro_2[k][j].get_value() == "X") {
      return 0;
    }
  }
  switch (count_O) {
    case 1:
      return 10;

    case 2:
      return 100;

    case 3:
      return 1000;

    case 4:
      return 1000000;

    default:
      return 0;
  }
}

function check_5_points_cross_L_R_attack(start, end, i, j) {
  let count_O = 0;
  for (let k = start; k <= end; k++) {
    if (array_caro_2[i + k][j + k].get_value() === "O") {
      count_O++;
    } else if (array_caro_2[i + k][j + k].get_value() == "X") {
      return 0;
    }
  }

  switch (count_O) {
    case 1:
      return 10;
    case 2:
      return 100;
    case 3:
      return 1000;
    case 4:
      return 1000000;
    default:
      return 0;
  }
}

function check_5_points_cross_R_L_attack(start, end, i, j) {
  let count_O = 0;
  for (let k = start; k <= end; k++) {
    if (array_caro_2[i - k][j + k].get_value() == "O") {
      count_O++;
    } else if (array_caro_2[i - k][j + k].get_value() == "X") {
      return 0;
    }
  }

  switch (count_O) {
    case 1:
      return 10;

    case 2:
      return 100;

    case 3:
      return 1000;

    case 4:
      return 1000000;

    default:
      return 0;
  }
}

function find_cell_containing_score_max(condition) {
  let id_cell_max = "";
  let max = -99999999;
  for (let i = 0; i < array_caro_2.length; i++) {
    for (let j = 0; j < array_caro_2[i].length; j++) {
      if (array_caro_2[i][j].get_value() == "_") {
        let score = array_caro_2[i][j].get_total_score();
        if (max < score) {
          max = score;
          id_cell_max = i + "-" + j;
        }
      }
    }
  }
  return id_cell_max;
}

function click_cell_computer(idCell) {
  let position_cell = idCell.split("-");
  let row_position = +position_cell[0];
  let col_position = +position_cell[1];
  let cell_clicked = document.getElementById(idCell);

  array_caro_1[row_position][col_position] = "O";
  cell_clicked.innerText = "O";
  cell_clicked.style.color = "blue";
  array_caro_2[row_position][col_position].set_value("O");
  check_win(array_caro_1, row_position, col_position, "computer");
  turn = "person_turn";
  count_turn++;

  if (count_turn == total_cell) {
    game_tie();
  }
}

function decide_where_to_click() {
  let id_chosen_cell = "";

  for (let i = 0; i < array_caro_2.length; i++) {
    for (let j = 0; j < array_caro_2[i].length; j++) {
      let defense_score = 0;
      let attack_score = 0;
      if (array_caro_2[i][j].get_value() == "_" && array_caro_1[i][j] == "_") {
        // ----------DEFENSE------------
        //Check row
        if (j - 4 >= 0) {
          defense_score += check_5_points_row_defense(j - 4, j, i);
        }

        if (j - 3 >= 0 && j + 1 < array_caro_2[i].length) {
          defense_score += check_5_points_row_defense(j - 3, j + 1, i);
        }

        if (j - 2 >= 0 && j + 2 < array_caro_2[i].length) {
          defense_score += check_5_points_row_defense(j - 2, j + 2, i);
        }

        if (j - 1 >= 0 && j + 3 < array_caro_2[i].length) {
          defense_score += check_5_points_row_defense(j - 1, j + 3, i);
        }

        if (j + 4 < array_caro_2[i].length) {
          defense_score += check_5_points_row_defense(j, j + 4, i);
        }

        //Check col
        if (i - 4 >= 0) {
          defense_score += check_5_points_col_defense(i - 4, i, j);
        }
        if (i - 3 >= 0 && i + 1 < array_caro_2.length) {
          defense_score += check_5_points_col_defense(i - 3, i + 1, j);
        }
        if (i - 2 >= 0 && i + 2 < array_caro_2.length) {
          defense_score += check_5_points_col_defense(i - 2, i + 2, j);
        }
        if (i - 1 >= 0 && i + 3 < array_caro_2.length) {
          defense_score += check_5_points_col_defense(i - 1, i + 3, j);
        }
        if (i + 4 < array_caro_2.length) {
          defense_score += check_5_points_col_defense(i, i + 4, j);
        }

        //Check cross-line from Left -> Right
        if (i - 4 >= 0 && j - 4 >= 0) {
          defense_score += check_5_points_cross_L_R_defense(-4, 0, i, j);
        }
        if (
          i - 3 >= 0 &&
          j - 3 >= 0 &&
          i + 1 < array_caro_2.length &&
          j + 1 < array_caro_2[i].length
        ) {
          defense_score += check_5_points_cross_L_R_defense(-3, 1, i, j);
        }
        if (
          i - 2 >= 0 &&
          j - 2 >= 0 &&
          i + 2 < array_caro_2.length &&
          j + 2 < array_caro_2[i].length
        ) {
          defense_score += check_5_points_cross_L_R_defense(-2, 2, i, j);
        }
        if (
          i - 1 >= 0 &&
          j - 1 >= 0 &&
          i + 3 < array_caro_2.length &&
          j + 3 < array_caro_2[i].length
        ) {
          defense_score += check_5_points_cross_L_R_defense(-1, 3, i, j);
        }
        if (i + 4 < array_caro_2.length && j + 4 < array_caro_2[i].length) {
          defense_score += check_5_points_cross_L_R_defense(0, 4, i, j);
        }

        //Check cross-line from Right -> Left
        if (i - 4 >= 0 && j + 4 < array_caro_2[i].length) {
          defense_score += check_5_points_cross_R_L_defense(0, 4, i, j);
        }
        if (
          i - 3 >= 0 &&
          j + 3 < array_caro_2[i].length &&
          i + 1 < array_caro_2.length &&
          j - 1 >= 0
        ) {
          defense_score += check_5_points_cross_R_L_defense(-1, 3, i, j);
        }
        if (
          i - 2 >= 0 &&
          j + 2 < array_caro_2[i].length &&
          i + 2 < array_caro_2.length &&
          j - 2 >= 0
        ) {
          defense_score += check_5_points_cross_R_L_defense(-2, 2, i, j);
        }
        if (
          i - 1 >= 0 &&
          j + 1 < array_caro_2[i].length &&
          i + 3 < array_caro_2.length &&
          j - 3 >= 0
        ) {
          defense_score += check_5_points_cross_R_L_defense(-3, 1, i, j);
        }
        if (j - 4 >= 0 && i + 4 < array_caro_2.length) {
          defense_score += check_5_points_cross_R_L_defense(-4, 0, i, j);
        }

        // ----------ATTACK------------
        //Check row
        if (j - 4 >= 0) {
          attack_score += check_5_points_row_attack(j - 4, j, i);
        }

        if (j - 3 >= 0 && j + 1 < array_caro_2[i].length) {
          attack_score += check_5_points_row_attack(j - 3, j + 1, i);
        }

        if (j - 2 >= 0 && j + 2 < array_caro_2[i].length) {
          attack_score += check_5_points_row_attack(j - 2, j + 2, i);
        }

        if (j - 1 >= 0 && j + 3 < array_caro_2[i].length) {
          attack_score += check_5_points_row_attack(j - 1, j + 3, i);
        }

        if (j + 4 < array_caro_2[i].length) {
          attack_score += check_5_points_row_attack(j, j + 4, i);
        }

        //Check col
        if (i - 4 >= 0) {
          attack_score += check_5_points_col_attack(i - 4, i, j);
        }
        if (i - 3 >= 0 && i + 1 < array_caro_2.length) {
          attack_score += check_5_points_col_attack(i - 3, i + 1, j);
        }
        if (i - 2 >= 0 && i + 2 < array_caro_2.length) {
          attack_score += check_5_points_col_attack(i - 2, i + 2, j);
        }
        if (i - 1 >= 0 && i + 3 < array_caro_2.length) {
          attack_score += check_5_points_col_attack(i - 1, i + 3, j);
        }
        if (i + 4 < array_caro_2.length) {
          attack_score += check_5_points_col_attack(i, i + 4, j);
        }

        //Check cross-line from Left -> Right
        if (i - 4 >= 0 && j - 4 >= 0) {
          attack_score += check_5_points_cross_L_R_attack(-4, 0, i, j);
        }
        if (
          i - 3 >= 0 &&
          j - 3 >= 0 &&
          i + 1 < array_caro_2.length &&
          j + 1 < array_caro_2[i].length
        ) {
          attack_score += check_5_points_cross_L_R_attack(-3, 1, i, j);
        }
        if (
          i - 2 >= 0 &&
          j - 2 >= 0 &&
          i + 2 < array_caro_2.length &&
          j + 2 < array_caro_2[i].length
        ) {
          attack_score += check_5_points_cross_L_R_attack(-2, 2, i, j);
        }
        if (
          i - 1 >= 0 &&
          j - 1 >= 0 &&
          i + 3 < array_caro_2.length &&
          j + 3 < array_caro_2[i].length
        ) {
          attack_score += check_5_points_cross_L_R_attack(-1, 3, i, j);
        }
        if (i + 4 < array_caro_2.length && j + 4 < array_caro_2[i].length) {
          attack_score += check_5_points_cross_L_R_attack(0, 4, i, j);
        }

        //Check cross-line from Right -> Left
        if (i - 4 >= 0 && j + 4 < array_caro_2[i].length) {
          attack_score += check_5_points_cross_R_L_attack(0, 4, i, j);
        }
        if (
          i - 3 >= 0 &&
          j + 3 < array_caro_2[i].length &&
          i + 1 < array_caro_2.length &&
          j - 1 >= 0
        ) {
          attack_score += check_5_points_cross_R_L_attack(-1, 3, i, j);
        }
        if (
          i - 2 >= 0 &&
          j + 2 < array_caro_2[i].length &&
          i + 2 < array_caro_2.length &&
          j - 2 >= 0
        ) {
          attack_score += check_5_points_cross_R_L_attack(-2, 2, i, j);
        }
        if (
          i - 1 >= 0 &&
          j + 1 < array_caro_2[i].length &&
          i + 3 < array_caro_2.length &&
          j - 3 >= 0
        ) {
          attack_score += check_5_points_cross_R_L_attack(-3, 1, i, j);
        }
        if (j - 4 >= 0 && i + 4 < array_caro_2.length) {
          attack_score += check_5_points_cross_R_L_attack(-4, 0, i, j);
        }

        let total = attack_score + defense_score;
        array_caro_2[i][j].set_total_score(total);
      }
    }
  }

  id_chosen_cell = find_cell_containing_score_max();
  // console.log(id_chosen_cell);

  click_cell_computer(id_chosen_cell);
}

function click_cell_person(idCell) {
  let position_cell = idCell.split("-");
  let row_position = +position_cell[0];
  let col_position = +position_cell[1];
  let cell_clicked = document.getElementById(idCell);
  if (
    turn == "person_turn" &&
    array_caro_1[row_position][col_position] == "_"
  ) {
    array_caro_1[row_position][col_position] = "X";
    cell_clicked.innerText = "X";
    cell_clicked.style.color = "red";
    array_caro_2[row_position][col_position].set_value("X");
    check_win(array_caro_1, row_position, col_position, "computer");
    turn = "computer_turn";
    count_turn++;
    console.log(count_turn);
    if (count_turn == total_cell) {
      game_tie();
    } else {
      decide_where_to_click();
    }
  }
}

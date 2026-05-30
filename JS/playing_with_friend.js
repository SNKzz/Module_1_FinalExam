let table_caro_friend = document.getElementById("table_caro_friend");
let h1_score_player_X = document.getElementById("h1_score_player_X");
let h1_score_player_O = document.getElementById("h1_score_player_O");
let h1_player_X = document.getElementById("h1_player_X");
let h1_player_O = document.getElementById("h1_player_O");
let score_player_X = 0;
let score_player_O = 0;
const PLAYER_X = "X";
const PLAYER_O = "O";

let total_cell_table_friend = 0;
let array_caro_1 = [];
let array_caro_2 = [];
let turn = PLAYER_X;
let count_turn_duo = 0;

window.onload = function create_table_friend() {
  let array_size_selected = sessionStorage.getItem("size").split("-");
  console.log(array_size_selected);
  let quantity_row = +array_size_selected[0];
  let quantity_col = +array_size_selected[1];
  console.log(quantity_col + "--" + quantity_row);
  total_cell = quantity_col * quantity_row;

  let queri_create_table_caro_friend = "";
  for (let i = 0; i < quantity_row; i++) {
    array_caro_1[i] = [];
    array_caro_2[i] = [];
    queri_create_table_caro_friend += `<tr id="${i}">`;
    for (let k = 0; k < quantity_col; k++) {
      let id_cell = i + "-" + k;
      queri_create_table_caro_friend += `<td id="${id_cell}" onclick=click_cell('${id_cell}')></td>`;
      array_caro_1[i].push("_");
      let cell = new Cell("_");
      array_caro_2[i].push(cell);
    }
    queri_create_table_caro_friend += `</tr>`;
  }
  table_caro_friend.innerHTML = queri_create_table_caro_friend;
};

function click_cell(idCell) {
  let position_cell = idCell.split("-");
  let row_position = +position_cell[0];
  let col_position = +position_cell[1];
  let cell_clicked = document.getElementById(idCell);

  if (turn == PLAYER_X && array_caro_1[row_position][col_position] == "_") {
    h1_player_O.style.color = "rgb(23, 122, 34)";
    h1_player_X.style.color = "rgb(251, 249, 249)";
    // h1_player_X.style.backgroundColor = "white";
    // h2_player_O.style.backgroundColor = "greenyellow";

    array_caro_1[row_position][col_position] = PLAYER_X;
    array_caro_2[row_position][col_position].set_value(PLAYER_X);

    cell_clicked.innerText = PLAYER_X;
    cell_clicked.style.color = "red";

    check_win(array_caro_1, row_position, col_position, "friend");
    turn = PLAYER_O;
    count_turn_duo++;
  } else if (
    turn == PLAYER_O &&
    array_caro_1[row_position][col_position] == "_"
  ) {
    // h1_player_X.style.backgroundColor = "greenyellow";
    // h2_player_O.style.backgroundColor = "white";
    h1_player_X.style.color = "rgb(12, 137, 27)";
    h1_player_O.style.color = "rgb(251, 249, 249)";
    array_caro_1[row_position][col_position] = PLAYER_O;
    array_caro_2[row_position][col_position].set_value(PLAYER_O);

    cell_clicked.innerText = PLAYER_O;
    cell_clicked.style.color = "blue";

    check_win(array_caro_1, row_position, col_position, "friend");
    turn = PLAYER_X;
    count_turn_duo++;
  }

  if (count_turn_duo == total_cell_table_friend) {
    game_tie();
  }
}

let select_mode = document.getElementById("select_mode");
let select_size = document.getElementById("select_size_table");

function start_game() {
  let selected_mode = select_mode.value;
  let selected_size = select_size.value;
  console.log(selected_mode);
  sessionStorage.setItem("size", selected_size);

  if (selected_mode == "computer") {
    window.location.href = "../HTML/index_playing_with_computer.html";
  } else if (selected_mode == "person") {
    window.location.href = "../HTML/index_playing_with_friend.html";
  }
}

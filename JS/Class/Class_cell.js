class Cell {
  constructor(value) {
    this.value = value;
    this.total_score = 0;
  }
  get_value() {
    return this.value;
  }
  set_value(_value) {
    this.value = _value;
  }
  get_total_score() {
    return this.total_score;
  }
  set_total_score(_value) {
    this.total_score = _value;
  }
}

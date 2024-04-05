var msg = document.getElementById("msg"),
  guessInput = document.getElementById("guess"),
  attemptsTable = document
    .getElementById("attempts")
    .getElementsByTagName("tbody")[0];

var g, c;
function createNewGame() {
  (g = []), (c = 0); // reset game

  while (g.length < 4) {
    let rn = parseInt(Math.random() * 10) + "";
    !g.includes(rn) && g.push(rn);
  }
}

function gameOver(win) {
  msg.innerHTML =
    (win ? "Ganaste" : "Perdiste") + ", el número era " + g.join("");

  openDialog("dialog");

  Array.from(attemptsTable.getElementsByTagName("tr")).forEach((td) =>
    td.remove()
  );

  createNewGame();
}

function validate() {
  let p, f, n, tr;

  p = f = 0;
  n = guessInput.value.split("");
  guessInput.value = "";

  // check if input is allowed
  if (n.length != 4 || new Set(n).size != 4) {
    msg.innerHTML = "Debe tener 4 cifras únicas";
    return openDialog("dialog");
  }

  // process the input
  for (let i = 0; i < 4; i++) {
    if (g[i] == n[i]) f++;
    else if (n.includes(g[i])) p++;
  }

  const ROW = `<tr>
                <td>${++c}</td>
                <td>${n.join("")}</td>
                <td>${p}</td>
                <td>${f}</td>
                </tr>`;

  tr = attemptsTable.insertRow(attemptsTable.rows.length);
  tr.innerHTML = ROW;

  // check if game is over
  if (f == 4 || c == 10) return gameOver(f == 4);
}

colorScheme("green");
// toggleDarkMode()
createNewGame();

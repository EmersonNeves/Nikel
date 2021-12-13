const myModal = new bootstrap.Modal("#transactionModal");
const session = localStorage.getItem("session");
let logged = sessionStorage.getItem("logged");
let data = {
  transactions: [],
};

document.getElementById("buttonLogout").addEventListener("click", handleLogout);

console.log(date);

document
  .getElementById("transactionForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const value = parseFloat(document.getElementById("value").value);
    const description = document.getElementById("description").value;
    const date = document.getElementById("date").value;
    const type = document.querySelector(
      'input[name="type-input"]:checked'
    ).value;

    console.log({ value, description, date, type });

    data.transactions.unshift({
      value,
      type,
      description,
      date,
    }); //faz com que o item seja adicionado no topo

    handleSaveData(data);
    e.target.reset();
    myModal.hide();
    getTransactions();

    alert("Lançamento adicionado com sucesso.");
  });

handleCheckLogged();

function handleCheckLogged() {
  if (session) {
    sessionStorage.setItem("logged", session);
    logged = session;
  }

  if (!logged) {
    window.location.href = "index.html";
    return;
  }

  const dataUser = localStorage.getItem(logged);

  if (dataUser) {
    data = JSON.parse(dataUser);
  }

  getTransactions();
}

function handleSaveData(data) {
  localStorage.setItem(data.email, JSON.stringify(data));
}

function handleLogout() {
  sessionStorage.removeItem("logged");
  localStorage.removeItem("session");
  window.location.href = "index.html";
  alert("Teste");
}

function getTransactions() {
  const transactions = data.transactions;
  let transactionHtml = ``;

  if (transactions.length) {
    transactions.forEach((transaction) => {
      console.log(transaction.type);

      transaction.type === "income"
        ? (transaction.type = "Entrada")
        : (transaction.type = "Saída");

      transactionHtml += `
            <tr>
            <th name="date" id="date" scope="row">${transaction.date}</th>
            <td>R$ ${transaction.value.toFixed(2)}</td>
            <td>${transaction.type}</td>
          </tr>
            `;
    });
  }

  document.getElementById("transactionList").innerHTML = transactionHtml;
}

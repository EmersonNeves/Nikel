const myModal = new bootstrap.Modal("#transactionModal");
const session = localStorage.getItem("session");
let logged = sessionStorage.getItem("logged");
let data = {
  transactions: [],
};

document.getElementById("buttonLogout").addEventListener("click", handleLogout);
document.getElementById("seeAllTransactions").addEventListener("click", function (){
    window.location.href = 'transactions.html';
})

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
    handleGetIncome();
    handleGetOutcome();
    handleGetTotal();

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

  handleGetIncome();
  handleGetOutcome();
  handleGetTotal();
}

function handleLogout() {
  sessionStorage.removeItem("logged");
  localStorage.removeItem("session");
  window.location.href = "index.html";
  alert("Teste");
}

function handleSaveData(data) {
  localStorage.setItem(data.email, JSON.stringify(data));
}

function handleGetIncome() {
  const transactions = data.transactions;
  const income = transactions.filter(
    (transaction) => transaction.type === "income"
  );

  if (income.length > 0) {
    let incomeHtml = ``;

    let limit = 0;

    if (income.length > 5) {
      limit = 5;
    } else {
      limit = income.length;
    }

    for (let index = 0; index < limit; index++) {
      incomeHtml += `
      <div class="row mb-4">
      <div class="col-12">
        <h3 class="fs-2">R$ ${income[index].value.toFixed(2)}</h3>
        <div class="row">
          <div class="col-12 col-md-8">
            <p>${income[index].description}</p>
          </div>
          <div class="col-12 col-md-3 d-flex justify-content-end">
          ${income[index].date}
          </div>
        </div>
      </div>
    </div>
      `;
    }

    document.getElementById("incomeValue").innerHTML = incomeHtml;
  }
}

function handleGetOutcome() {
  const transactions = data.transactions;
  const outcome = transactions.filter(
    (transaction) => transaction.type === "outcome"
  );

  console.log(outcome);

  if (outcome.length > 0) {
    let outcomeHtml = ``;

    let limit = 0;

    if (outcome.length > 5) {
      limit = 5;
    } else {
      limit = outcome.length;
    }

    for (let index = 0; index < limit; index++) {
      outcomeHtml += `
      <div class="row mb-4">
      <div class="col-12">
        <h3 class="fs-2">R$ ${outcome[index].value.toFixed(2)}</h3>
        <div class="row">
          <div class="col-12 col-md-8">
            <p>${outcome[index].description}</p>
          </div>
          <div class="col-12 col-md-3 d-flex justify-content-end">
          ${outcome[index].date}
          </div>
        </div>
      </div>
    </div>
      `;
    }

    document.getElementById("outcomeValue").innerHTML = outcomeHtml;
  }
}

function handleGetTotal() {
  const transactions = data.transactions;
  let total = 0;
  transactions.forEach((transaction) => {
    if (transaction.type === "income") {
      total += transaction.value;
    } else {
      total -= transaction.value;
    }
  });

  document.getElementById("total").innerHTML = `R$ ${total.toFixed(2)}`;
}

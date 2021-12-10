const openNewAcountModal = new bootstrap.Modal("#open-new-account");

const session = localStorage.getItem("session");
let logged = sessionStorage.getItem("logged");


console.log(session);
console.log(logged);
//ENTRAR NO SISTEMA

handleCheckLogged();

document.getElementById("login-box").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const check_session = document.getElementById("check-session").checked;

  console.log({ email, password, check_session });

  const data = handleGetAccount(email);

  if (!data) {
    alert("Dados incorretos. Por favor, verifique o usuário ou senha.");
    return;
  }

  if (data) {
    if (data.password !== password) {
      alert("Dados incorretos. Por favor, verifique o usuário ou senha.");
      return;
    }

    handleSaveSession(data.email, check_session);
    window.location.href = "home.html";
  }
});

//CRIAR CONTAR

document
  .getElementById("create-login")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("create-email").value;
    const password = document.getElementById("create-password").value;
    const password_confirmation = document.getElementById(
      "create-password-confirmation"
    ).value;

    console.log({ email, password, password_confirmation });

    if (email.length < 6) {
      alert("Preencha o campo com um e-mail válido");
      return;
    }
    if (password.length < 8) {
      alert("Senha deve ter pelo menos 8 digitos");
      return;
    }
    if (password !== password_confirmation) {
      alert("A senhas não conferem. Por favor, verifique e as corrija.");
      return;
    } else {
      handleSaveAccount({
        email,
        password,
        transactions: [],
      });

      openNewAcountModal.hide();

      alert("Dados cadastrados com sucesso");
    }
  });

function handleCheckLogged() {

  if (session) {
    sessionStorage.setItem("logged", session);
    logged = session;
  }
  if (logged) {
    handleSaveSession(logged, session);

    window.location.href = "home.html";
  }
}

function handleSaveAccount(data) {
  localStorage.setItem(data.email, JSON.stringify(data));
}

function handleGetAccount(key) {
  const account = localStorage.getItem(key);

  if (account) {
    return JSON.parse(account);
  }

  return;
}

function handleSaveSession(data, saveSession) {
  if (saveSession) {
    localStorage.setItem("session", data);
  }

  sessionStorage.setItem("logged", data);
}

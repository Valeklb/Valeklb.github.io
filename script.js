// ==============================
// KAIZENGO v4.0 - Sistema Completo
// ==============================

// ======= CONTROLE DE LOGIN =======
document.addEventListener("DOMContentLoaded", () => {
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
  if (usuarioLogado) {
    document.getElementById("login-screen").classList.add("hidden");
    showScreen("home");
    document.getElementById("logout-btn").classList.remove("hidden");
    document.querySelector("header").style.display = "block";
    document.querySelector("main").style.display = "block";
    document.querySelector("footer").style.display = "block";
  } else {
    document.querySelector("header").style.display = "none";
    document.querySelector("main").style.display = "none";
    document.querySelector("footer").style.display = "none";
  }
});

// ======= LOGIN =======
const loginBtn = document.getElementById("login-btn");
const loginError = document.getElementById("login-error");

loginBtn.addEventListener("click", () => {
  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();

  const users = JSON.parse(localStorage.getItem("usuarios")) || [];
  const found = users.find((u) => u.matricula === user && u.senha === pass);

  if (found || user === "3081270") {
    // Permite login fixo para matrícula do gestor
    localStorage.setItem("usuarioLogado", JSON.stringify({ matricula: user }));
    document.getElementById("login-screen").classList.add("hidden");
    showScreen("home");
    document.getElementById("logout-btn").classList.remove("hidden");

    // Mostra conteúdo principal
    document.querySelector("header").style.display = "block";
    document.querySelector("main").style.display = "block";
    document.querySelector("footer").style.display = "block";
  } else {
    loginError.style.display = "block";
  }
});

// ======= CADASTRO =======
document.getElementById("first-access").addEventListener("click", () => {
  toggleScreens("login-screen", "register-screen");
});

document.getElementById("voltar-login").addEventListener("click", () => {
  toggleScreens("register-screen", "login-screen");
});

document.getElementById("register-btn").addEventListener("click", () => {
  const matricula = document.getElementById("reg-matricula").value.trim();
  const email = document.getElementById("reg-email").value.trim();
  const senha = document.getElementById("reg-senha").value.trim();
  const confirma = document.getElementById("reg-confirma").value.trim();

  if (!matricula || !email || !senha || !confirma) {
    alert("Preencha todos os campos!");
    return;
  }
  if (senha !== confirma) {
    alert("As senhas não conferem!");
    return;
  }
  if (matricula !== "3081270") {
    alert("Apenas matrículas de gestores Yamaha podem realizar o acesso nesta versão.");
    return;
  }

  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  if (usuarios.some((u) => u.matricula === matricula)) {
    alert("Já existe um usuário com essa matrícula!");
    return;
  }

  usuarios.push({ matricula, email, senha });
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  alert("Cadastro realizado com sucesso!");
  toggleScreens("register-screen", "login-screen");
});

// ======= REDEFINIÇÃO DE SENHA =======
document.getElementById("forgot-pass").addEventListener("click", () => {
  toggleScreens("login-screen", "reset-screen");
});

document.getElementById("voltar-login-reset").addEventListener("click", () => {
  toggleScreens("reset-screen", "login-screen");
});

document.getElementById("reset-btn").addEventListener("click", () => {
  const matricula = document.getElementById("reset-matricula").value.trim();
  const nova = document.getElementById("reset-nova-senha").value.trim();
  const confirma = document.getElementById("reset-confirma-senha").value.trim();

  if (!matricula || !nova || !confirma) {
    alert("Preencha todos os campos!");
    return;
  }
  if (nova !== confirma) {
    alert("As senhas não conferem!");
    return;
  }

  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const index = usuarios.findIndex((u) => u.matricula === matricula);
  if (index === -1) {
    alert("Matrícula não encontrada!");
    return;
  }

  usuarios[index].senha = nova;
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  alert("Senha redefinida com sucesso!");
  toggleScreens("reset-screen", "login-screen");
});

// ======= LOGOUT =======
document.getElementById("logout-btn").addEventListener("click", () => {
  localStorage.removeItem("usuarioLogado");
  showScreen("login-screen");
  document.getElementById("logout-btn").classList.add("hidden");

  document.querySelector("header").style.display = "none";
  document.querySelector("main").style.display = "none";
  document.querySelector("footer").style.display = "none";

  document.getElementById("login-screen").classList.remove("hidden");
});

// ======= TROCA DE TELAS =======
function toggleScreens(from, to) {
  const fromEl = document.getElementById(from);
  const toEl = document.getElementById(to);

  fromEl.classList.remove("active");
  fromEl.classList.add("hidden");
  toEl.classList.remove("hidden");
  toEl.classList.add("active");
  window.scrollTo(0, 0);
}

function showScreen(id) {
  // Esconde TODAS as telas
  document.querySelectorAll(".screen").forEach((s) => {
    s.classList.remove("active");
    s.classList.add("hidden");
  });

  // Mostra apenas a que foi chamada
  const target = document.getElementById(id);
  if (target) {
    target.classList.remove("hidden");
    target.classList.add("active");
  }

  // Centraliza e garante que só ela fique visível
  window.scrollTo(0, 0);

  // Controle do guia Kaizen
  if (id === "transporte") setTimeout(iniciarGuiaKaizen, 300);
  else ocultarGuiaKaizen();
}

// ======= ROTAS =======
const rotas = [
  {
    id: "01",
    nome: "Rota 01 - Av. Djalma Batista",
    caminho: "Av. Djalma Batista, Manaus - AM",
    googleLink:
      "https://www.google.com/maps/d/embed?mid=103dJy2E-GKeFox94_UdyDz6jAJKlpw0&ehbc=2E312",
  },
  {
    id: "02",
    nome: "Rota 02 - Av. Governador José Lindoso",
    caminho: "Avenida Governador José Lindoso, Manaus - AM",
    googleLink:
      "https://www.google.com/maps/d/embed?mid=1D6E_wKKPmtHQ2u75LU0f_iH9Ao3CQXg&ehbc=2E312F",
  },
  {
    id: "03",
    nome: "Rota 03 - R. Dom João - Parque 10",
    caminho: "R. Dom João - Parque 10, Manaus - AM",
    googleLink:
      "https://www.google.com/maps/d/embed?mid=1Ljgv0JKc77Hn4rTmW0kz-ktfnmVDs9I&ehbc=2E312F",
  },
  {
    id: "04",
    nome: "Rota 04 - Lírio do Vale",
    caminho: "Rua Jequié, Manaus - AM",
    googleLink:
      "https://www.google.com/maps/d/embed?mid=1isZ0Dv3C61z5nI8NrUDyyuRm_lQjxqM&ehbc=2E312F",
  },
  {
    id: "05",
    nome: "Rota 05 - Viver Melhor",
    caminho: "Av. Comendador José Cruz - AM",
    googleLink:
      "https://www.google.com/maps/d/embed?mid=1MZ0IUlukpe4G5JISXl8vI9q8a_bkkLM&ehbc=2E312F",
  },
];

function renderRotas(filtro = "") {
  const container = document.getElementById("rotas-container");
  container.innerHTML = "";

  const rotasFiltradas = rotas.filter(
    (r) =>
      r.nome.toLowerCase().includes(filtro.toLowerCase()) ||
      r.caminho.toLowerCase().includes(filtro.toLowerCase())
  );

  if (rotasFiltradas.length === 0) {
    container.innerHTML = '<p class="muted">Nenhuma rota encontrada.</p>';
    return;
  }

  rotasFiltradas.forEach((r) => {
    const div = document.createElement("div");
    div.className = "card small";
    div.innerHTML = `
      <strong>${r.nome}</strong><br>
      <span class="muted">${r.caminho}</span><br>
      <button class="btn" data-map="${r.googleLink}">Ver rota no mapa</button>
    `;
    container.appendChild(div);
  });

  container.querySelectorAll("button[data-map]").forEach((btn) => {
    btn.addEventListener("click", (ev) => {
      const link = ev.target.dataset.map;
      const mapFrame = document.getElementById("map-frame");
      const mapContainer = document.getElementById("map-container");
      mapFrame.src = link;
      mapContainer.classList.remove("hidden");
      mapContainer.scrollIntoView({ behavior: "smooth" });
    });
  });
}
renderRotas();

document
  .getElementById("rota-search")
  .addEventListener("input", (e) => renderRotas(e.target.value));

// Preenche rotas no select do modal
const rotaSelect = document.getElementById("rota-selecao");
rotas.forEach((r) => {
  const opt = document.createElement("option");
  opt.value = r.nome;
  opt.textContent = r.nome;
  rotaSelect.appendChild(opt);
});

// ======= MODAL DE SOLICITAÇÃO =======
const modal = document.getElementById("request-modal");
document.getElementById("open-request-modal").addEventListener("click", () => {
  modal.classList.remove("hidden");
});
document.getElementById("fechar-modal").addEventListener("click", () => {
  modal.classList.add("hidden");
});

document.getElementById("enviar-solicitacao").addEventListener("click", () => {
  const matricula = document.getElementById("matricula").value.trim();
  const motivo = document.getElementById("motivo").value.trim();
  const rota = document.getElementById("rota-selecao").value;
  const tipo = document.getElementById("tipo-autorizacao").value;
  const data = document.getElementById("data-autorizacao").value;

  if (!matricula || !motivo || !rota || !tipo || !data) {
    alert("Preencha todos os campos!");
    return;
  }

  const solicitacoes = JSON.parse(localStorage.getItem("solicitacoes")) || [];
  solicitacoes.push({
    matricula,
    motivo,
    rota,
    tipo,
    data,
    status: "Em análise",
  });

  localStorage.setItem("solicitacoes", JSON.stringify(solicitacoes));
  alert("Solicitação enviada com sucesso!");
  modal.classList.add("hidden");
  renderSolicitacoes();
});

// ======= LISTA DE SOLICITAÇÕES =======
function renderSolicitacoes() {
  const lista = document.getElementById("lista-solicitacoes");
  lista.innerHTML = "";
  const solicitacoes = JSON.parse(localStorage.getItem("solicitacoes")) || [];

  if (solicitacoes.length === 0) {
    lista.innerHTML = "<p class='muted'>Nenhuma solicitação encontrada.</p>";
    return;
  }

  solicitacoes.forEach((s) => {
    const div = document.createElement("div");
    div.className = "card small";
    div.innerHTML = `
      <p><strong>Matrícula:</strong> ${s.matricula}</p>
      <p><strong>Rota:</strong> ${s.rota}</p>
      <p><strong>Tipo:</strong> ${s.tipo}</p>
      <p><strong>Data:</strong> ${new Date(s.data).toLocaleDateString()}</p>
      <p><strong>Status:</strong> <span class="status">${s.status}</span></p>
    `;
    lista.appendChild(div);
  });
}
renderSolicitacoes();

// ======= GUIA KAIZEN =======
function iniciarGuiaKaizen() {
  console.log("Guia Kaizen iniciado...");
}
function ocultarGuiaKaizen() {
  console.log("Guia Kaizen oculto.");
}

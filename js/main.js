document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  renderPosts();
  initBackToTop();
  initFormValidation();
});

// ---------------------
// Alternância de Tema
// ---------------------
function initThemeToggle() {
  const toggle = document.getElementById("theme-toggle");
  const html = document.documentElement;
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme) {
    html.setAttribute("data-theme", savedTheme);
    toggle.textContent = savedTheme === "dark" ? "☀️" : "🌙";
  }

  toggle.addEventListener("click", () => {
    const currentTheme = html.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    toggle.textContent = newTheme === "dark" ? "☀️" : "🌙";
  });
}

// ---------------------
// Renderização dos Posts (somente na home)
// ---------------------
function renderPosts() {
  const postContainer = document.getElementById("posts-list");
  if (!postContainer || !Array.isArray(posts) || posts.length === 0) return;

  posts.forEach((post) => {
    const postCard = document.createElement("article");
    postCard.classList.add("post-card");

    const tagsHtml =
      post.tags?.map((tag) => `<span class="tag">${tag}</span>`).join("") || "";

    postCard.innerHTML = `
      <div class="post-image-wrapper">
        <img src="${post.image}" alt="Capa do post: ${
      post.title
    }" class="post-image">
        ${post.id === 1 ? '<span class="badge">Novo</span>' : ""}
      </div>
      <h3>${post.title}</h3>
      <p class="post-meta">📅 ${post.date} • 🗂️ ${post.category}</p>
      <div class="post-tags">${tagsHtml}</div>
      <p class="post-summary">${post.summary}</p>
      <a href="post.html?id=${post.id}" class="read-more">Ler mais →</a>
    `;

    postContainer.appendChild(postCard);
  });
}

// ---------------------
// Voltar ao Topo
// ---------------------
function initBackToTop() {
  const btn = document.getElementById("back-to-top");
  btn?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ---------------------
// Validação do Formulário de Contato
// ---------------------
function initFormValidation() {
  const form = document.querySelector(".contact-form");
  if (!form) return;

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");

  const feedback = document.createElement("div");
  feedback.className = "form-feedback";
  form.appendChild(feedback);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValid = true;
    feedback.textContent = "";
    feedback.classList.remove("error", "success");

    // Funções auxiliares
    const markInvalid = (input) => {
      input.classList.add("input-error");
      isValid = false;
    };
    const clearInvalid = (input) => input.classList.remove("input-error");

    // Valida cada campo
    nameInput.value.trim() === ""
      ? markInvalid(nameInput)
      : clearInvalid(nameInput);

    const emailValid = /\S+@\S+\.\S+/.test(emailInput.value.trim());
    !emailValid ? markInvalid(emailInput) : clearInvalid(emailInput);

    messageInput.value.trim() === ""
      ? markInvalid(messageInput)
      : clearInvalid(messageInput);

    // Resultado da validação
    if (isValid) {
      feedback.textContent = "Mensagem enviada com sucesso! (simulação)";
      feedback.classList.add("success");
      form.reset();
    } else {
      feedback.textContent = "Por favor, preencha corretamente os campos.";
      feedback.classList.add("error");
    }
  });
}

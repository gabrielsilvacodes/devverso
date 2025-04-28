// Espera o DOM carregar antes de executar
document.addEventListener("DOMContentLoaded", () => {
  const postContainer = document.getElementById("posts-list");

  if (!postContainer || !posts || posts.length === 0) {
    postContainer.innerHTML = "<p>Nenhum post encontrado.</p>";
    return;
  }

  // Cria os cards com base nos dados do array
  posts.forEach((post) => {
    const postCard = document.createElement("article");
    postCard.classList.add("post-card");

    // Cria as tags dinamicamente se existirem
    const tagsHtml = post.tags
      ? `<div class="post-tags">${post.tags
          .map((tag) => `<span class="tag">${tag}</span>`)
          .join("")}</div>`
      : "";

    postCard.innerHTML = `
      <div class="post-image-wrapper">
        <img src="${post.image}" alt="Capa do post: ${
      post.title
    }" class="post-image">
        ${post.id === 1 ? '<span class="badge">Novo</span>' : ""}
      </div>
      <h3>${post.title}</h3>
      <p class="post-meta">📅 ${post.date} • 🗂️ ${post.category}</p>
      <div class="post-tags">
        ${post.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
      </div>
      <p class="post-summary">${post.summary}</p>
      <a href="post.html?id=${post.id}" class="read-more">Ler mais →</a>
    `;

    postContainer.appendChild(postCard);
  });
});

// Tema Claro/Escuro
document.addEventListener("DOMContentLoaded", () => {
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
});

// Botão Voltar ao Topo
document.addEventListener("DOMContentLoaded", () => {
  const backToTop = document.getElementById("back-to-top");
  backToTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

// Validação do Formulário de Contato
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".contact-form");

  if (form) {
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

      const markInvalid = (input) => {
        input.classList.add("input-error");
        isValid = false;
      };

      const clearInvalid = (input) => {
        input.classList.remove("input-error");
      };

      if (nameInput.value.trim() === "") {
        markInvalid(nameInput);
      } else {
        clearInvalid(nameInput);
      }

      if (
        emailInput.value.trim() === "" ||
        !/\S+@\S+\.\S+/.test(emailInput.value.trim())
      ) {
        markInvalid(emailInput);
      } else {
        clearInvalid(emailInput);
      }

      if (messageInput.value.trim() === "") {
        markInvalid(messageInput);
      } else {
        clearInvalid(messageInput);
      }

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
});

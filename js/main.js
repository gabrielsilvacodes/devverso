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

    postCard.innerHTML = `
  <div class="post-image-wrapper">
    <img src="${post.image}" alt="Capa do post: ${
      post.title
    }" class="post-image">
    ${
      post.id === 1 ? '<span class="badge">Novo</span>' : ""
    } <!-- Selo só no post mais recente -->
  </div>
  <h3>${post.title}</h3>
  <p class="post-meta">📅 ${post.date} • 🗂️ ${post.category}</p>
  <p class="post-summary">${post.summary}</p>
  <a href="post.html?id=${post.id}" class="read-more">Ler mais →</a>
`;

    postContainer.appendChild(postCard);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("theme-toggle");
  const html = document.documentElement;

  // Verifica se já existe preferência salva
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

document.addEventListener("DOMContentLoaded", () => {
  const backToTop = document.getElementById("back-to-top");
  backToTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

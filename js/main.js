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
      <img src="${post.image}" alt="Capa do post: ${post.title}" class="post-image">
      <h3>${post.title}</h3>
      <p class="post-meta">${post.date} • ${post.category}</p>
      <p class="post-summary">${post.summary}</p>
      <a href="post.html?id=${post.id}" class="read-more">Ler mais →</a>
    `;

    postContainer.appendChild(postCard);
  });
});

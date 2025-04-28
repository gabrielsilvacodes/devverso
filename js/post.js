document.addEventListener("DOMContentLoaded", () => {
  const postContent = document.getElementById("post-content");

  function getPostIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get("id"));
  }

  const postId = getPostIdFromURL();

  if (!postId || isNaN(postId)) {
    postContent.innerHTML = "<p>Post inválido ou não encontrado.</p>";
    return;
  }

  const post = posts.find((p) => p.id === postId);

  if (!post) {
    postContent.innerHTML = "<p>Post não encontrado.</p>";
    return;
  }

  // Converte os parágrafos
  const paragraphsHtml = post.content
    .split("\n\n")
    .map((paragraph) => `<p>${paragraph.trim()}</p>`)
    .join("");

  // Converte as tags
  const tagsHtml =
    post.tags && post.tags.length > 0
      ? `<div class="post-tags">${post.tags
          .map((tag) => `<span class="tag">${tag}</span>`)
          .join("")}</div>`
      : "";

  // Monta o conteúdo completo
  postContent.innerHTML = `
    <article class="post-full">
      <h2 class="post-title">${post.title}</h2>
      <p class="post-meta">${post.date} • ${post.category}</p>
      <img src="${post.image}" alt="Imagem do post: ${post.title}" class="post-image">
      ${tagsHtml}
      <div class="post-body">
        ${paragraphsHtml}
      </div>
      <a href="index.html" class="back-link">← Voltar para a Home</a>
    </article>
  `;
});

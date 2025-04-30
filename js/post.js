document.addEventListener("DOMContentLoaded", () => {
  const postContent = document.getElementById("post-content");

  if (!postContent) return;

  const postId = getPostIdFromURL();
  if (!postId || isNaN(postId)) {
    renderMessage("Post inválido ou não encontrado.");
    return;
  }

  const post = posts.find((p) => p.id === postId);
  if (!post) {
    renderMessage("Post não encontrado.");
    return;
  }

  renderPost(post);

  // ----- Funções auxiliares -----

  function getPostIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get("id"));
  }

  function renderMessage(message) {
    postContent.innerHTML = `<p>${message}</p>`;
  }

  function renderPost(post) {
    const paragraphsHtml = post.content
      .split("\n\n")
      .map((p) => `<p>${p.trim()}</p>`)
      .join("");

    const tagsHtml =
      Array.isArray(post.tags) && post.tags.length
        ? `<div class="post-tags">${post.tags
            .map((tag) => `<span class="tag">${tag}</span>`)
            .join("")}</div>`
        : "";

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
  }
});

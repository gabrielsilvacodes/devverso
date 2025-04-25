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

  // Suporte a múltiplos parágrafos separados por \n\n (opcional)
  const paragraphs = post.content
    .split("\n\n")
    .map((paragraph) => `<p>${paragraph.trim()}</p>`)
    .join("");

  postContent.innerHTML = `
    <article class="post-full">
      <h2 class="post-title">${post.title}</h2>
      <p class="post-meta">${post.date} • ${post.category}</p>
      <img src="${post.image}" alt="Imagem do post: ${post.title}" class="post-image">
      <div class="post-body">
        ${paragraphs}
      </div>
      <a href="index.html" class="back-link">← Voltar para a Home</a>
    </article>
  `;
});

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("cadastroForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nomelanchonete = form.nomelanchonete.value.trim();
    const email = form.email.value.trim();
    const senha = form.senha.value.trim();

    if (!nomelanchonete || !email || !senha) {
      alert("Preencha todos os campos!");
      return;
    }

    try {
      const response = await fetch("/api/cadastrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ nomelanchonete, email, senha })
      });

      const data = await response.json();

      if (response.ok) {
        alert("Cadastro realizado com sucesso!");
        window.location.href = "login.html";
      } else {
        alert(data.erro || "Erro ao cadastrar.");
      }
    } catch (err) {
      console.error("Erro ao enviar dados:", err);
      alert("Erro na conexão com o servidor.");
    }
  });
});

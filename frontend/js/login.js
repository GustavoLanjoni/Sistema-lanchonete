document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = form.email.value.trim();
    const senha = form.senha.value.trim();

    if (!email || !senha) {
      alert("Preencha todos os campos!");
      return;
    }

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, senha })
      });

      const data = await response.json();

      if (response.ok) {
        alert("Login realizado com sucesso!");
        window.location.href = "painel.html"; // redirecione para o painel
      } else {
        alert(data.erro || "Erro ao fazer login.");
      }
    } catch (err) {
      console.error("Erro ao enviar dados:", err);
      alert("Erro na conexão com o servidor.");
    }
  });
});

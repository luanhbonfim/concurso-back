const app = require("./app");
const { exec } = require("child_process");

const PORT = process.env.PORT || 3000;

console.log("Rodando migrações do Prisma...");

exec("npx prisma migrate deploy", (error, stdout, stderr) => {
  if (error) {
    console.error(`Erro ao rodar migrações: ${error.message}`);
    process.exit(1); // encerra o app se não conseguir rodar migração
  }
  if (stderr) {
    console.error(`Erro: ${stderr}`);
  }
  console.log(stdout);

  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
});

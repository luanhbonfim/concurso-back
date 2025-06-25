const app = require("./app");
const { exec } = require("child_process");

const PORT = process.env.PORT || 3000;

console.log("Rodando sincronização do Prisma...");

exec("npx prisma db push", (error, stdout, stderr) => {
  if (error) {
    console.error(`Erro ao rodar db push: ${error.message}`);
    process.exit(1);
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`);
  }
  console.log(stdout);

  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
});

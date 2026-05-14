

const SPREADSHEET_ID = "1If3r6OrPUFsU5Pktmsgvvq_bIj4cjaD7q9QImuCpbCA";
const SHEET_NAME = "Simmulador OnDigital";

function doGet(e) {
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);

    // Tenta encontrar a aba pelo nome; se não existir, usa a primeira aba disponível
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.getSheets()[0]; // usa sempre a primeira aba como fallback
    }

    // Adiciona cabeçalhos se a Sheet estiver vazia
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Timestamp", "Nome Negócio", "Ramo", "Cores", "Inspiração", "Email", "Telefone", "Mensagem"]);
    }

    // Ler parâmetros enviados na URL (query string)
    const p = e.parameter;

    // Timestamp em formato PT
    const timestamp = Utilities.formatDate(new Date(), "Europe/Lisbon", "dd/MM/yyyy HH:mm:ss");

    // Adicionar nova linha na Sheet
    sheet.appendRow([
      timestamp,
      p.nome || "—",
      p.ramo || "—",
      p.cores || "—",
      p.inspiracao || "—",
      p.email || "—",
      p.telefone || "—",
      p.mensagem || "—",
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true, sheet: sheet.getName() }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}


// Teste manual — corre esta função no editor do Apps Script para verificar
function testar() {
  const testEvent = {
    parameter: {
      nome: "Café Teste",
      ramo: "Restauração",
      cores: "Azul e Dourado",
      inspiracao: "https://exemplo.com",
      email: "teste@email.com",
      telefone: "+351 912 345 678",
      mensagem: "Quero um site moderno"
    }
  };
  const result = doGet(testEvent);
  Logger.log(result.getContent());
}

//
// INSTRUÇÕES DE CONFIGURAÇÃO:
// 1. Vai a sheets.google.com e cria uma nova folha chamada "Leads ON DIGITAL"
// 2. Na linha 1, escreve os cabeçalhos:
//    Timestamp | Nome Negócio | Ramo | Cores | Inspiração | Email | Telefone | Mensagem
// 3. Na Sheet, vai a Extensões → Apps Script
// 4. Apaga tudo e cola ESTE código
// 5. Substitui SPREADSHEET_ID pelo ID da tua Sheet (está no URL entre /d/ e /edit)
// 6. Clica em Guardar (Ctrl+S)
// 7. Vai a Implementar → Nova implementação
//    - Tipo: Aplicação Web
//    - Executar como: EU (a tua conta Google)
//    - Quem pode aceder: QUALQUER PESSOA
// 8. Clica em Implementar → Autoriza → Copia a URL
// 9. Cola essa URL no simulador.astro onde está APPS_SCRIPT_URL
// ═══════════════════════════════════════════════════════════

const SPREADSHEET_ID = "COLA_AQUI_O_ID_DA_TUA_SHEET";
const SHEET_NAME = "Leads ON DIGITAL";

function doPost(e) {
  try {
    // Abrir a Sheet
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName(SHEET_NAME);

    // Parse dos dados recebidos
    const data = JSON.parse(e.postData.contents);

    // Timestamp em formato legível (PT)
    const timestamp = Utilities.formatDate(
      new Date(),
      "Europe/Lisbon",
      "dd/MM/yyyy HH:mm:ss"
    );

    // Adicionar nova linha com os dados do lead
    sheet.appendRow([
      timestamp,
      data.nome || "—",
      data.ramo || "—",
      data.cores || "—",
      data.inspiracao || "—",
      data.email || "—",
      data.telefone || "—",
      data.mensagem || "—",
    ]);

    // Resposta de sucesso (com CORS para o Vercel)
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Resposta de erro
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Teste rápido — podes correr este função manualmente no editor do Apps Script
// para verificar se está a escrever na Sheet corretamente
function testar() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        nome: "Café Teste",
        ramo: "Restauração",
        cores: "Azul e Dourado",
        inspiracao: "https://exemplo.com",
        email: "teste@email.com",
        telefone: "+351 912 345 678",
        mensagem: "Quero um site moderno"
      })
    }
  };
  const result = doPost(testData);
  Logger.log(result.getContent());
}

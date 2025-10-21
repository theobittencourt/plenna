const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  try {
    // Configurar adquirente Pixup
    await prisma.adquirente.upsert({
      where: { referencia: 'pixup' },
      update: {
        nome: 'Pixup',
        status: true,
        config: {
          apiUrl: 'https://api.pixup.com.br/v1',
          apiKey: 'YOUR_PIXUP_API_KEY_HERE',
          webhookUrl: 'https://yourdomain.com/webhook/pixup'
        }
      },
      create: {
        referencia: 'pixup',
        nome: 'Pixup',
        status: true,
        config: {
          apiUrl: 'https://api.pixup.com.br/v1',
          apiKey: 'YOUR_PIXUP_API_KEY_HERE',
          webhookUrl: 'https://yourdomain.com/webhook/pixup'
        }
      }
    });

    // Configurar aplicação
    const existingApp = await prisma.app.findFirst();
    
    if (!existingApp) {
      await prisma.app.create({
        data: {
          gatewayName: 'Plenna',
          taxaCashInPadrao: 4.00,
          taxaCashOutPadrao: 4.00,
          taxaFixaPadrao: 5.00,
          taxaFixaPadraoCashOut: 5.00,
          depositoMinimo: 10.00,
          saqueMinimo: 20.00,
          saquesAutomaticos: false
        }
      });
    } else {
      await prisma.app.update({
        where: { id: existingApp.id },
        data: {
          gatewayName: 'Plenna',
          taxaCashInPadrao: 4.00,
          taxaCashOutPadrao: 4.00,
          depositoMinimo: 10.00,
          saqueMinimo: 20.00
        }
      });
    }

    console.log('✅ Seed executado com sucesso!');
    console.log('- Adquirente Pixup configurado');
    console.log('- Configurações da aplicação atualizadas');
  } catch (error) {
    console.error('❌ Erro ao executar seed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
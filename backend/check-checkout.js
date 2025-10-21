const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkCheckout() {
  try {
    const checkoutId = '18f7835a-4525-4ce1-a707-c67db640093a';
    
    console.log('Procurando checkout:', checkoutId);
    
    const checkout = await prisma.checkoutBuild.findFirst({
      where: {
        OR: [
          { idUnico: checkoutId },
          { id: isNaN(parseInt(checkoutId)) ? 0 : parseInt(checkoutId) }
        ]
      },
      include: {
        bumps: true,
        depoimentos: true,
        user: {
          select: {
            name: true,
            email: true
          }
        }
      }
    });
    
    if (checkout) {
      console.log('✅ Checkout encontrado:', {
        id: checkout.id,
        idUnico: checkout.idUnico,
        produtoName: checkout.produtoName,
        produtoValor: checkout.produtoValor,
        status: checkout.status,
        userId: checkout.userId,
        user: checkout.user
      });
    } else {
      console.log('❌ Checkout não encontrado');
      
      // Listar todos os checkouts para debug
      const allCheckouts = await prisma.checkoutBuild.findMany({
        select: {
          id: true,
          idUnico: true,
          produtoName: true,
          status: true
        },
        take: 10
      });
      
      console.log('Checkouts disponíveis:', allCheckouts);
    }
    
  } catch (error) {
    console.error('❌ Erro:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkCheckout();
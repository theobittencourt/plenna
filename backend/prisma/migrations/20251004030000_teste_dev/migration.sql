-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "email_verified_at" TIMESTAMP(3),
    "password" TEXT NOT NULL,
    "cpf_cnpj" TEXT,
    "data_nascimento" TEXT,
    "telefone" TEXT,
    "saldo" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
    "total_transacoes" INTEGER NOT NULL DEFAULT 0,
    "avatar" TEXT,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "data_cadastro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ip_user" TEXT,
    "transacoes_aproved" INTEGER NOT NULL DEFAULT 0,
    "transacoes_recused" INTEGER NOT NULL DEFAULT 0,
    "valor_sacado" DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    "valor_saque_pendente" DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    "taxa_cash_in" DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    "taxa_cash_out" DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    "taxa_cash_in_fixa" DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    "taxa_cash_out_fixa" DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    "token" TEXT,
    "banido" BOOLEAN NOT NULL DEFAULT false,
    "cliente_id" TEXT NOT NULL,
    "taxa_percentual" DECIMAL(10,2) NOT NULL DEFAULT 5.00,
    "volume_transacional" DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    "valor_pago_taxa" DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    "user_id" TEXT,
    "cep" TEXT,
    "rua" TEXT,
    "estado" TEXT,
    "cidade" TEXT,
    "bairro" TEXT,
    "numero_residencia" TEXT,
    "complemento" TEXT,
    "foto_rg_frente" TEXT,
    "foto_rg_verso" TEXT,
    "selfie_rg" TEXT,
    "media_faturamento" TEXT,
    "indicador_ref" TEXT,
    "whitelisted_ip" TEXT,
    "pushcut_pixpago" TEXT,
    "twofa_secret" TEXT,
    "code_ref" TEXT,
    "gerente_id" INTEGER,
    "gerente_percentage" DECIMAL(10,2),
    "gerente_aprovar" BOOLEAN NOT NULL DEFAULT false,
    "webhook_url" TEXT,
    "webhook_endpoint" JSONB,
    "integracao_utmfy" TEXT,
    "permission" TEXT NOT NULL DEFAULT 'user',
    "username" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users_keys" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "secret" TEXT NOT NULL,
    "ip_permitido" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_keys_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "app" (
    "id" SERIAL NOT NULL,
    "gateway_name" TEXT,
    "gateway_logo" TEXT,
    "gateway_favicon" TEXT,
    "gateway_banner_home" TEXT,
    "gateway_color" TEXT,
    "numero_users" INTEGER NOT NULL DEFAULT 0,
    "faturamento_total" DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    "total_transacoes" DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    "visitantes" INTEGER NOT NULL DEFAULT 0,
    "manutencao" BOOLEAN NOT NULL DEFAULT false,
    "baseline" TEXT,
    "taxa_cash_in_padrao" DECIMAL(10,2) NOT NULL DEFAULT 4.00,
    "taxa_cash_out_padrao" DECIMAL(10,2) NOT NULL DEFAULT 4.00,
    "taxa_fixa_padrao" DECIMAL(10,2) NOT NULL DEFAULT 5.00,
    "taxa_fixa_padrao_cash_out" DECIMAL(10,2) NOT NULL DEFAULT 5.00,
    "taxa_pix_valor_real_cash_in_padrao" DECIMAL(10,2) NOT NULL DEFAULT 5.00,
    "limite_saque_mensal" DECIMAL(10,2),
    "limite_saque_automatico" DECIMAL(10,2),
    "deposito_minimo" DECIMAL(10,2),
    "saque_minimo" DECIMAL(10,2),
    "contato" TEXT,
    "cnpj" TEXT,
    "niveis_ativo" BOOLEAN NOT NULL DEFAULT false,
    "gerente_active" BOOLEAN NOT NULL DEFAULT false,
    "gerente_percentage" DECIMAL(10,2),
    "saques_automaticos" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "app_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "checkout_build" (
    "id" SERIAL NOT NULL,
    "id_unico" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "produto_name" TEXT NOT NULL,
    "produto_descricao" TEXT,
    "descricao_extra" TEXT,
    "produto_valor" DECIMAL(10,2) NOT NULL,
    "produto_de_valor" DECIMAL(10,2),
    "produto_categoria" TEXT,
    "produto_tipo" TEXT,
    "produto_tipo_cob" TEXT,
    "produto_image" TEXT,
    "whatsapp_suporte" TEXT,
    "email_suporte" TEXT,
    "checkout_color" TEXT,
    "checkout_color_default" TEXT,
    "checkout_color_card" TEXT,
    "checkout_timer_active" BOOLEAN NOT NULL DEFAULT false,
    "checkout_timer_tempo" INTEGER,
    "checkout_timer_cor_fundo" TEXT,
    "checkout_timer_cor_texto" TEXT,
    "checkout_timer_texto" TEXT,
    "checkout_header_logo_active" BOOLEAN NOT NULL DEFAULT false,
    "checkout_header_logo" TEXT,
    "checkout_header_image_active" BOOLEAN NOT NULL DEFAULT false,
    "checkout_header_image" TEXT,
    "checkout_banner_active" BOOLEAN NOT NULL DEFAULT false,
    "checkout_banner" TEXT,
    "checkout_topbar_active" BOOLEAN NOT NULL DEFAULT false,
    "checkout_topbar_text" TEXT,
    "checkout_topbar_text_color" TEXT,
    "checkout_topbar_color" TEXT,
    "url_pagina_vendas" TEXT,
    "periodo_garantia" INTEGER,
    "checkout_ads_meta" TEXT,
    "checkout_ads_google" TEXT,
    "checkout_ads_tiktok" TEXT,
    "checkout_ads_utmfy" TEXT,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "methods" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "checkout_build_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "checkout_order_bumps" (
    "id" SERIAL NOT NULL,
    "checkout_id" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "valor" DECIMAL(10,2) NOT NULL,
    "imagem" TEXT,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "checkout_order_bumps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "checkout_depoimentos" (
    "id" SERIAL NOT NULL,
    "checkout_id" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "depoimento" TEXT NOT NULL,
    "imagem" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "checkout_depoimentos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "checkout_orders" (
    "id" SERIAL NOT NULL,
    "checkout_id" INTEGER NOT NULL,
    "id_transaction" TEXT,
    "payment_code" TEXT,
    "cliente_nome" TEXT NOT NULL,
    "cliente_email" TEXT NOT NULL,
    "cliente_cpf" TEXT NOT NULL,
    "cliente_telefone" TEXT NOT NULL,
    "valor" DECIMAL(10,2) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "checkout_orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "solicitacoes" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "valor" DECIMAL(10,2) NOT NULL,
    "valor_liquido" DECIMAL(10,2) NOT NULL,
    "taxa_cash_in" DECIMAL(10,2) NOT NULL,
    "status" TEXT NOT NULL,
    "id_transaction" TEXT,
    "externalreference" TEXT,
    "payment_code" TEXT,
    "qr_code" TEXT,
    "qr_code_image" TEXT,
    "method_pay" TEXT,
    "debtor_name" TEXT,
    "debtor_document" TEXT,
    "debtor_email" TEXT,
    "debtor_phone" TEXT,
    "postback" TEXT,
    "adquirente" TEXT,
    "days_availability" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "solicitacoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "solicitacoes_cash_out" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "referencia" TEXT,
    "valor" DECIMAL(10,2) NOT NULL,
    "valor_liquido" DECIMAL(10,2) NOT NULL,
    "tipo_chave" TEXT NOT NULL,
    "chave" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "data_solicitacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_pagamento" TIMESTAMP(3),
    "taxa_cash_out" DECIMAL(10,2) NOT NULL,
    "id_transaction" TEXT,
    "adquirente" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "solicitacoes_cash_out_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transactions" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "price" DECIMAL(20,2) NOT NULL,
    "status" INTEGER NOT NULL,
    "reference" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "adquirentes" (
    "id" SERIAL NOT NULL,
    "referencia" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "config" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "adquirentes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nivels" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "volume_minimo" DECIMAL(10,2) NOT NULL,
    "volume_maximo" DECIMAL(10,2) NOT NULL,
    "taxa_cash_in" DECIMAL(10,2) NOT NULL,
    "taxa_cash_out" DECIMAL(10,2) NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "nivels_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_token_key" ON "users"("token");

-- CreateIndex
CREATE UNIQUE INDEX "users_user_id_key" ON "users"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_code_ref_key" ON "users"("code_ref");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_keys_user_id_key" ON "users_keys"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_keys_token_key" ON "users_keys"("token");

-- CreateIndex
CREATE UNIQUE INDEX "checkout_build_id_unico_key" ON "checkout_build"("id_unico");

-- CreateIndex
CREATE UNIQUE INDEX "adquirentes_referencia_key" ON "adquirentes"("referencia");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_indicador_ref_fkey" FOREIGN KEY ("indicador_ref") REFERENCES "users"("code_ref") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_keys" ADD CONSTRAINT "users_keys_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "checkout_build" ADD CONSTRAINT "checkout_build_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "checkout_order_bumps" ADD CONSTRAINT "checkout_order_bumps_checkout_id_fkey" FOREIGN KEY ("checkout_id") REFERENCES "checkout_build"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "checkout_depoimentos" ADD CONSTRAINT "checkout_depoimentos_checkout_id_fkey" FOREIGN KEY ("checkout_id") REFERENCES "checkout_build"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "checkout_orders" ADD CONSTRAINT "checkout_orders_checkout_id_fkey" FOREIGN KEY ("checkout_id") REFERENCES "checkout_build"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "solicitacoes" ADD CONSTRAINT "solicitacoes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "solicitacoes_cash_out" ADD CONSTRAINT "solicitacoes_cash_out_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

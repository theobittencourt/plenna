-- CreateTable
CREATE TABLE "product_partners" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "partner_email" TEXT NOT NULL,
    "commission" DECIMAL(5,2) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "end_date" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "product_partners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_affiliates" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "total_sales" INTEGER NOT NULL DEFAULT 0,
    "total_commissions" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "product_affiliates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "referrals" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "referral_link" TEXT NOT NULL,
    "total_referrals" INTEGER NOT NULL DEFAULT 0,
    "total_earnings" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "referrals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "referral_sales" (
    "id" SERIAL NOT NULL,
    "referral_id" INTEGER NOT NULL,
    "producer_name" TEXT NOT NULL,
    "producer_email" TEXT NOT NULL,
    "origin" TEXT NOT NULL,
    "sale_value" DECIMAL(10,2) NOT NULL,
    "commission" DECIMAL(10,2) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "referral_sales_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "integrations" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "config" JSONB NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'disconnected',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "integrations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "referrals_user_id_key" ON "referrals"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "referrals_referral_link_key" ON "referrals"("referral_link");

-- AddForeignKey
ALTER TABLE "product_partners" ADD CONSTRAINT "product_partners_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_affiliates" ADD CONSTRAINT "product_affiliates_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_affiliates" ADD CONSTRAINT "product_affiliates_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "referrals" ADD CONSTRAINT "referrals_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "referral_sales" ADD CONSTRAINT "referral_sales_referral_id_fkey" FOREIGN KEY ("referral_id") REFERENCES "referrals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "integrations" ADD CONSTRAINT "integrations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "image" TEXT,
    "sales_url" TEXT,
    "affiliate_enabled" BOOLEAN NOT NULL DEFAULT false,
    "affiliate_type" TEXT NOT NULL DEFAULT 'open',
    "affiliate_commission" DECIMAL(5,2) NOT NULL DEFAULT 0,
    "affiliate_recurring_commission" DECIMAL(5,2) NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'active',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

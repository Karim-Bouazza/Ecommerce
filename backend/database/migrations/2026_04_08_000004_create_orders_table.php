<?php

use App\Enums\OrderStatus;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table): void {
            $table->id();
            $table->string('nom', 255);
            $table->string('prenom', 255);
            $table->string('wilaya', 255);
            $table->string('baladia', 255);
            $table->string('numero_telephone', 50);
            $table->decimal('total_price', 12, 2)->default(0);
            $table->string('status', 32)->default(OrderStatus::PENDING->value);
            $table->timestamps();

            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};

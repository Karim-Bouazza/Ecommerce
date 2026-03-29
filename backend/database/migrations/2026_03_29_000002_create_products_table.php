<?php

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
        Schema::create('products', function (Blueprint $table): void {
            $table->id();
            $table->string('title', 255);
            $table->text('description');
            $table->unsignedInteger('quantity');
            $table->decimal('price', 12, 2);
            $table->decimal('price_after_discount', 12, 2)->nullable();
            $table->foreignId('category_id')
                ->constrained('categories')
                ->restrictOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};

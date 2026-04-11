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
        Schema::table('products', function (Blueprint $table) {
            $table->string('sub_image_url_01')->nullable()->after('main_photo_path');
            $table->string('sub_image_url_02')->nullable()->after('sub_image_url_01');
            $table->string('sub_image_url_03')->nullable()->after('sub_image_url_02');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn(['sub_image_url_01', 'sub_image_url_02', 'sub_image_url_03']);
        });
    }
};

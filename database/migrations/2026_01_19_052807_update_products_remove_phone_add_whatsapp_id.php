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
            $table->dropColumn('phone');
            $table->unsignedBigInteger('whatsapp_id')->nullable()->after('category_id');

            $table->foreignId('whatsapp_id')->constrained('whats_apps')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {

            // Add phone back
            $table->string('phone')->nullable();

            // Drop whatsapp foreign key and column
            $table->dropForeign(['whatsApp_id']);
            $table->dropColumn('whatsApp_id');
        });
    }
};

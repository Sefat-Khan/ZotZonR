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

            // Drop wrong foreign key if exists (ignore errors if not)
            try {
                $table->dropForeign(['whatsapp_id']);
            } catch (\Exception $e) {}

            // Drop duplicate column if exists
            if (Schema::hasColumn('products', 'whatsapp_id')) {
                $table->dropColumn('whatsapp_id');
            }

            // Recreate correct whatsapp_id column + FK
            $table->foreignId('whatsapp_id')
                ->nullable()
                ->after('category_id')
                ->constrained('whats_apps')
                ->cascadeOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropForeign(['whatsapp_id']);
            $table->dropColumn('whatsapp_id');
        });
    }

};

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB; // Importieren der DB-Fassade

class CreateCategoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->timestamps();
        });

        // Einträge für die Kategorien hinzufügen
        $categories = [
            ['name' => 'Indoor', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Outdoor', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Gesundheit', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Erziehung', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Veranstaltungen', 'created_at' => now(), 'updated_at' => now()],
        ];

        DB::table('categories')->insert($categories);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('categories');
    }
}
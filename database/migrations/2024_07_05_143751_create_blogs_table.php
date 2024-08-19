<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBlogsTable extends Migration
{
    public function up()
    {
        Schema::create('blogs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('title');
            $table->string('description');
            $table->string('thumbnail')->nullable();
            $table->string('content');
            $table->string('address');
            $table->string('zip');
            $table->string('city');
            $table->string('homepage'); // Neues Feld hinzugefügt
            $table->foreignId('category_id')->constrained()->onDelete('cascade');
            $table->json('custom_special'); 
            $table->timestamps();
        }); 
    }

    public function down()
    {
        Schema::dropIfExists('blogs');
    }
}

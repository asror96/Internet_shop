<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('basket_devices', function (Blueprint $table) {
            $table->id();
            $table->foreignId('device_id')->constrained('devices')->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('basket_id')->constrained('baskets')->onUpdate('cascade')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('basket_devices');
    }
};

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
        Schema::create('complaints', function (Blueprint $table) {
            $table->id();
            $table->integer('complain_category_id');
            $table->string('complaints_desc');
            $table->string('complaints_file')->nullable();
            $table->integer('dept_id');
            $table->integer('org_id');
            $table->integer('complaints_status_id');
            $table->string('complaints_ref_no');
            $table->integer('approved_by');
            $table->timestamp('complaint_date')->default(now());
            $table->integer('entry_by');

            $table->string('dept_name');
            $table->string('org_name');
            $table->string('entry_by_name');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('complaints');
    }
};

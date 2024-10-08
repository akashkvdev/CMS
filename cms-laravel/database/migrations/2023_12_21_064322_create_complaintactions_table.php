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
        Schema::create('complaintactions', function (Blueprint $table) {
            $table->id();
            $table->integer('complain_id');
            $table->integer('assign_to');
            $table->string('action_type');
            $table->timestamp('action_date')->default(now());
            $table->string('action_details');
            $table->string('action_ref_no');
            $table->integer('dept_id');
            $table->integer('entry_by');
            $table->string('outsider_name');
            $table->string('outsider_contact_no');
            $table->string('outsider_email');

            $table->string('assign_to_emp');
            $table->string('entry_by_emp');
            $table->string('dept_name');
            $table->string('org_id');
            $table->string('org_name');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('complaintactions');
    }
};

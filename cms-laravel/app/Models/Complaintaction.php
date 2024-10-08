<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Complaintaction extends Model
{
    use HasFactory;
    protected $table = 'complaintactions';
    protected $fillable=[
        'org_name',
        'dept_name',
        'action_ref_no',
        'entry_by',
        'action_date',
        'action_details',
        'complain_id',
        'action_type',
        'dept_id',
        'org_id',
        'assign_to',
        'assign_to_emp',
        'document',
        'entry_by_emp'
    ];
}

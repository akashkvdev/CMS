<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Complaincategory extends Model
{
    use HasFactory;
    protected $table = 'complaincategories'; 
    protected $fillable = ['category_name','status','entry_by'];
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Complaincategory;
use App\Models\Complaintstatus;

class Complaint extends Model
{
    use HasFactory;
    
    public function category() {
        return $this->belongsTo(Complaincategory::class, 'complain_category_id');
    }

    public function status() {
        return $this->belongsTo(ComplaintStatus::class, 'complaints_status_id');
    }

    // rais complains
    protected $table = 'complaints'; 
    protected $fillable = ['complain_category_id','complaints_desc','complaints_file','dept_id','org_id','complaints_status_id','complaints_ref_no','approved_by','entry_by','complaint_date'
        ,'dept_name','org_name','entry_by_name'];

        // searching

        public function search($referenceNumber)
        {
            return $this->where('complaints_ref_no', 'LIKE', "%$referenceNumber%")->get();
        }
}

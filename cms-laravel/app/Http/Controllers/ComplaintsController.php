<?php

namespace App\Http\Controllers;

use App\Models\Complaint;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use App\Models\Complaintstatus;
use App\Models\Complaincategory;
use App\Models\Complaintaction;


class ComplaintsController extends Controller
{
    public function solvedComplaints($dept_id = null, $org_id = null)
    {
        try {
            $complaints = Complaint::with(['category:id,category_name', 'status:id,complain_status_name'])
                ->whereHas('status', function ($query) {
                    $query->where('id', 3);
                })
                ->when($dept_id, function ($query) use ($dept_id) {
                    $query->where('dept_id', '=', $dept_id);
                })
                ->when($org_id, function ($query) use ($org_id) {
                    $query->where('org_id', '=', $org_id);
                })
                ->select('id', 'dept_id','dept_name', 'complaints_ref_no', 'complaint_date', 'complaints_desc', 'complain_category_id', 'complaints_status_id')
                ->get();

            // $data = [
            //     'category_name' => null,
            //     'dept_id' => null,
            //     'complaints_ref_no' => null,
            //     'complaint_date' => null,
            //     'complaints_desc' => null,
            //     'complain_status_name' => null,
            // ];

            // if ($complaints->isEmpty()) {
            //     return response()->json([
            //         $data
            //     ]);
            // }

            // $formattedComplaints = $complaints->map(function ($complaint) {
            //     return [
            //         'category_name' => optional($complaint->category)->category_name ?? null,
            //         'dept_id' => $complaint->dept_id,
            //         'complaints_ref_no' => $complaint->complaints_ref_no ?? null,
            //         'complaint_date' => $complaint->complaint_date ?? null,
            //         'complaints_desc' => $complaint->complaints_desc ?? null,
            //         'complain_status_name' => optional($complaint->status)->complain_status_name ?? null,
            //     ];
            // });

            return response()->json(['status' => 1, $complaints]);
        } catch (QueryException $e) {
            // Handle the exception as needed, e.g., log it or return an error response
            return response()->json(['status' => 0, 'error' => 'An error occurred while fetching data.'], 500);
        }
    }


    //All Pending Complaints=====================================>
    public function pendingComplaints($dept_id = null, $org_id = null)
    {
        try {
            $complaints = Complaint::with(['category:id,category_name', 'status:id,complain_status_name'])
                ->whereHas('status', function ($query) {
                    $query->where('id', 2);
                })
                ->when($dept_id, function ($query) use ($dept_id) {
                    $query->where('dept_id', '=', $dept_id);
                })
                ->when($org_id, function ($query) use ($org_id) {
                    $query->where('org_id', '=', $org_id);
                })
                ->select('id', 'dept_id','dept_name', 'complaints_ref_no', 'complaint_date', 'complaints_desc', 'complain_category_id', 'complaints_status_id')
                ->get();


            // $data = [
            //     'category_name' => null,
            //     'dept_id' => null,
            //     'complaints_ref_no' => null,
            //     'complaint_date' => null,
            //     'complaints_desc' => null,
            //     'complain_status_name' => null,
            // ];

            // if ($complaints->isEmpty()) {
            //     return response()->json([
            //         $data
            //     ]);
            // }

            // $formattedComplaints = $complaints->map(function ($complaint) {
            //     return [
            //         'category_name' => optional($complaint->category)->category_name ?? null,
            //         'dept_id' => $complaint->dept_id,
            //         'complaints_ref_no' => $complaint->complaints_ref_no ?? null,
            //         'complaint_date' => $complaint->complaint_date ?? null,
            //         'complaints_desc' => $complaint->complaints_desc ?? null,
            //         'complain_status_name' => optional($complaint->status)->complain_status_name ?? null,
            //     ];
            // });

            return response()->json($complaints);
        } catch (QueryException $e) {
            // Handle the exception as needed, e.g., log it or return an error response
            return response()->json(['error' => 'An error occurred while fetching data.'], 500);
        }
    }


    //Complaints Report
    
    //Department wise Complain report
    public function dWisecmsreport($org_id = null, $dept_id = null)
    {
        try {
            $complaints = Complaint::with(['category:id,category_name'])
                ->when($org_id, function ($query) use ($org_id) {
                    $query->where('org_id', '=', $org_id);
                })
                ->when($dept_id, function ($query) use ($dept_id, $org_id) {
                    // If org_id is not provided, filter only by dept_id
                    if ($org_id and $dept_id) {
                        $query->where('dept_id', '=', $dept_id);
                    }
                })
                ->select('id', 'complain_category_id', 'dept_name', 'org_name', 'complaints_ref_no', 'complaint_date', 'complaints_desc')
                ->get();
    
            if ($complaints->isEmpty()) {
                return response()->json([]);
            }
    
            $formattedComplaints = $complaints->map(function ($complaint) {
                return [
                    'category_name' => optional($complaint->category)->category_name ?? null,
                    'dept_name' => $complaint->dept_name,
                    'org_name' => $complaint->org_name,
                    'complaints_ref_no' => $complaint->complaints_ref_no ?? null,
                    'complaint_date' => $complaint->complaint_date ?? null,
                    'complaints_desc' => $complaint->complaints_desc ?? null,
                ];
            });
    
            return response()->json(['status' => 1, $formattedComplaints]);
        } catch (QueryException $e) {
            return response()->json(['status' => 0, 'error' => $e->getMessage()], 500);
        }
    }

//====================get status=================
  public function getComplaintstatuses(){
    $data = Complaintstatus::all();
    return response()->json($data);
  }
// ====================== ADD CATEGORIES    =====================================

// public function addcatagories(Request $request){

//     // $request->validate([
//     //     'category_name' => 'required|unique:complaincategories',
//     //     'status' => 'required',
//     //     'entry_by' => 'required',
//     // ]);


//   $store = new Complaincategory();  
//   $store->category_name =strtoupper($request->input('category_name'));
//   $store->status = $request->input('status');
//   $store->entry_by = $request->input('entry_by');




// //   checkn if duplicate data exits or not
// //   $existingCategory = Complaincategory::where('category_name', $store->category_name)->first();
// //   if ($existingCategory) {
// //       // Category with the same name already exists,then return an error response
// //       return response()->json(['error' => 'Category name already exists'], 422);
      
// //   }

//   $store->save();
//   return response()->json($store); 
  
// }


public function addcatagories(Request $request){
    try {
        $existingCategory = Complaincategory::where('category_name', strtoupper($request->category_name))->first();
        if ($existingCategory>0) {
            return response()->json(['error' => 'Category already exists.'], 400);
        }
        $store = new Complaincategory();  
        $store->category_name = strtoupper($request->category_name);
        $store->entry_by = $request->input('entry_by');
        $store->save();
        return response()->json($store);
    } catch (\Exception $e) {
        // Handle any exceptions that might occur during the process
        return response()->json(['error' => $e->getMessage()], 500);
    } 
}

// public function addcatagories(Request $request){
//     try {
   
//         $store = new Complaincategory();  

//         $store->category_name = strtoupper($request->category_name);

//         $store->status = $request->input('status');
//         $store->entry_by = $request->input('entry_by');

//         $store->save();

//         return response()->json($store);
//     } catch (\Exception $e) {
//         // Handle any exceptions that might occur during the process
//         return response()->json(['error' => $e->getMessage()], 500);
//     } 
  
// }

  // fetch catagories
  public function getCategories(){
    try {
        $categorydata = Complaincategory::selectRaw('id, category_name, DATE(created_at) as created_date')->get();
        return response()->json($categorydata);
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
}


          // rais complain
    // public function raisComplains(Request $request){
    //   $store = new complaint();  
    //   $store->complain_catregory_id = $request->input('complain_catregory_id');
    //   $store->complaints_desc = $request->input('complaints_desc');
    
// upload file
    //   $upload_files=$request->complaints_file->getClientOriginalExtension();
    //   $newfileName=time().'.'.$upload_files;
    //   $request->complaints_file->move(public_path().'/upload',$newfileName);
    //     $store->complaints_file = $newfileName;

    //   $store->dept_id = $request->input('dept_id');
    //   $store->org_id = $request->input('org_id');
    //   $store->complaints_status_id = $request->input('complaints_status_id');
    //   $store->complaints_ref_no = $request->input('complaints_ref_no');
    //   $store->approved_by = $request->input('approved_by');
    //   $store->entry_by = $request->input('entry_by');
    //   $store->complaint_date = now();
    //   $store->save();
    //   return response()->json($store);  
    // }

// ------------------------Raise Complaints-----------------------------------
public function raisComplains(Request $request)
{
    try {
       
        $request->validate([
            'complain_category_id' => 'required',
            'complaints_desc' => 'required',
            'dept_id' => 'required',
            'org_id' => 'required',
            'dept_name' => 'required',
            'org_name' => 'required',
            'entry_by_name' => 'required',
            // 'complaints_status_id' => 'required',
            // 'cmpln_file' => 'required|mimes:pdf,doc,docx,jpg,png,jpeg|max:2048', // Adjust file type and size as needed
            'entry_by' => 'required',
        ]);

   
        if ($request->hasFile('complaints_file')) {
            $file = $request->file('complaints_file');
            $fileName = time() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('ComplaintsFile'), $fileName);
          
        } else {
            $fileName = null;
        }
       

       
         $currentYear = date('Ymd');

         $complaintsCount = Complaint::count();
 
         $cmsWithRandomDigit = 'CMS' . $currentYear . str_pad($complaintsCount + 1,STR_PAD_LEFT);
        Complaint::create([
            'complain_category_id' => $request->complain_category_id,
            'complaints_desc' => $request->complaints_desc,
            'complaints_file' => $fileName,
            'dept_id' => $request->dept_id, 
            'org_id' => $request->org_id,
            'dept_name' => $request->dept_name,
            'org_name' => $request->org_name,
            'entry_by_name' => $request->entry_by_name,
            'complaints_ref_no' => $cmsWithRandomDigit,
            'complaint_date' => Carbon::now(), 
            'complaints_status_id' => '1',
            'approved_by' => '1',
          
            
            'entry_by' => $request->entry_by,
        ]);

        
        return response()->json(['message' => 'Complaint raised successfully'], 200);
    } catch (\Exception $e) {
       
        return response()->json(['error' => $e->getMessage()], 500);
    }
}


// =============================    In-Process  =====================================
public function Inprocessed(Request $req, $org_id, $dept_id)
  {
    $data = DB::select(" SELECT complaints.id,complaints.complain_category_id,cg.category_name,
    complaints.dept_id,complaints.dept_name,complaints.org_id,complaints.org_name,
    complaints.complaints_ref_no,complaints.complaint_date,complaints.complaints_desc,
    complaints.complaints_status_id,cs.complain_status_name
    FROM complaints
    LEFT JOIN complaincategories cg ON cg.id = complaints.complain_category_id
    LEFT JOIN complaintstatuses cs ON cs.id = complaints.complaints_status_id
    where complaints.org_id=$org_id and complaints.dept_id = $dept_id and cs.complain_status_name= 'Inprogress'");
if(count($data)>0){
    return response()->json(['data'=>$data, 'message' => 1]);
  }else{
    return response()->json(['data'=>'No Data Available','message' => 0]);
  }


  }

  public function editInProcessed(Request $req, $org_id, $dept_id, $id)
  {
    // dd($id);
    $data = DB::select(" SELECT complaints.id,complaints.complain_category_id,cg.category_name,
    complaints.dept_id,complaints.dept_name,complaints.org_id,complaints.org_name,complaints.entry_by_name,
    complaints.complaints_ref_no,complaints.complaint_date,complaints.complaints_desc,complaints.complaints_file,
    complaints.complaints_status_id,cs.complain_status_name
    FROM complaints
    LEFT JOIN complaincategories cg ON cg.id = complaints.complain_category_id
    LEFT JOIN complaintstatuses cs ON cs.id = complaints.complaints_status_id
    where complaints.org_id=$org_id and complaints.dept_id = $dept_id and complaints.id = $id and cs.complain_status_name= 'Inprogress'");

    return response()->json($data);
  }

  public function updtInProcessed(Request $request, $id){

    $image = $request->file('complaints_file');
    // dd($image->getClientOriginalName());
    $complaints_file = time() . '.' . $image->getClientOriginalName();
    $path = public_path('complaints_file');
    $image->move($path, $complaints_file);


$data = DB::table('complaints')->where('id', $id)->update([
    // 'id' => $request->input('complaint_id'),
    'complaints_status_id'=> $request->input('complaints_status_id'),
    'complaints_desc'=> $request->input('complaints_desc'),
    'complaints_file'=> $complaints_file,
    'updated_at' => NOW()
]);

return response()->json($data);
}


// =============================    processed   ======================================

public function processed(Request $req, $org_id, $dept_id)
{
    $data = DB::select("SELECT complaints.id,complaints.complain_category_id,cg.category_name,
    complaints.dept_id,complaints.dept_name,complaints.org_id,complaints.org_name,
    complaints.complaints_ref_no,complaints.complaint_date,complaints.complaints_desc,
    complaints.complaints_status_id,cs.complain_status_name
    FROM complaints
    LEFT JOIN complaincategories cg ON cg.id = complaints.complain_category_id
    LEFT JOIN complaintstatuses cs ON cs.id = complaints.complaints_status_id
    WHERE complaints.org_id=$org_id AND complaints.dept_id = $dept_id AND cs.complain_status_name= 'Solved'");

if(count($data)>0){
    return response()->json(['data'=>$data, 'message' => 1]);
  }else{
    return response()->json(['data'=>'No Data Available','message' => 0]);
  }
}

  public function editProcessed(Request $req, $org_id, $dept_id, $id)
  {
    // dd($id);
    $data = DB::select(" SELECT complaints.id,complaints.complain_category_id,cg.category_name,
    complaints.dept_id,complaints.dept_name,complaints.org_id,complaints.org_name,complaints.entry_by_name,
    complaints.complaints_ref_no,complaints.complaint_date,complaints.complaints_desc,
    complaints.complaints_status_id,cs.complain_status_name
    FROM complaints
    LEFT JOIN complaincategories cg ON cg.id = complaints.complain_category_id
    LEFT JOIN complaintstatuses cs ON cs.id = complaints.complaints_status_id
    where complaints.org_id=$org_id and complaints.dept_id = $dept_id and complaints.id = $id and cs.complain_status_name= 'Solved'");

    return response()->json($data[0]);
  }

  public function sts(){
    $data = DB::table('complaintstatuses')
    ->where('complaintstatuses.complain_status_name', '=', 'Solved')
    ->get();
    return response()->json($data[0]);
  }

     //update_categories======
    //  public function updateCategory(Request $request)
    //  {
    //     $data = Complaincategory::find($request->category_id);
    //     $data->category_name=strtoupper($request->cat_name);
    //     $data->entry_by=$request->entry_by;
    //     $data->save();
    //     if($data)
    //     {
    //      return response()->json("Updated Successfully");
    //     }
    //  }
    //update_categories======
   //update_categories======
    public function updateCategory(Request $request){
      $data = Complaincategory::find($request->category_id);
      $data->category_name=strtoupper($request->cat_name);
      $data->entry_by=$request->entry_by;
      $data->save();
      if($data){
        return response()->json("Updated Successfully");
      }
    }
    
    // ---------Complaint Tracking-------------------------

    public function complnTrack($orgID, $deptID ,$empID)
    {
        $data=Complaint::where('org_id',$orgID)
                           ->where('dept_id',$deptID)
                           ->where('entry_by',$empID)
                           ->orderBy('complaint_date', 'DESC')
                           ->get(['id','complaints_ref_no','complaint_date']);
   
        if (count($data) > 0) {
            return response()->json(['data'=>$data,'statusCode'=>1]);
        }
        return response()->json(['data'=>'No Data Available','statusCode'=>0]);
    }
   
    public function compln($id){
        $data=Complaint::leftJoin('complaintactions','complaintactions.complain_id','complaints.id')
           ->leftJoin('complaincategories','complaincategories.id','complaints.complain_category_id')
           ->leftJoin('complaintstatuses','complaintstatuses.id','complaints.complaints_status_id')
           ->where('complaints.id',$id)
           ->distinct()
           ->get(['complaincategories.category_name','complaints.dept_name','complaints.org_name','complaints.complaints_ref_no','complaintactions.action_type',
           'complaintactions.assign_to_emp','complaints.complaint_date','complaints.complaints_desc','complaints.complaints_file','complaintstatuses.complain_status_name']);
           return response()->json($data);
    }


    //Aseema
    public function complainPerDate($tdate,$fdate){
        $data = Complaint::join('complaincategories', 'complaints.complain_category_id', '=', 'complaincategories.id')
            ->whereBetween('complaints.created_at', [$tdate, $fdate])
            ->select(
                'complaints.id',
                'complaints.complain_category_id',
                'complaints.complaints_desc',
                'complaints.complaints_file',
                'complaints.dept_name',
                'complaints.org_id',
                'complaints.complaints_status_id',
                'complaints.complaints_ref_no',
                'complaints.approved_by',
                'complaints.complaint_date',
                'complaints.entry_by',
                'complaints.created_at as complaint_created_at',
                'complaints.updated_at as complaint_updated_at',
                'complaincategories.category_name'
            )
            ->get();
        return response()->json($data);
    }

public function fetchallcomaplains($id)
      {
        $data=Complaint::select('complaints.id','complaincategories.category_name','complaints.dept_id','complaints.complaints_ref_no','complaints.complaint_date','complaintstatuses.complain_status_name','complaints.dept_name')
        ->join('complaincategories','complaints.complain_category_id','=','complaincategories.id')->leftjoin('complaintstatuses','complaints.complaints_status_id','=','complaintstatuses.id')
        ->where('complaints.dept_id','=',$id)
        ->orderBy('complaints.complaint_date', 'desc')
        ->get();
        return response()->json($data);
      }
      public function fetchsinglecomaplains($cid)
      {
        $data=Complaint::select('complaints.id','complaints.complaints_ref_no','complaincategories.category_name','complaints.dept_id','complaints.dept_name','complaints.complaints_ref_no','complaints.complaint_date','complaintstatuses.complain_status_name','complaints.entry_by','complaints.complaints_desc','complaints.complaints_file','complaintstatuses.id as complaints_status_id','complaintstatuses.complain_status_name','complaints.entry_by_name')
        ->join('complaincategories','complaints.complain_category_id','=','complaincategories.id')->leftjoin('complaintstatuses','complaints.complaints_status_id','=','complaintstatuses.id')
        ->where('complaints.id','=',$cid)->get();
        return response()->json($data[0]);
      }
      public function updatesingledata(Request $request,$id)
      {
        if ($request->hasFile('file') && $request->file('file')->isValid())
        {
            $data=Complaint::find($id);
            $doc = $request->file('file');
            $document = time() . '.' . $doc->getClientOriginalExtension();
            $path = public_path('ComplaintsFile');
            $doc->move($path, $document);
            $data->complaints_status_id=$request->cmplnstatus;
            $data->complaints_file=$document;
            $data->complaints_desc=$request->cmplncmnt;
            $data->save();
            if($data)
            {
                return response()->json("Updated Successfully");
            }
        }
        else
        {
            $data=Complaint::find($id);
            $data->complaints_status_id=$request->cmplnstatus;
            $data->complaints_desc=$request->cmplncmnt;
            $data->save();
            if($data)
            {
                return response()->json("Updated Successfully");
            }
        }
      }
      public function AssignToEmp(Request $request)
      {
        $data=$request->all();
        for($i=0;$i<count($data);$i++)
        {
            $ca=Complaintaction::insert([
                'complain_id'=>$data[$i]['complain_id'],
                'assign_to'=>$data[$i]['userId'],
                'action_type'=>$data[$i]['action_type'],
                'dept_id'=>$data[$i]['dept_id'],
                'entry_by'=>$data[$i]['entry_by'],
                'created_at'=>NOW(),
                'assign_to_emp'=>$data[$i]['assign_to_emp'],
                'dept_name'=>$data[$i]['dept_name'],
                'org_id'=>$data[$i]['org_id'],
                'org_name'=>$data[$i]['org_name'],
                'entry_by_emp'=>$data[$i]['entry_by_emp']
            ]);
        }
        if($ca)
        {
            return response()->json('Complain Assigned Successfully');
        }
      }
    public function assignToDept(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:jpeg,png,jpg',
        ]);
        if ($request->hasFile('file') && $request->file('file')->isValid())
        {
            $doc = $request->file('file');
            $document = time() . '.' . $doc->getClientOriginalExtension();
            $path = public_path('ComplaintsActionFiles');
            $doc->move($path, $document);
            $data=Complaintaction::insert([
                'complain_id'=>$request->complain_id,
                'action_type'=>$request->action_type,
                'entry_by'=>$request->entry_by,
                'action_details'=>$request->action_details,
                'dept_id'=>$request->dept_id,
                'dept_name'=>$request->dept_name,
                'org_id'=>$request->org_id,
                'org_name'=>$request->org_name,
                'document'=>$document,
                'entry_by_emp'=>$request->entry_by_emp,
                'created_at'=>NOW()
            ]);
            if($data)
            {
                return response()->json('Complain Assigned Successfully');
            }
            else
            {
                return response()->json('Something Went Wrong');
            }
        }
    }
// -----------------------------------manoj----------------------------------------

public function getRefdStatus(Request $req){
    $reqData = $req->all();
$comp_id = $reqData['compId'];

    $prvsStatus =DB::select("SELECT complaints_status_id FROM complaints WHERE id='$comp_id'");

     if($prvsStatus[0]->complaints_status_id == 1){
        $data = Complaintstatus::whereIn('id',[2,3])->get();
        return response()->json($data);
     }elseif($prvsStatus[0]->complaints_status_id == 2){
        $data = Complaintstatus::where('id',3)->get();
        return response()->json($data);
     }
    // return response()->json();

   
  }

    public function getAllRefdComplaints(Request $req) {
        $data = $req->all();
        $deptId = $data["dept_id"];
        $userId = $data["user_id"];
        $designation = $data["designation"];
    
        if ($designation == 'Complain Manager') {
            $selectUsers = DB::select("SELECT DISTINCT compa.assign_to 
                FROM complaintactions compa 
                JOIN complaints comp ON compa.complain_id = comp.id 
                WHERE compa.dept_id = $deptId AND comp.complaints_status_id != 3");
    
            $allRefdComp_dpt = [];
    
            foreach ($selectUsers as $user) {
                $latestCompForUser = DB::select("SELECT ccat.category_name, compa.assign_to, compa.action_type, compa.complain_id, compa.assign_to_emp, compa.dept_id, compa.dept_name, compa.org_id, compa.org_name, compa.action_ref_no, compa.entry_by, compa.entry_by_emp, compa.action_date, compa.action_details, compa.document, comp.complaints_status_id, comps.complain_status_name,comp.complaints_ref_no 
                    FROM complaints comp
                    JOIN complaintactions compa ON comp.id = compa.complain_id
                    JOIN complaintstatuses comps ON comp.complaints_status_id = comps.id
                    JOIN complaincategories ccat ON ccat.id = comp.complain_category_id
                    WHERE comp.complaints_status_id != 3 AND comp.dept_id = $deptId AND compa.assign_to = $user->assign_to
                    ORDER BY compa.action_date DESC");
            
                if (!empty($latestCompForUser)) {
                    $allRefdComp_dpt[] = $latestCompForUser[0];
                }
            }
    
            return response()->json($allRefdComp_dpt);
        } else {
            $allRefdComp_dpt = DB::select("SELECT ccat.category_name, compa.assign_to, compa.action_type, compa.complain_id, compa.assign_to_emp, compa.dept_id, compa.dept_name, compa.org_id, compa.org_name, compa.action_ref_no, compa.entry_by, compa.entry_by_emp, compa.action_date, compa.action_details, compa.document, comp.complaints_status_id, comps.complain_status_name,comp.complaints_ref_no 
                FROM complaints comp
                JOIN complaintactions compa ON comp.id = compa.complain_id
                JOIN complaintstatuses comps ON comp.complaints_status_id = comps.id
                JOIN complaincategories ccat ON ccat.id = comp.complain_category_id
                WHERE comp.complaints_status_id != 3 AND compa.assign_to = $userId AND compa.action_type='emp'
                ORDER BY compa.action_date DESC LIMIT 1");
    
            return response()->json($allRefdComp_dpt);
        }
    }
    

    public function updateRefdComp(Request $req){
        $data = $req->all();
        // return response()->json(json_decode($req->preveousData));
        // return response()->json($prvData->category_name);
        $prvData = json_decode($req->preveousData);
        $file = $req->document;
        $toDayDate = now()->format('Y-m-d H:i:s');

        if($file !=null){

            $refdDocument = $file->getClientOriginalName();
            $newName = time() . '.' . $refdDocument;
            $file->move(public_path().'/uploads', $newName);

            Complaintaction::create([
                'org_name' => $prvData->org_name,
                'dept_name' => $prvData->dept_name,
                'action_ref_no' => $prvData->action_ref_no,
                'entry_by' => $req->logid,
                'entry_by_emp' => $req->log_emp,
                'action_date' => $toDayDate,
                'action_details' => $req->newComment,
                'complain_id' => $prvData->complain_id,
                'action_type' => $prvData->action_type,
                'dept_id' => $prvData->dept_id,
                'org_id' => $prvData->org_id,
                'assign_to'=>$prvData->assign_to,
                'assign_to_emp'=>$prvData->assign_to_emp,
                'document'=>$newName
            ]);

            Complaint::where('id',$prvData->complain_id)->update([
                'complaints_status_id'=>$req->status_id
            ]);
            return response()->json(['message' => 'Data stored successfully with document']);

    
        }else{

                Complaintaction::create([
                'org_name' => $prvData->org_name,
                'dept_name' => $prvData->dept_name,
                'action_ref_no' => $prvData->action_ref_no,
                'entry_by' => $req->logid,
                'entry_by_emp' => $req->log_emp,
                'action_date' => $toDayDate,
                'action_details' => $req->newComment,
                'complain_id' => $prvData->complain_id,
                'action_type' => $prvData->action_type,
                'dept_id' => $prvData->dept_id,
                'org_id' => $prvData->org_id,
                'assign_to'=>$prvData->assign_to,
                'assign_to_emp'=>$prvData->assign_to_emp
            ]);

            Complaint::where('id',$prvData->complain_id)->update([
                'complaints_status_id'=>$req->status_id
            ]);
            return response()->json(['message' => 'Data stored without document successfully']);

        }

    
    }

    // seacrh
public function search(Request $request,$referenceNumber)
{

    $results = (new Complaint)->search($referenceNumber);

    return response()->json(['results' => $results]);
}



}

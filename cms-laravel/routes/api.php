<?php

use App\Http\Controllers\ComplaintsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});



//Report Section
//Solved Complaints
Route::get('sComplaints/{dept_id?}/{org_id?}', [ComplaintsController::class, 'solvedComplaints']);
//Pending Complaints
Route::get('pComplaints/{dept_id?}/{org_id?}',[ComplaintsController::class,'pendingComplaints']);
//Department wise Complain report
Route::get('dWisecmsReport/{org_id?}/{dept_id?}', [ComplaintsController::class, 'dWisecmsreport']);
//AllComplaints
// Route::get('allComplainreport',[ComplaintsController::class,'allComplainreport']);



//getstatus
Route::get('/get_status', [ComplaintsController::class, 'getComplaintstatuses']);

// add catagories
Route::post('addcatagories',[ComplaintsController::class,'addcatagories']);
// get catagories
Route::get('getCategories',[ComplaintsController::class,'getCategories']);
//update categories
Route::post('update_categories',[ComplaintsController::class,'updateCategory']);

// raisComplain
Route::post('raisComplains',[ComplaintsController::class,'raisComplains']);

// Processed
Route::get('/processed/{org_id}/{dept_id}',[ComplaintsController::class,'processed']);
Route::get('/editProcessed/{org_id}/{dept_id}/{id}',[ComplaintsController::class,'editProcessed']);
// In-Progressed
Route::get('/Inprocessed/{org_id}/{dept_id}',[ComplaintsController::class,'Inprocessed']);
Route::get('/editInProcessed/{org_id}/{dept_id}/{id}',[ComplaintsController::class,'editInProcessed']);
Route::post('/updtInProcessed/{id}',[ComplaintsController::class,'updtInProcessed']);
Route::get('/sts',[ComplaintsController::class,'sts']);

// -------------------------------------------------------------------------------complaint tracking
Route::get('/compln_tracking/{orgID}/{deptID}/{empID}',[ComplaintsController::class,'complnTrack']);
Route::get('/getSingleTrack/{complainID}',[ComplaintsController::class,'compln']);


Route::get('complain_per_date/{tdate}/{fdate}',[ComplaintsController::class,'complainPerDate']);

// soumya

Route::get('fetch/all/complains/{id}',[ComplaintsController::class,'fetchallcomaplains']);
// fetch single complains
Route::get('fetch/single/complains/{cid}',[ComplaintsController::class,'fetchsinglecomaplains']);
//Update single complaints
Route::post('updatesingledata/{id}',[ComplaintsController::class,'updatesingledata']);
// assign Complain
Route::post('AssignToEmp',[ComplaintsController::class,'AssignToEmp']);

Route::post('AssignToDept',[ComplaintsController::class,'assignToDept']);


// Refered Comnplaint (manoj)
Route::post('getRefdComplaints',[ComplaintsController::class,'getAllRefdComplaints']);
Route::post('updateRefdComp',[ComplaintsController::class,'updateRefdComp']);
Route::post('getRefdStatus', [ComplaintsController::class, 'getRefdStatus']);

// search
// search
Route::get('/search/{refno}', [ComplaintsController::class, 'search']);
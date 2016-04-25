<?php

namespace App\Http\Controllers\User\Backend;

use App\Http\Controllers\Controller;
use App\Models\User as User;
use Auth;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Image;
use Validator;

class UserController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | User Admin Controller
    |--------------------------------------------------------------------------
     */

    private $_userModel;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
        //Init Entity Model
        $this->_userModel = new User();
    }

    /**
     * Show the user list at backend.
     *
     * @return Response
     */
    public function index()
    {
        //Get all users
        $users = $this->_userModel->all();
        //Response view
        return view('user.backend.index', ['users' => $users]);
    }

    /*
     * API get All User
     *
     * @GET("/api/users")
     * @Param: ()
     * @Version("v1")
     */

    public function getUsers(Request $request)
    {
        if (Auth::check()) {
            $data       = $request->all();
            $start      = $data['start'];
            $limit      = $data['limit'];
            $current    = Auth::user();
            $totalUsers = User::where('id', '!=', $current['id'])->get();
            $users      = User::where('id', '!=', $current['id'])->skip($start)->take($limit)->orderBy('id', 'DESC')->get();

            return response()->json(['success' => true, 'status' => 1, 'users' => $users, 'total' => count($totalUsers)]);
        }

        return response()->json(['success' => false, 'status' => 0]);
    }

    /*
     * API update user infor
     *
     * @POST("/api/users/update")
     * @Param: ({'firstName','lastName', 'password'})
     * @Version("v1")
     */

    public function updateUser(Request $request)
    {
        $user = Auth::user();
        if ($request->hasFile('photo')) {
            if ($request->file('photo')->isValid()) {
                $img = Image::make($request->file('photo'));

                $name = 'uploads/avatar/' . sha1(uniqid('', true)) . '.jpg';
                $img->save(public_path($name));
                $user->avatar = '/api/public/' . $name;
            }

        }

        if (empty($user)) {
            return response()->json(['status' => 0]);
        }

        if ($request->getMethod() == 'POST') {

            if ($request->get('firstName')) {
                $user->firstName = $request->get('firstName');
            }

            if ($request->get('lastName')) {
                $user->lastName = $request->get('lastName');
            }

            if ($request->get('password')) {
                $user->password = Hash::make($request->get('password'));
            }

            if ($user->save()) {
                return response()->json(['success' => true, 'status' => 1, 'message' => 'Your profile has been saved successfull']);
            } else {
                return response()->json(['success' => false, 'status' => 0, 'message' => 'An error happen in process save your profile'], Response::HTTP_BAD_REQUEST);
            }
        }

        return response()->json(['success' => false, 'status' => 0, 'message' => 'An error happen in process save your profile'], Response::HTTP_BAD_REQUEST);
    }

    /*
     * Create a new User
     *
     * @POST("/admin/users/create")
     * @Param: ({'firstName','lastName', 'email', 'password', '', 'isCompanyAdmin'})
     * @Version("v1")
     */

    public function create(Request $request)
    {
        if ($request->getMethod() == 'POST') {

            $datas = $request->all();

            /* Validation form */
            $validator = Validator::make($request->all(), [
                'firstName'   => 'required',
                'lastName'    => 'required',
                'email'       => 'required|email',
                'newPassword' => 'required',
                'confirmPass' => 'required|same:newPassword',
            ]);

            /* Check exist email */
            $userExist = $this->checkEmailExist($request->get('email'));

            if ($userExist == false) {
                $validator->errors()->add('email', 'This email already exists!');
                return redirect('admin/users/create')
                    ->withErrors($validator)
                    ->withInput();
            }

            if ($validator->fails()) {
                return redirect('admin/users/create')
                    ->withErrors($validator)
                    ->withInput();
            }

            $file = array_get($datas, 'avatar');
            if ($file) {
                // SET UPLOAD PATH
                $destinationPath = "uploads/avatar/";
                // GET THE FILE EXTENSION
                $extension = $file->getClientOriginalExtension();
                // RENAME THE UPLOAD WITH RANDOM NUMBER
                $fileName = rand(11111, 99999) . '.' . $extension;
                // MOVE THE UPLOADED FILES TO THE DESTINATION DIRECTORY
                $upload_success = $file->move($destinationPath, $fileName);

                if ($upload_success) {
                    $datas['avatar'] = $fileName;
                }
            } else {
                $datas['avatar'] = '';
            }

            /* Save new user */
            $user            = new User();
            $user->firstName = $datas['firstName'];
            $user->lastName  = $datas['lastName'];
            $user->email     = $datas['email'];
            $user->password  = Hash::make($datas['newPassword']);

            $user->updated_at = date('Y-m-d');
            $user->avatar     = $datas['avatar'];
            $user->isActive   = $datas['isActive'];
            $user->isAdmin    = 1;

            if ($user->save()) {
                return redirect()->action('User\Backend\UserController@index');
            } else {

            }
        }
        return view('user.backend.create');
    }

    /*
     * Update user's information
     * @POST("/admin/users/edit")
     * @Param: ({'firstName','lastName', 'email', 'password', 'isActive', 'avatar','status})
     * @Version("v1")
     */

    public function edit($userID, Request $request)
    {
        $user = User::find($userID);
        if ($user == null) {
            //Response view
            return redirect()->action('User\Backend\UserController@index');
        }
        if ($request->getMethod() == 'POST') {

            $datas = $request->all();

            /* Validation form */
            $validator = Validator::make($request->all(), [
                'firstName'   => 'required',
                'lastName'    => 'required',
                'confirmPass' => 'same:newPassword',
            ]);

            if ($validator->fails()) {
                return redirect('admin/users/edit/' . $user->id)
                    ->withErrors($validator)
                    ->withInput();
            }

            $file = array_get($datas, 'avatar');
            if ($file) {
                // SET UPLOAD PATH
                $destinationPath = "uploads/avatar/";
                // GET THE FILE EXTENSION
                $extension = $file->getClientOriginalExtension();
                // RENAME THE UPLOAD WITH RANDOM NUMBER
                $fileName = rand(11111, 99999) . '.' . $extension;
                // MOVE THE UPLOADED FILES TO THE DESTINATION DIRECTORY
                $upload_success = $file->move($destinationPath, $fileName);

                if ($upload_success) {
                    $datas['avatar'] = $fileName;
                }
            } else {
                $datas['avatar'] = $user->avatar;
            }

            /* Save new user */
            $user->firstName = $datas['firstName'];
            $user->lastName  = $datas['lastName'];
            $user->avatar    = $datas['avatar'];

            $user->isActive = $datas['isActive'];

            if ($datas['newPassword']) {
                $user->password = Hash::make($datas['newPassword']);
            }

            if ($user->save()) {
                //Response view
                return redirect()->action('User\Backend\UserController@index');
            } else {

            }
        }
        return view('user.backend.edit', ['user' => $user]);
    }

    /*
     * Delete user's information
     * @POST("/admin/users/delete/id")
     * @Param: ({'id'})
     * @Version("v1")
     */

    public function delete($id, Request $request)
    {
        $user = User::find($id);
        if ($user == null) {
            //Response view
            return redirect()->action('User\Backend\UserController@index');
        }
        if ($request->getMethod() == 'POST') {
            $user->delete();
            //Get all users
            $users = $this->_userModel->all();
            //Response view
            return view('user.backend.index', ['users' => $users]);
        }
        return view('user.backend.delete', ['user' => $user]);
    }

    /**
     * Show the user profile at backend.
     *
     * @return Response
     */
    public function profile($id)
    {
        return view('user.backend.profile');
    }

    /*
     * Check Email if exit in system
     * @Param: ({'email'})
     * @Version("v1")
     * */

    private function checkEmailExist($email)
    {
        $userExist = User::where(array('email' => $email))->count();
        if ($userExist > 0) {
            return false;
        } else {
            return true;
        }
    }

}

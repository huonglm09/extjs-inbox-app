<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Validator;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesAndRegistersUsers;
use Auth;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller {
    /*
      |--------------------------------------------------------------------------
      | Registration & Login Controller
      |--------------------------------------------------------------------------
      |
      | This controller handles the registration of new users, as well as the
      | authentication of existing users. By default, this controller uses
      | a simple trait to add these behaviors. Why don't you explore it?
      |
     */

use AuthenticatesAndRegistersUsers;

    /**
     * Create a new authentication controller instance.
     *
     * @return void
     */
    public function __construct() {
        //$this->middleware('guest', ['except' => 'getLogout']);
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data) {
        return Validator::make($data, [
                    'email' => 'required|email|max:255|unique:users',
                    //'password' => 'required|confirmed|min:6',
                    'password' => 'required|min:6',
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return User
     */
    protected function create(array $data) {
        return User::create([
                    'firstName' => $data['firstName'],
                    'lastName' => $data['lastName'],
                    'email' => $data['email'],
                    'password' => bcrypt($data['password']),
        ]);
    }

    public function loggedin() {
        // Check to see if we are logged in via remember me cookie
        if (!Auth::check()) {
            // If not then return false
            return response(['success' => false, 'loggedin' => false], 400);
        } else {
            // If so then return true as we still have a valid session cookie
            return response(['success' => true, 'loggedin' => true, 'data' => Auth::user()], 200);
        }
    }

    public function login() {
        $params = \Input::all();
        $post_data = [
            'email' => isset($params['email']) ? $params['email'] : null,
            'password' => isset($params['password']) ? $params['password'] : null
        ];

        // Remember token
        $remember = true;

        // Attempt to log in
        if (Auth::attempt($post_data, $remember)) {
            // If login is successful return true and user data
            return response()->json(['success' => true, 'data' => Auth::user()]);
        } else {
            // Login attempt failed so check if the user exists
            $user = User::whereEmail($post_data['email'])->first();
            if (count($user) === 0) {
                // If user does not exist then return false
                return response(['success' => false, 'user' => false, 'message' => 'User does not exist'], 400);
            } else {
                // If user does exist then check the password.  If the password doesn't match then return false
                if (!Hash::check($post_data['password'], $user->password)) {
                    return response(['success' => false, 'password' => false, 'message' => 'Wrong password'], 400);
                } else {
                    // It's all jacked up
                    return response(['success' => false, 'message' => 'Server error'], 500);
                }
            }
        }
    }

    public function register() {
        $params = \Input::all();
        $post_data = [
            'email' => isset($params['email']) ? $params['email'] : null,
            'password' => isset($params['password']) ? $params['password'] : null,
            'firstName' => isset($params['firstName']) ? $params['firstName'] : null,
            'lastName' => isset($params['lastName']) ? $params['lastName'] : null
        ];

        $validator = $this->validator($post_data);

        if ($validator->errors()->count() > 0) {
            return response(['success' => false, 'message' => $validator->errors()->all()], 500);
        }

        // Try to save the user
        try {
            $user = $this->create($post_data);
        } catch (QueryException $e) {
            // The email field in the users table has a unique index so it will throw an error
            // if there is a duplicate
            if (preg_match('/Duplicate entry/', $e->getMessage())) {
                return response(['success' => false, 'message' => 'User Exists'], 400);
            } else {
                return response(['success' => false, 'message' => $e->getMessage()], 500);
            }
        }
        // If the user create was a success return Accepted and loggedin false.
        if ($user->exists) {
            return response(['success' => true, 'loggedin' => false, 'message' => 'Your account has been successfully created'], 201);
        } else {
            return response(['success' => false, 'message' => 'Server error'], 500);
        }
    }

    public function logout() {
        Auth::logout();
        if (!Auth::check()) {
            return response(['success' => true, 'loggedin' => false], 200);
        }
    }

    public function profile() {
        if (!Auth::check()) {
            return response(['success' => false, 'loggedin' => false, 'data' => null], 400);
        } else {
            return response(['success' => true, 'loggedin' => true, 'data' => Auth::user()], 200);
        }
    }

}

<?php

namespace App\Models;

use App\Models\Email;
use Illuminate\Auth\Authenticatable;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\Access\Authorizable;

class User extends Model implements AuthenticatableContract, CanResetPasswordContract, AuthorizableContract
{
    use Authenticatable, CanResetPassword, Authorizable;
    use SoftDeletes;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'users';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['firstName', 'lastName', 'email', 'password', 'avatar'];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = ['password', 'remember_token'];

    /**
     * [inbox description]
     * @return [type] [description]
     */
    public function inbox()
    {
        return $this->hasMany(Email::class, 'to_user_email', 'email');
    }

    /**
     * [sent description]
     * @return [type] [description]
     */
    public function sent()
    {
        return $this->hasMany(Email::class, 'from_user_email', 'email');
    }

    /**
     * [isSuperAdmin description]
     * @return boolean [description]
     */
    public function isSuperAdmin()
    {
        return $this->isSuperAdmin ? true : false;
    }
}

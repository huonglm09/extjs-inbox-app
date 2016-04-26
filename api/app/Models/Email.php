<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Auth\Authenticatable;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Email extends Model implements AuthenticatableContract, CanResetPasswordContract
{
    use Authenticatable, CanResetPassword;
    use SoftDeletes;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'emails';

    /**
     * [fromUser description]
     * @return [type] [description]
     */
    public function fromUser()
    {
        return $this->belongsTo(User::class, 'from_user_email', 'email')->select('firstName', 'lastName', 'email', 'avatar');
    }

    /**
     * [toUser description]
     * @return [type] [description]
     */
    public function toUser()
    {
        return $this->belongsTo(User::class, 'to_user_email', 'email')->select('firstName', 'lastName', 'email', 'avatar');
    }

}

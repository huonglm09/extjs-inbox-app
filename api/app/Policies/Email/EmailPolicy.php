<?php

namespace App\Policies\Email;

use App\Models\Email;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class EmailPolicy
{
    use HandlesAuthorization;

    /**
     * Create a new policy instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * [show description]
     * @param  User   $user  [description]
     * @param  Email  $email [description]
     * @return [type]        [description]
     */
    public function show(User $user, Email $email)
    {
        return ($user->email === $email->from_user_email || $user->email === $email->to_user_email);

    }
}

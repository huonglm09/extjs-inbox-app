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
     * [before description]
     * @param  User   $user    [description]
     * @param  [type] $ability [description]
     * @return [type]          [description]
     */
    public function before(User $user, $ability)
    {
        if ($user->isSuperAdmin()) {
            return true;
        }
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

    /**
     * [moveToTrash description]
     * @param  User   $user  [description]
     * @param  Email  $email [description]
     * @return [type]        [description]
     */
    public function moveToTrash(User $user, Email $email)
    {
        return ($user->email === $email->from_user_email || $user->email === $email->to_user_email);

    }

    /**
     * [unTrash description]
     * @param  User   $user  [description]
     * @param  Email  $email [description]
     * @return [type]        [description]
     */
    public function unTrash(User $user, Email $email)
    {
        return ($user->email === $email->from_user_email || $user->email === $email->to_user_email);
    }
}

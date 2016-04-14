<?php

use App\Models\User;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user            = new User;
        $user->firstName = 'Recycle';
        $user->lastName  = 'Bin';
        $user->email     = 'nopbongdem@gmail.com';
        $user->password  = bcrypt('123456');
        $user->save();

        $user            = new User;
        $user->firstName = 'Huong';
        $user->lastName  = 'LM';
        $user->email     = 'huonglm09@gmail.com';
        $user->password  = bcrypt('123456');
        $user->save();
    }
}

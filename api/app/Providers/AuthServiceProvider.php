<?php

namespace App\Providers;

use App\Models\Email;
use App\Policies\Email\EmailPolicy;
use Illuminate\Contracts\Auth\Access\Gate as GateContract;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{

    /**
     * [$policies description]
     * @var [type]
     */
    protected $policies = [
        Email::class => EmailPolicy::class,
    ];
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot(GateContract $gate)
    {
        $this->registerPolicies($gate);
    }
}

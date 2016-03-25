<?php
namespace App\Modules\{ModuleName}\Providers;

use App;
use Config;
use Lang;
use View;
use Illuminate\Support\ServiceProvider;

class {ModuleName}ServiceProvider extends ServiceProvider
{
	/**
	 * Register the {ModuleName} module service provider.
	 *
	 * @return void
	 */
	public function register()
	{
		// This service provider is a convenient place to register your modules
		// services in the IoC container. If you wish, you may make additional
		// methods or service providers to keep the code more focused and granular.
		App::register('App\Modules\{ModuleName}\Providers\RouteServiceProvider');

		$this->registerNamespaces();
	}

	/**
	 * Register the {ModuleName} module resource namespaces.
	 *
	 * @return void
	 */
	protected function registerNamespaces()
	{
		Lang::addNamespace('{module-name}', realpath(__DIR__.'/../Resources/Lang'));

		View::addNamespace('{module-name}', realpath(__DIR__.'/../Resources/Views'));
	}
}

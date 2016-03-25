<?php

namespace App\Modules\{ModuleName}\Models;

use Illuminate\Database\Eloquent\Model;

class {ModuleName} extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = '{module-name}';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [{FieldList}];
     
}

<?php

namespace Qsoftvietnam;

use ExecProcess;
use DB;

/**
 * Models generator
 * 
 * @author HoaiTN
 */
class Generator {

    private $_moduleName;
    private $_folderList = ['Console', 'Database', 'Http', 'Models', 'Providers', 'Resources'];
    private $_fieldList;

    /*
     * Init module name
     */

    public function __construct($module = 'Demo', $fieldName = array()) {
        $this->_moduleName = $module;
        $this->_fieldList = $fieldName;
    }

    /*
     * Generate main folder structure
     */

    public function createModule() {
        //create main folder
        $mainFolder = __DIR__ . '/../app/Models/' . $this->_moduleName;
        if (!is_dir($mainFolder)) {
            @mkdir($mainFolder);
        }
        //create subfolder
        foreach ($this->_folderList as $folderName) {
            $subFolder = __DIR__ . '/../app/Models/' . $this->_moduleName . '/' . $folderName;
            if (!is_dir($subFolder)) {
                @mkdir($subFolder);
                $this->createFolderBase($folderName, $subFolder);
            }
        }
        $this->generateConfig();
        return true;
    }

    /*
     * Genarate base folder structure
     */

    private function createFolderBase($folderName, $source) {
        $folder = [];
        $file = [];
        switch (strtolower($folderName)) {
            case "console":

                break;
            case "database":
                $folder = ['Migrations', 'Seeds'];
                break;
            case "http":
                $folder = ['Controllers', 'Middleware', 'Requests'];
                $file = [
                    'Controllers' => ["Admin{ModuleName}Controller.php", "{ModuleName}Controller.php"],
                    'Requests' => ["{ModuleName}.php"],
                ];
                break;
            case "providers":
                $file = [
                    'Providers' => ["RouteServiceProvider.php", "{ModuleName}ServiceProvider.php"],
                ];
                break;
            case "models":
                $file = [
                    'Models' => ["{ModuleName}.php"],
                ];
                break;
            case "resources":
                $folder = ['Lang', 'Views'];
                $file = [
                    'Lang' => ["Admin{ModuleName}Controller.php", "{ModuleName}Controller.php"],
                    'Views' => ["create.blade.php", "edit.blade.php", "delete.blade.php", "home.blade.php", "index.blade.php"],
                ];
                break;
        }
        if (count($folder) > 0) {
            foreach ($folder as $key => $name) {
                @mkdir($source . '/' . $name);
                if ($name == 'Views') {
                    @mkdir($source . '/' . $name . '/admin');
                }
                $filePath = $source . '/' . $name;
                $fileName = (isset($file[$name]) ? $file[$name] : null);
                if ($fileName != null) {
                    $this->writeFile($filePath, $fileName, $name);
                }
            }
        } else {
            if (count($file) > 0) {
                foreach ($file as $key => $name) {
                    $filePath = $source;
                    $fileName = (isset($name) ? $name : null);
                    if ($fileName != null) {
                        $this->writeFile($filePath, $fileName, strtolower($folderName));
                    }
                }
            }
        }
    }

    /*
     * Generate all files in module
     */

    private function writeFile($filePath, $fileName, $source) {
        foreach ($fileName as $name) {
            $content = $this->witreContent($source, $name);
            $file = $filePath . '/' . str_replace('{ModuleName}', $this->_moduleName, $name);
            $adminTemplate = ["create.blade.php", "edit.blade.php", "delete.blade.php", "home.blade.php"];
            if (in_array($name, $adminTemplate)) {
                $file = $filePath . '/admin/' . str_replace('{ModuleName}', $this->_moduleName, $name);
            }
            $fp = fopen($file, "w");
            fwrite($fp, $content);
            fclose($fp);
        }
    }

    /*
     * Write content of file
     */

    private function witreContent($source, $name) {
        $moduleName = $this->_moduleName;
        switch (strtolower($source)) {
            case "controllers":
                //Generate Controllerr
                $contents = file_get_contents(__DIR__ . '/ModuleBase/Http/Controllers/' . $name);
                $contents = str_replace('{ModuleName}', $moduleName, $contents);
                $contents = str_replace('{module-name}', strtolower($moduleName), $contents);
                return $contents;
                break;
            case "requests":
                //Generate Validation Request
                $contents = file_get_contents(__DIR__ . '/ModuleBase/Http/Requests/' . $name);
                $contents = str_replace('{ModuleName}', $moduleName, $contents);
                $contents = str_replace('{module-name}', strtolower($moduleName), $contents);
                return $contents;
                break;
            case "providers":
                //Generate Service Provider
                $contents = file_get_contents(__DIR__ . '/ModuleBase/Providers/' . $name);
                $contents = str_replace('{ModuleName}', $moduleName, $contents);
                $contents = str_replace('{module-name}', strtolower($moduleName), $contents);
                return $contents;
                break;
            case "models":
                //Generate Service Provider
                $contents = file_get_contents(__DIR__ . '/ModuleBase/Models/' . $name);
                $contents = str_replace('{ModuleName}', $moduleName, $contents);
                $contents = str_replace('{module-name}', strtolower($moduleName), $contents);
                return $contents;
                break;
            case "views":
                //Generate Views
                $adminTemplate = ["create.blade.php", "edit.blade.php", "delete.blade.php", "home.blade.php"];
                if (in_array($name, $adminTemplate)) {
                    $contents = file_get_contents(__DIR__ . '/ModuleBase/Resources/Views/admin/' . $name);
                } else {
                    $contents = file_get_contents(__DIR__ . '/ModuleBase/Resources/Views/' . $name);
                }
                if ($this->_fieldList) {
                    $variableView = null;
                    $nameOfTop = null;
                    $nameOfButton = null;
                    foreach ($this->_fieldList as $key => $objName) {
                        $label = ucfirst(str_replace("_", " ", $objName));
                        $variableView .="<td>{{^value->" . $objName . "}}</td>";
                        $nameOfTop .= '<th class="sorting" tabindex="0" rowspan="1" colspan="1" aria-label="' . $label . ': activate to sort column ascending">' . $label . '</th>';
                        $nameOfButton .= '<th rowspan="1" colspan="1">'.$label.'</th>';
                    }
                }
                $contents = str_replace('{ModuleName}', $moduleName, $contents);
                $contents = str_replace('{module-name}', strtolower($moduleName), $contents);
                $contents = str_replace('{FieldList}', $variableView, $contents);
                $contents = str_replace('{FieldNameButton}', $nameOfButton, $contents);
                $contents = str_replace('{FieldNameTop}', $nameOfButton, $contents);
                $contents = str_replace('^', "$", $contents);
                return $contents;
                break;
        }
    }

    /*
     * Generate module config & route
     */

    private function generateConfig() {
        //Generate Route Config
        $content = file_get_contents(__DIR__ . '/ModuleBase/Http/routes.php');
        $content = str_replace('{ModuleName}', $this->_moduleName, $content);
        $content = str_replace('{module-name}', strtolower($this->_moduleName), $content);
        $file = __DIR__ . "/../app/Models/{$this->_moduleName}/Http/routes.php";
        $fp = fopen($file, "w");
        fwrite($fp, $content);
        fclose($fp);
        //Generate Module Config
        $content = file_get_contents(__DIR__ . '/ModuleBase/module.json');
        $content = str_replace('{module-name}', strtolower($this->_moduleName), $content);
        $file = __DIR__ . "/../app/Models/{$this->_moduleName}/module.json";
        $fp = fopen($file, "w");
        fwrite($fp, $content);
        fclose($fp);
    }

    /*
     * Generate model
     */

    public function createModel($fieldName, $fieldData) {
        $arrField = '';
        $lastkey = key(array_slice($fieldName, -1, 1, true));
        if (count($fieldName) > 0) {
            foreach ($fieldName as $key => $name) {
                $name = strtolower($name);
                $name = str_replace(' ', '_', $name);
                $arrField .= "'{$name}" . (($key != $lastkey) ? "', " : "'");
            }
        }
        $modelPath = __DIR__ . "/../app/Models/{$this->_moduleName}/Models/{$this->_moduleName}.php";
        $content = file_get_contents($modelPath);
        $content = str_replace('{FieldList}', $arrField, $content);
        $fp = fopen($modelPath, "w+");
        fwrite($fp, $content);
        fclose($fp);
        if (count($fieldData) > 0) {
            $this->generateMigrations($this->_moduleName);
        }
    }

    /*
     * Create DB Table
     */

    private function createDBTable($fieldData) {
        $this->dropDBTable();
        $stringQuery = "";
        $stringQuery .= "CREATE TABLE IF NOT EXISTS `" . strtolower($this->_moduleName) . "` (\n`id` int(11) NOT NULL AUTO_INCREMENT,\n";
        foreach ($fieldData as $key => $field) {
            $data = explode("_", $field);
            $fieldName = strtolower(str_replace(' ', '_', $data[0]));
            $fieldType = $data[1];
            $fieldLength = ($fieldType == 'float' || $fieldType == 'int' || $fieldType == 'varchar') ? "({$data[2]})" : null;
            $fieldRequired = (($data[3] == '1') ? 'NOT NULL' : 'DEFAULT NULL');
            $stringQuery .= "`{$fieldName}` {$fieldType}{$fieldLength} {$fieldRequired},\n";
        }
        $stringQuery .= "PRIMARY KEY (`id`)\n) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;";
        //echo $stringQuery;die;
        DB::statement($stringQuery);

        return true;
    }

    private function dropDBTable() {
        $dropTable = "DROP TABLE IF EXISTS `" . strtolower($this->_moduleName) . "`;";
        DB::statement($dropTable);
        return true;
    }

    /*
     * Generate module migrations
     */

    private function generateMigrations($moduleName) {
        \Artisan::call("make:migration",[
            'name'=>"{$moduleName}Table",
            '--create'=>strtolower($moduleName),
            '--table'=>strtolower($moduleName),
            '--path'=>"database/migrations/",                   
            ]);
        return true;
    }  
    
    
    public function migrate(){
        
    }
}

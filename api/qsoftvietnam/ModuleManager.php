<?php
namespace Qsoftvietnam;

use DB;
use Module;
/**
 * Description of ModuleManager
 *
 * @author HoaiTN
 */
class ModuleManager {
    private $_allModule;
    private $_moduleCount;
    private $_enabledModules;
    private $_disabledModules;

    public function __construct() {
        //Get all modules which are existing.
        $this->_allModule = Module::all();
        //Returns a count of all modules.
        $this->_moduleCount = Module::count();        
        //Gets all enabled modules.
        $this->_enabledModules = Module::enabled();
        //Gets all disabled modules.
        $this->_disabledModules = Module::disabled();        
    }
    /*
     * Returns all modules
     */
    public function getAllModule(){
        
        return $this->_allModule;
    }
    /*
     * Returns a count of all module
     */
    public function moduleCount(){
        
        return $this->_moduleCount;
    }
    /*
     * Returns all module are enable
     */
    public function getEnableModule(){
        
        return $this->_enabledModules;
    }
    /*
     * Returns all module are disable
     */
    public function getDisableModule(){
        
        return $this->_disabledModules;
    }
    /*
     * Enable the specified module
     */
    public function enableModule($moduleName = 'Demo'){
        
        Module::enable($moduleName);
        return true;
    }
    /*
     * Disable the specified module
     */
    public function disableModule($moduleName = 'Demo'){
        
        Module::disable($moduleName);  
        return true;
    }
    /*
     * Returns the modules defined properties.
     */
    public function getModuleProperties($moduleName = 'Demo'){
        
        $moduleProperties = Module::getProperties($moduleName);
        return $moduleProperties;
    }
    /*
     * Mixed module names
     */
    public function mixedProperties($moduleName = 'Demo', $newLable = 'Demo'){
        
        $moduleName = Module::getProperty("{$moduleName}::name", "{$newLable}");
        return $moduleName;
    }
    /*
     * Remove a module
     */
    public function removeModule($moduleName = 'Demo'){
        //TODO
    }
}

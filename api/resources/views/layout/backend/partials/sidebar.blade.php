<aside class="main-sidebar">
    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar">
        <!-- Sidebar user panel -->
        <div class="user-panel hidden">
            <div class="pull-left image">
                <img src="{{asset('/backend/dist/img/user2-160x160.jpg')}}" class="img-circle" alt="User Image" />
            </div>
            <div class="pull-left info">
                <p>Hoai Nam Tran</p>

                <a href="#"><i class="fa fa-circle text-success"></i> Online</a>
            </div>
        </div>
        <!-- search form -->
        <span class="hidden">
            @include('layout.backend.partials.searchbar')
        </span>
        <!-- /.search form -->
        <!-- sidebar menu: : style can be found in sidebar.less -->
        <ul class="sidebar-menu">
            <li class="header hidden">MAIN NAVIGATION</li>
            <li class="hidden">
                <a href="{{url('admin/dashboard')}}">
                    <i class="fa fa-dashboard"></i> <span>Dashboard</span>
                </a>
            </li>
            <li class="{{Route::getCurrentRoute()->getPath()=='admin'?'active':'' }}">
                <a href="{{url('admin/dashboard')}}">
                    <i class="fa fa-dashboard"></i>
                    <span>Promotions</span>
                </a>
            </li>
            <?php
            if (strpos(Route::getCurrentRoute()->getPath(), 'admin/customers') !== false) {
                $active_customer = true;
            }else{
                $active_customer = false;
            }
            ?>
            <li class="{{$active_customer?'active':'' }}">
                <a href="{{url('admin/customers')}}">
                    <i class="fa fa-th"></i>
                    <span>Customers</span>
                </a>
            </li>
            <li>
                <a href="#">
                    <i class="fa fa-share"></i>
                    <span>Enquires</span>
                </a>
            </li>
            <li>
                <a href="#">
                    <i class="fa fa-pie-chart"></i>
                    <span>Reports</span>
                </a>
            </li>
            <?php
            if (strpos(Route::getCurrentRoute()->getPath(), 'admin/users') !== false) {
                $active_user = true;
            }else{
                $active_user = false;
            }
            ?>
            <li class="{{$active_user?'active':''}}">
                <a href="{{url('admin/users')}}">
                    <i class="fa fa-fw fa-user"></i>
                    <span>Admin User</span>
                </a>
            </li>
        </ul>
    </section>
    <!-- /.sidebar -->
</aside>
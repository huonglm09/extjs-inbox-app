@extends("layout.backend.master")

@section("content")
<!-- header-->
<section class="content-header">
    <h1>
        Admin
        <small>Content list</small>
    </h1>
    <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> Admin</a></li>
        <li class="active">Manage Content</li>
    </ol>
</section>
<section class="content">
    <div class="row">
        <div class="col-md-6">
            <!-- general form elements -->
            <div class="box box-primary">
                <div class="box-header">
                    <h3 class="box-title">Edit content</h3>
                </div><!-- /.box-header -->
                <!-- form start -->
                <form role="form" method="post" action="{{url('admin/{module-name}/edit',['id'=>$data->id])}}">
                    <input type="hidden" name="_token" value="{{ csrf_token() }}">
                    <div class="box-body">
                        <div class="form-group">
                            <label>Title</label>
                            <input type="text" class="form-control" id="title" name="title" placeholder="Enter title" value="{{$data->title}}">
                        </div>
                        <div class="form-group">
                            <label>Description</label>
                            <textarea class="textarea" id="description" name="description" rows="10" cols="80" value="{{$data->description}}">{{$data->description}}</textarea> 
                        </div> 
                        <div class="form-group">
                            <label>Detail</label>
                            <textarea class="textarea" id="detail" name="detail" rows="10" cols="80" value="{{$data->detail}}">{{$data->detail}}</textarea> 
                        </div>                        
                    </div><!-- /.box-body -->

                    <div class="box-footer">
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div><!-- /.box -->
        </div>
    </div><!-- /.row -->
</section>
@stop

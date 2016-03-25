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
        <div class="col-md-12">
            <!-- general form elements -->
            <div class="box box-primary">
                <div class="box-header">
                    <h3 class="box-title">Edit content</h3>
                </div><!-- /.box-header -->
                <!-- form start -->               
                <div class='box-body pad'>
                    <!-- form start -->
                    <form role="form" method="post" action="{{url('admin/{module-name}/edit',['id'=>$data->id])}}">
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                        <div class="form-group">
                            <label>Title</label>
                            <input type="text" class="form-control" id="title" name="title" placeholder="Enter title" value="{{$data->title}}">
                        </div>
                        <div class="clearfix"></div>                        
                        <div class="form-group">
                            <label>Slug</label>
                            <input type="text" class="form-control" id="slug" name="slug" placeholder="Enter slug" value="{{$data->slug}}">
                        </div>
                        <div class="clearfix"></div>
                        <div class="form-group">
                            <label>Description</label>                             
                        </div> 
                        <textarea class="textarea editor-wsy-htm5" id="description" name="description" placeholder="Place some text here" value="{{$data->description}}">{{$data->description}}</textarea>
                        <div class="clearfix"></div>
                        <div class="form-group">
                            <label>Detail</label>                                
                        </div> 
                        <textarea class="textarea editor-wsy-htm5" id="detail" name="detail" placeholder="Place some text here" value="{{$data->detail}}">{{$data->detail}}</textarea>
                        <div class="box-footer">
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
            </div><!-- /.box -->
        </div>
    </div><!-- /.row -->
</section>
@stop

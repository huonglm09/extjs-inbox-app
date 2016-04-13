<?php
namespace App\Http\Controllers\Email;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Validator;
use App\Models\User as User;
use App\Models\Email as Email;
use DB;
use Log;
use Mail;
use JWTAuth;
use TymonJWTAuthExceptionsJWTException;

class EmailController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Email Controller
    |--------------------------------------------------------------------------
    */

    /*
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
//        $this->middleware('auth');
//        $this->middleware('jwt.auth', ['except' => ['authenticate']]);
    }

    /*
     * Get List Email Inbox By User Email
     * @GET("/api/email-inbox/{user_email}")
     * @Param : ({'user_email'})
     * @Version ("v1")
     * */
    public function getEmailsInbox($user_email){
        $emails_inbox = Email::where('to_user_email','=',$user_email)->where('to_deleted','!=',1)->get();
        return response()->json(['emails'=>$emails_inbox]);
    }

    /*
     * Get Email detail
     * @GET("/api/email-detail/{user_email}/{id}")
     * @Param : ({'user_email','id'})
     * @Version ("v1")
     * */
    public function getEmailsDetail($user_email, $id){
        $email_detail = Email::where('id','=',$id)->get();
        if (!empty($email_detail)) {
            return response()->json(['emails'=>$email_detail, 'status'=>1]);
        }else{
            return response()->json(['status'=>0]);
        }
        
    }
    

    /*
     * Get List Email Sent By User Email
     * @GET("/api/email-sent/{user_email}")
     * @Param : ({'user_email'})
     * @Version ("v1")
     * */
    public function getEmailSent($user_email){
        $emails_sent = Email::where('from_user_email','=',$user_email)->where('from_deleted','!=',1)->get();
        return response()->json(['emails'=>$emails_sent]);
    }

    /*
     * Sent Email to other
     * @POST("/api/write-email}")
     * @Param : $email('from_email','to_email','subject','content')
     * @Version ("v1")
     * */
    public function sentMailToOther(Request $request){

        if($request->getMethod() == 'POST'){
            $emails = array();

            $emails['from_email'] = $request->get('from_email');
            $emails['to_email'] = $request->get('to_email');
            $emails['subject'] = $request->get('subject');
            $emails['content'] = $request->get('content');

            $status = $this->sendMail($emails);

            if($status){
               $emailSave = new Email();
                $emailSave->from_user_email = $request->get('from_email');
                $emailSave->to_user_email = $request->get('to_email');
                $emailSave->mail_subject = $request->get('subject');
                $emailSave->mail_content = $request->get('content');
                $emailSave->from_deleted = 0;
                $emailSave->to_deleted = 0;

                if($emailSave->save()){
                    return response()->json(['status' => 1, 'success' => true]);
                }
            }
        }
        return response()->json(['status' => 0, 'success' => false]);
    }

    /*
     * Send Email
     *
     * Send an email to user when they reset a password
     *
     * @Param ({email : Information of user email})
     * @Versions({"v1"})
     */
    private function sendMail($emails)
    {

        try{
            //Define mail content
            $mailContent = new \StdClass();
            $mailContent->subject =$emails['subject'];
            $mailContent->from = $emails['from_email'];
            $mailContent->email_to = $emails['to_email'];
            $mailContent->content = $emails['content'];
            $mailContent->full_name = 'Inbox Member';


            Mail::send('emails.user-reset-password', ['message' => $mailContent,'mailContent'=>$mailContent->content,
                'full_name'=>$mailContent->full_name
            ], function ($m) use
            ($mailContent) {
                $m->from($mailContent->from, 'InboxManagement');
                $m->to($mailContent->email_to, $mailContent->full_name)->subject($mailContent->subject);
            });

            return true;
        }catch(\Exception $e){
            Log::error($e);
        }

    }

    /*
     * Delete Email
     * @POST("/api/emails/delete}")
     * @Param ({email_id, is_inbox})
     * @Versions({"v1"})
     */
      public function deleteEmail(Request $request){

          if($request->getMethod() == 'POST'){
                $email_id = $request->get('email_id');
                $is_inbox = $request->get('is_inbox');

                $email = Email::find($is_inbox);

              if($is_inbox == 1){
                  $email->from_deleted = 1;
              }else{
                  $email->to_deleted = 1;
              }
              if($email->save()){
                  return response()->json(['status'=>1]);
              }

          }

          return response()->json(['status'=>0]);
      }

      

    /*
     * pieChart : Inbox - sent Email
     * @POST("/api/pie-charts}")
     * @Param ({email_id})
     * @Versions({"v1"})
     */
    public function pieChart($email){
        $emails_inbox = Email::where('to_user_email','=',$email)->where('to_deleted','=',0)->count();
        $emails_sent = Email::where('from_user_email','=',$email)->where('from_deleted','=',0)->count();

        return response()->json(['status'=>1,'inbox'=>$emails_inbox, 'sent'=> $emails_sent]);
    }


}

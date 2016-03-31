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
        $this->middleware('auth');
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
            $email = $request->get('email');

            $status = $this->sendMail($email);
            if($status){
               $emailSave = new Email();
                $email->from_user_email = $email->from_email;
                $email->to_user_email = $email->to_email;
                $email->mail_subject = $email->subject;
                $email->mail_content = $email->content;
                $email->from_deleted = 0;
                $email->to_deleted = 0;

                if($emailSave->save()){
                    return response()->json(['status' => 1]);
                }
            }
        }
        return response()->json(['status' => 0]);
    }

    /*
     * Send Email
     *
     * Send an email to user when they reset a password
     *
     * @Param ({email : Information of user email})
     * @Versions({"v1"})
     */
    private function sendMail($email)
    {
        try{
            //Define mail content
            $mailContent = new \StdClass();
            $mailContent->subject = $email->subject;
            $mailContent->from = $email->from_email;
            $mailContent->email_to = $email->to_email;
            $mailContent->content = $email->content;

            Mail::send('emails.user-reset-password', ['message' => $mailContent,'mailContent'=>$mailContent->content], function ($m) use
            ($mailContent) {
                $m->from($mailContent->from, 'InboxManagement');
                $m->to($mailContent->email_to, $mailContent->full_name)->subject($mailContent->subject);
            });

            return true;
        }catch(\Exception $e){
            Log::error($e);
        }

    }
}

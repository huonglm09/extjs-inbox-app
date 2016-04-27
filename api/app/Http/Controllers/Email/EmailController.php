<?php

namespace App\Http\Controllers\Email;

use App\Http\Controllers\Controller;
use App\Models\Email as Email;
use Auth;
use DB;
use Gate;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Log;
use Mail;

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
     * @GET("/api/email/inbox")
     * @Version ("v1")
     * */

    public function getEmailsInbox(Request $request)
    {
        $user  = Auth::user();
        $start = $request->start;
        $limit = $request->limit;

        $emails_inbox          = Email::whereToUserEmail($user->email)->whereToDeleted(false)->get();
        $emails_inbox_paginate = Email::with('fromUser', 'toUser')->whereToUserEmail($user->email)->whereToDeleted(false)->skip($start)->take($limit)->orderBy('id', 'DESC')->get();

        return response()->json(['emails' => $emails_inbox_paginate, 'total' => count($emails_inbox)]);
    }

    /**
     * @GET('/api/email/:id')
     * @param  int $id
     * @return Response
     */
    public function show($id)
    {
        try {
            $email = Email::with('fromUser', 'toUser')->findOrFail($id);
            if (Gate::denies('show', $email)) {
                return response()->json(['message' => 'Access denies'], Response::HTTP_UNAUTHORIZED);
            } else {
                return response()->json($email);
            }

        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Email not found'], Response::HTTP_BAD_REQUEST);
        }
    }

    /*
     * Get List Email Sent By User Email
     * @GET("/api/email/sent")
     * @Version ("v1")
     * */

    public function getEmailSent(Request $request)
    {
        $user  = Auth::user();
        $start = $request->start;
        $limit = $request->limit;

        $emails_sent          = Email::whereFromUserEmail($user->email)->whereFromDeleted(false)->get();
        $emails_sent_paginate = Email::with('fromUser', 'toUser')->whereFromUserEmail($user->email)->whereFromDeleted(false)->skip($start)->take($limit)->orderBy('id', 'DESC')->get();

        return response()->json(['emails' => $emails_sent_paginate, 'total' => count($emails_sent)]);
    }

    /*
     * Sent Email to other
     * @POST("/api/write-email}")
     * @Param : $email('from_email','to_email','subject','content')
     * @Version ("v1")
     * */

    public function sentMailToOther(Request $request)
    {
        if ($request->getMethod() == 'POST') {
            $data = $request->all();                        
            $emails = array();            
            if(isset($data['type'])) {
                if($data['type'] == 'reply') {
                    $user  = Auth::user();
                    $emailCurrent = Email::find($request->get('id'));

                    $emails['from_email'] = $user->email;
                    $emails['to_email']   = $request->get('reply_to_email');                                
                    $emails['subject']    = 'Re: ' . $emailCurrent['mail_subject'];
                    $emails['content']    = $request->get('reply') . "<br/><br/>----- Original Message -----<br/>From: " . $emailCurrent['from_user_email'] . "<br/>To: "  . $emailCurrent['to_user_email'] . "<br/>Sent: " . $emailCurrent['created_at'] . "<br/>Subject: " . $emailCurrent['mail_subject'] . "<br/><br/>" . str_replace('----- Original Message -----', '', $emailCurrent['mail_content']);
                    if(isset($data['reply_subject'])) {
                        $emails['subject']    = $request->get('reply_subject');
                    }                    
                }
                
                if($data['type'] == 'forward') {
                    $user  = Auth::user();
                    $emailCurrent = Email::find($request->get('id_forward'));

                    $emails['from_email'] = $user->email;
                    $emails['to_email']   = $request->get('to_forward_email');                                
                    $emails['subject']    = 'Fwd: ' . $emailCurrent['mail_subject'];
                    $emails['content']    = $request->get('forward') . "<br/><br/>----- Forwarded Message -----<br/>From: " . $emailCurrent['from_user_email'] . "<br/>To: "  . $emailCurrent['to_user_email'] . "<br/>Sent: " . $emailCurrent['created_at'] . "<br/>Subject: " . $emailCurrent['mail_subject'] . "<br/><br/>" . str_replace('----- Forwarded Message -----', '', $emailCurrent['mail_content']);
                    if(isset($data['forward_subject'])) {
                        $emails['subject']    = $request->get('forward_subject');
                    }                    
                }                           
            } else {
                $emails['from_email'] = $request->get('from_email');
                $emails['to_email']   = $request->get('to_email');
                $emails['subject']    = $request->get('subject');
                $emails['content']    = $request->get('content');
            }
            
            $status = $this->sendMail($emails);

            if ($status) {
                $emailSave                  = new Email();
                $emailSave->from_user_email = $emails['from_email'];
                $emailSave->to_user_email   = $emails['to_email'];
                $emailSave->mail_subject    = $emails['subject'];
                $emailSave->mail_content    = $emails['content'];
                $emailSave->from_deleted    = 0;
                $emailSave->to_deleted      = 0;

                if ($emailSave->save()) {
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
        try {
            //Define mail content
            $mailContent            = new \StdClass();
            $mailContent->subject   = $emails['subject'];
            $mailContent->from      = $emails['from_email'];
            $mailContent->email_to  = $emails['to_email'];
            $mailContent->content   = $emails['content'];
            $mailContent->full_name = 'Inbox Member';

            Mail::send('emails.user-reset-password', ['message' => $mailContent, 'mailContent' => $mailContent->content, 'full_name' => $mailContent->full_name], function ($m) use
                ($mailContent) {
                    $m->from($mailContent->from, 'InboxManagement');
                    $m->to($mailContent->email_to, $mailContent->full_name)->subject($mailContent->subject);
                });

            return true;
        } catch (\Exception $e) {
            Log::error($e);
        }
    }

    /*
     * Delete Email
     * @POST("/api/emails/delete}")
     * @Param ({email_id, is_inbox})
     * @Versions({"v1"})
     */

    public function deleteEmail(Request $request)
    {

        if ($request->getMethod() == 'POST') {
            $email_id = $request->get('email_id');
            $is_inbox = $request->get('is_inbox');

            $email = Email::find($is_inbox);

            if ($is_inbox == 1) {
                $email->from_deleted = 1;
            } else {
                $email->to_deleted = 1;
            }
            if ($email->save()) {
                return response()->json(['status' => 1]);
            }
        }

        return response()->json(['status' => 0]);
    }

    /*
     * pieChart : Inbox - sent Email
     * @POST("/api/pie-charts")
     * @Versions({"v1"})
     */

    public function pieChart(Request $request)
    {
        $user         = Auth::user();
        $emails_inbox = Email::whereToUserEmail($user->email)->whereToDeleted(false)->count();
        $emails_sent  = Email::whereFromUserEmail($user->email)->whereFromDeleted(false)->count();

        return response()->json(['success' => true, 'data' => [['name' => 'Received', 'value' => $emails_inbox, 'total' => $emails_inbox + $emails_sent], ['name' => 'Sent', 'value' => $emails_sent, 'total' => $emails_inbox + $emails_sent]]]);
    }

    /*
     * pieChart : Inbox - sent Email
     * @POST("/api/pie-charts/sent")
     * @Versions({"v1"})
     */

    public function pieChartSent()
    {
        $user        = Auth::user();
        $emails_sent = DB::table('emails')
            ->select('*', DB::raw('count(*) as total, CONCAT_WS(" ", firstName, lastName) as fullName'))
            ->join('users', 'emails.to_user_email', '=', 'users.email')
            ->where('from_user_email', '=', $user->email)
            ->where('from_deleted', '=', 0)
            ->groupBy('to_user_email')
            ->get();

        return response()->json(['success' => true, 'data' => $emails_sent]);
    }

    /*
     * pieChart : Inbox - sent Email
     * @GET("/api/pie-charts/inbox")
     * @Versions({"v1"})
     */

    public function pieChartInbox()
    {
        $user        = Auth::user();
        $emails_sent = DB::table('emails')
            ->select('*', DB::raw('count(*) as total, CONCAT_WS(" ", firstName, lastName) as fullName'))
            ->join('users', 'emails.from_user_email', '=', 'users.email')
            ->where('to_user_email', '=', $user->email)
            ->where('to_deleted', '=', 0)
            ->groupBy('from_user_email')
            ->get();

        return response()->json(['success' => true, 'data' => $emails_sent]);
    }

    /**
     * @GET('/api/email/trash')
     * @require Auth
     * @return Response
     */
    public function getTrash(Request $request)
    {
        $user = Auth::user();
        $data = Email::where(function ($query) use ($user) {
            return $query
                ->whereFromUserEmail($user->email)
                ->whereFromDeleted(true);
        })
            ->orWhere(function ($query) use ($user) {
                return $query
                    ->whereToUserEmail($user->email)
                    ->whereToDeleted(true);
            })
            ->orderBy('id', 'DESC')
            ->with('fromUser', 'toUser')
            ->paginate($request->limit ? $request->limit : 15);

        return response()->json($data);
    }

    /**
     * @DELETE('/api/email/:id')
     * @param  int $id
     * @return Response
     */
    public function moveToTrash($id)
    {
        $user = Auth::user();
        try {
            $email = Email::with('fromUser', 'toUser')->findOrFail($id);
            if (Gate::denies('moveToTrash', $email)) {
                return response()->json(['message' => 'Access denies'], Response::HTTP_UNAUTHORIZED);
            } else {
                if ($email->to_user_email === $user->email) {
                    $email->to_deleted = true;
                } else if ($email->from_user_email === $user->email) {
                    $email->from_deleted = true;
                }
                if ($email->save()) {
                    return response()->json($email, Response::HTTP_OK);
                } else {
                    return response()->json(['message' => 'Something wrong!'], Response::HTTP_BAD_REQUEST);
                }

            }

        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Email not found'], Response::HTTP_BAD_REQUEST);
        }
    }

    /**
     * PUT('/api/email/:id')
     * @param  int $id
     * @return Response
     */
    public function unTrash($id)
    {
        $user = Auth::user();
        try {
            $email = Email::with('fromUser', 'toUser')->findOrFail($id);
            if (Gate::denies('unTrash', $email)) {
                return response()->json(['message' => 'Access denies'], Response::HTTP_UNAUTHORIZED);
            } else {
                if ($email->to_user_email === $user->email) {
                    $email->to_deleted = false;
                } else if ($email->from_user_email === $user->email) {
                    $email->from_deleted = false;
                }
                if ($email->save()) {
                    return response()->json($email, Response::HTTP_OK);
                } else {
                    return response()->json(['message' => 'Something wrong!'], Response::HTTP_BAD_REQUEST);
                }

            }

        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Email not found'], Response::HTTP_BAD_REQUEST);
        }
    }
}

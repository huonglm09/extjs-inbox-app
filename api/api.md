## API Inbox Management

### Get Inbox Email

 * @GET("/api/email-inbox/{user_email}")
 * @Param : ({'user_email'}) eg: http://ext.local/api/email-inbox/theman2311@gmail.com
 * @Version ("v1")

### Get Sent Email

 * @GET("/api/email-sent/{user_email}")
 * @Param : ({'user_email'}) eg: http://ext.local/api/email-sent/theman2311@gmail.com
 * @Version ("v1")


### Sent Email To Other
 * @POST("/api/write-email}")
 * @Param : {('from_email','to_email','subject','content')} eg: http://ext.local/api/write-email
 * @Version ("v1")


### Delete Email
  * @POST("/api/emails/delete")
  * @Param ({email_id, is_inbox})
    * is_inbox == 1 : delete from my inbox
    * is_inbox == 0 : delete from my sent
  * @Version ("v1")

### Get All User
   * @GET("/api/users")
   * @Version ("v1")


### API update user infor
  * @POST("/api/users/update/{user_email}")
  * @Param: ({'firstName','lastName', 'password'})
  * @Return : status
  	* status = 1: update success
  	* status = 0: update false  
  * @Version ("v1")


### pieChart : Inbox - sent Email
  * @GET("/api/pie-charts/{user_email}")
  * @Param: ('')
  * @Return : ['status'=>1,'inbox'=>total_inbox_email, 'sent'=> total_sent_email])
  * @Version ("v1")
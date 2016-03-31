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
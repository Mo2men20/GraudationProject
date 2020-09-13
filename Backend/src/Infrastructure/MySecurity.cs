using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GraduationProject.Infrastructure
{
    public class MySecurity
    {
        private readonly RequestDelegate _next;

        public MySecurity(RequestDelegate next) {
            _next = next;
        }

        public Task Invoke(HttpContext context)
        {
            string primaryPassword = "Mo2men Tayyem";

            if (context.Request.Path.Value.ToLower().Contains("locations"))
            {
                if (context.Request.Headers["Password"].Count > 0 && context.Request.Headers["CustomEncryptor"].Count > 0 && context.Request.Headers["time"].Count > 0)
                {
                    string EncryptedPassword = context.Request.Headers["Password"].First();
                    string time = context.Request.Headers["time"].First();
                    string EncryptedUUID = context.Request.Headers["CustomEncryptor"].First();

                    try
                    {
                        time = time.Substring(0, 16);
                        string DecryptedUUID = Methods.DecryptStringAES(EncryptedUUID, time, time);

                        string DecryptedPassword = Methods.DecryptStringAES(EncryptedPassword, DecryptedUUID, DecryptedUUID);

                        if (!DecryptedPassword.Equals(primaryPassword))
                        {
                            context.Response.StatusCode = 401;
                            return context.Response.WriteAsync("Unauthorized access.");
                        }

                    }
                    catch (Exception ex)
                    {
                        context.Response.StatusCode = 401;
                        return context.Response.WriteAsync("Unauthorized access.");

                    }

                }
                else
                {
                    context.Response.StatusCode = 401;
                    return context.Response.WriteAsync("Unauthorized access.");
                }
            }
            

            // Call the next delegate/middleware in the pipeline
            return this._next(context);
        }
    }
}

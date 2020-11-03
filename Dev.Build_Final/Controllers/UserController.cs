using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Dev.Build_Final.Models;
using Dev.Build_Final.Services;

namespace Dev.Build_Final.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private IDAL DAL;

        public UserController(IDAL DAL)
        {
            this.DAL = DAL;
        }

        [HttpGet]
        public IEnumerable<userlogin> GetAllLogins()
        {
            return DAL.GetAllUsers();
        }

        [HttpPost("add")]
        public userlogin AddNewUser(userlogin newUser)
        {
            return DAL.NewLogin(newUser);
        }


    }
}

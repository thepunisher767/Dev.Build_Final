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
    public class PeopleController : ControllerBase
    {
        private IDAL DAL;

        public PeopleController(IDAL DAL)
        {
            this.DAL = DAL;
        }


        [HttpGet]
        public IEnumerable<people> GetPeopleList()
        {
            return DAL.GetPeopleList();
        }

        [HttpPost("add")]
        public void AddPerson(people newPerson)
        {
            DAL.AddPeople(newPerson);
        }

        [HttpDelete("remove/{id}")]
        public void RemovePerson(int id)
        {
            people destoryPerson = new people() { id = id };

            DAL.RemovePeople(destoryPerson);
        }
    }
}

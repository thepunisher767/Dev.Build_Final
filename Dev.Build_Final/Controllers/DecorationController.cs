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
    public class DecorationController : ControllerBase
    {
        private IDAL DAL;
        public DecorationController(IDAL DAL)
        {
            this.DAL = DAL;
        }
        
        [HttpGet]
        public IEnumerable<decoration> getDecorationList()
        {
            return DAL.GetAllDecoration();
        }

        [HttpPost("check")]
        public void toggleDecor(decoration desc)
        {

            DAL.CompleteDecoration(desc);
        }

        [HttpPost("add")]
        public void addDecoration(decoration newEvent)
        {
            //party myTask = new party() { description = "TEST DESCRIPTION", done = false };

            DAL.AddDecoration(newEvent);
        }

        [HttpDelete("remove/{description}")]
        public void removeDecoration(string description)
        {
            decoration removeDecoration = new decoration() { description = description, done = false };

            DAL.RemoveDecoration(removeDecoration);
        }


    }
        
}

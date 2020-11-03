using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper.Contrib.Extensions;

namespace Dev.Build_Final.Models
{
    [Table("userlogin")]
    public class userlogin
    {
        [Key]
        public long id { get; set; }
        public string login { get; set; }
    }
}

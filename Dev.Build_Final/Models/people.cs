using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper.Contrib.Extensions;

namespace Dev.Build_Final.Models
{
    [Table("people")]
    public class people
    {   
        [Key]
        public long id { get; set; }

        public string firstname { get; set; }
        public string lastname { get; set; }
    }
}



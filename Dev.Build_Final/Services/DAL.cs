using Dapper;
using Dapper.Contrib.Extensions;
using Dev.Build_Final.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace Dev.Build_Final.Services
{
    public class DAL :IDAL
    {
        private string connString;
        private SqlConnection conn;

        public DAL(IConfiguration config)
        {
            connString = config.GetConnectionString("default");
            conn = new SqlConnection(connString);
        }
        #region PartyCode
        public IEnumerable<party> GetPartyList()
        {
            string query = "SELECT * FROM party";
            return conn.Query<party>(query);
        }

        public void RemoveTask(party myTask)
        {
            var procedure = "[deleteFromParty]";
            var values = new { description = myTask.description };
            conn.Query(procedure, values, commandType: CommandType.StoredProcedure);

        }

        public void AddTask(party myTask)
        {

            conn.Insert<party>(myTask);
        }

        public void CompleteTask(party myTask)
        {
            var procedure = "[toggle]";
            var values = new { description = myTask.description };
            conn.Query(procedure, values, commandType: CommandType.StoredProcedure);
        }
        #endregion

        #region People

        public IEnumerable<people> GetPeopleList()
        {
            string query = "SELECT * FROM people";
            return conn.Query<people>(query);
        }

        public void AddPeople(people myPeople)
        {
            conn.Insert<people>(myPeople);
        }

        public void RemovePeople(people myPeople)
        {
            conn.Delete<people>(myPeople);
        }

        #endregion

        #region Gifts

        public IEnumerable<gift> GetPersonGifts(int userID)
        {
            string query = $"SELECT * FROM gift WHERE userid = '{userID}'";
            return conn.Query<gift>(query);
            
            /*
            string query = "SELECT gift.description, gift.done ";
            query += "FROM gift ";
            query += "JOIN people ON people.id=gift.userid";
            query += $"WHERE gift.userid='{userID}' ";
            List<gift> favlist = conn.Query<QandA>(query).ToList();
            return favlist;
            */
        }

        public void AddGift(gift myGift)
        {
            conn.Insert<gift>(myGift);
        }

        public void CompleteGift(gift myGift)
        {
            var procedure = "[giftToggle]";
            var values = new { description = myGift.description };
            conn.Query(procedure, values, commandType: CommandType.StoredProcedure);
        }

        public void RemoveGift(gift myGift)
        {
            var procedure = "[removegift]";
            var values = new { description = myGift.description};
            conn.Query(procedure, values, commandType: CommandType.StoredProcedure);

        }

        #endregion

        #region Decoration

        public IEnumerable<decoration> GetAllDecoration()
        {
            string query = $"SELECT * FROM decoration";
            return conn.Query<decoration>(query);
        }

        public void AddDecoration(decoration newDecoration)
        {
            conn.Insert<decoration>(newDecoration);
        }

        public void RemoveDecoration(decoration destoryDecoration)
        {
            var procedure = "[deleteFromDecor]";
            var values = new { description = destoryDecoration.description };
            conn.Query(procedure, values, commandType: CommandType.StoredProcedure);

        }

        public void CompleteDecoration(decoration myDec)
        {
            var procedure = "[decortoggle]";
            var values = new { description = myDec.description };
            conn.Query(procedure, values, commandType: CommandType.StoredProcedure);
        }



        #endregion
    }
}

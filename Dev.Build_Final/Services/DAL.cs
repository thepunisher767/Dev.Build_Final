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
    public class DAL : IDAL
    {
        private string connString;
        private SqlConnection conn;

        public DAL(IConfiguration config)
        {
            connString = config.GetConnectionString("default");
            conn = new SqlConnection(connString);
        }

        public userlogin NewLogin(userlogin newUser)
        {
            long id = conn.Insert<userlogin>(newUser);
            return conn.Get<userlogin>(id);
        }

        public IEnumerable<userlogin> GetAllUsers()
        {
            return conn.GetAll<userlogin>();
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

        public people AddPeople(people myPeople)
        {
            long id = conn.Insert<people>(myPeople);
            return conn.Get<people>(id);
        }

        public void RemovePeople(people myPeople)
        {
            conn.Delete<people>(myPeople);
        }

        public people GetUsername(int id)
        {
            string query = $"SELECT DISTINCT * FROM people WHERE people.id={id}";
            return conn.QuerySingle<people>(query);
        }

        #endregion

        #region Gifts


        public IEnumerable<gift> GetPersonGifts(int userID)
        {
            string query = $"SELECT * FROM gift WHERE userid = '{userID}'";
            return conn.Query<gift>(query);
        }
        public IEnumerable<gift> GetAllGifts()
        {
            string query = $"SELECT * FROM gift";
            return conn.Query<gift>(query);
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
            var values = new { description = myGift.description };
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

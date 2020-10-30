
using Dev.Build_Final.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dev.Build_Final.Services
{
    public interface IDAL
    {
        
        ///party/////////////////////////////////////
        IEnumerable<party> GetPartyList();

        void RemoveTask(party myTask);

        void AddTask(party myTask);

        void CompleteTask(party myTask);

        //////////////////////////////////////////////
        /////////
        ///Gifts/////////////////////////////////////

        IEnumerable<people> GetPeopleList();
        void AddPeople(people myPeople);
        void RemovePeople(people myPeople);
       
        
       
        void RemoveGift(gift myGift);
        void AddGift(gift myGift);
        void CompleteGift(gift myGift);

        IEnumerable<gift> GetPersonGifts(int userID);


        IEnumerable<decoration> GetAllDecoration();
        void AddDecoration(decoration newDecoration);
        void RemoveDecoration(decoration destoryDecoration);
        void CompleteDecoration(decoration myDec);






    }
}

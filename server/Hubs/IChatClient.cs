using System.Threading.Tasks;

namespace SignalRChat.Hubs
{
    #region snippet_IChatClient
    public interface IChatClient
    {
        Task ReceiveMessage(string user, string message);
        Task NewUser(string user);
        Task UserLeave(string user);
    }
    #endregion
}

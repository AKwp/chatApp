using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SignalRChat.Hubs
{
    public class ChatHub : Hub
    {
        private readonly PresenceTracker _tracker;
        public ChatHub(PresenceTracker tracker)
        {
            _tracker = tracker;
        }
        
        #region HubMethods
        public Task SendMessage(string user, string message)
        {
            return Clients.All.SendAsync("ReceiveMessage", user, message);
        }

        public Task SendMessageToCaller(string user, string message)
        {
            return Clients.Caller.SendAsync("ReceiveMessage", user, message);
        }

        public Task SendMessageToGroup(string user, string message)
        {
            return Clients.Group("SignalR Users").SendAsync("ReceiveMessage", user, message);
        }

        public async Task OnUserLogin(string user)
        {
            await _tracker.UserConnected(user, Context.ConnectionId);
            await Clients.All.SendAsync("NewUser", user);

            var currentUser = await _tracker.GetOnlineUsers();
            await Clients.All.SendAsync("GetOnlineUsers", currentUser);
        }
        
        public async Task OnUserLogout(string user)
        {
            await _tracker.UserDisconnected(user, Context.ConnectionId);
            await Clients.All.SendAsync("UserLeave", user);

            var currentUser = await _tracker.GetOnlineUsers();
            await Clients.All.SendAsync("GetOnlineUsers", currentUser);

        }
        #endregion

        #region HubMethodName
        [HubMethodName("SendMessageToUser")]
        public Task DirectMessage(string user, string message)
        {
            return Clients.User(user).SendAsync("ReceiveMessage", user, message);
        }
        #endregion

        #region ThrowHubException
        public Task ThrowException()
        {
            throw new HubException("This error will be sent to the client!");
        }
        #endregion

        #region OnConnectedAsync
        public override async Task OnConnectedAsync()
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, "user");
            await base.OnConnectedAsync();
        }
        #endregion

        #region OnDisconnectedAsync
        public override async Task OnDisconnectedAsync(Exception exception)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, "SignalR Users");
            await base.OnDisconnectedAsync(exception);
        }
        #endregion
    }
}

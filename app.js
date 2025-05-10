

    let user = null, currentChat = null;
    const app = document.getElementById('app');
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const modalSave = document.getElementById('modal-save');

    function renderLogin() {
      app.innerHTML = `
        <div class="bg-npurple-dark p-6 rounded shadow w-96">
          <h2 class="text-2xl font-bold text-center mb-4">NOSTR MESSENGER</h2>
          <input class="w-full mb-2 p-2 rounded input-npurple" placeholder="NSEC" type="password" />
          <div class="flex justify-between mb-2">
            <button class="button-npurple px-4 py-2 rounded">Login</button>
            <button class="border border-npurple px-4 py-2 rounded text-ntext">Sign Up</button>
          </div>
          <button onclick="loginTest()" class="w-full py-2 rounded border border-ntext text-ntext">Test Login</button>
        </div>`;
    }

    function loginTest() { user = mockTestUser; renderFriendList(); }
    function logout() { user = null; currentChat = null; renderLogin(); }

    function renderFriendList() {
      let friendsHTML = user.friends.map(f => `
        <div onclick="openChat('${f.username}')" class="flex items-center gap-2 cursor-pointer hover:bg-npurple p-1 rounded">
          <img src="${f.profilePic}" class="rounded-full w-8 h-8" />
          <div>
            <div class="font-medium">${f.displayName}</div>
            <div class="text-xs text-green-400">${f.status}</div>
          </div>
        </div>
      `).join('');

      app.innerHTML = `
        <div class="bg-npurple-dark rounded shadow w-80 overflow-hidden">
          ${user.bannerURL ? `<div class="h-24 bg-cover" style="background-image:url('${user.bannerURL}')"></div>` : ''}
          <div class="p-4">
            <div class="flex items-center gap-3 mb-4">
              <img src="${user.profilePic}" class="rounded-full w-12 h-12 cursor-pointer" onclick="openSettings()" />
              <div>
                <div class="text-xl font-bold cursor-pointer" onclick="openSettings()">${user.displayName}</div>
                <div class="text-sm italic text-ntext">${user.statusMessage}</div>
              </div>
            </div>
            <h3 class="text-sm text-ntext mb-2">Friends</h3>
            ${friendsHTML}
            <button onclick="openAddFriend()" class="mt-4 w-full py-2 rounded button-npurple">Add Friend</button>
            <button onclick="openGroupChat()" class="mt-2 w-full py-2 rounded button-npurple">Group Chat</button>
            <button onclick="logout()" class="mt-2 w-full py-2 rounded border border-ntext text-ntext">Logout</button>
          </div>
        </div>
        <div id="chatWindow" class="absolute top-10 right-10"></div>`;
    }


    // Adding New Friend
    function openAddFriend() {
      modalTitle.innerText = "Add Friend by NPUB";
      modalBody.innerHTML = `<input id="npub-input" type="text" class="w-full p-2 rounded input-npurple" placeholder="npub...">`;
      modalSave.onclick = () => {
        const npub = document.getElementById('npub-input').value.trim();
        if (npub) {
          user.friends.push({ username: npub, displayName: npub, status: "Offline", profilePic:"https://via.placeholder.com/40" });
          closeModal(); renderFriendList();
        }
      };
      showModal();
    }
    //Editing Profile Setting
    function openSettings() {
      modalTitle.innerText = "Edit Profile Settings";
      modalBody.innerHTML = `
        <input id="set-display" class="w-full p-2 rounded input-npurple" placeholder="Display Name" value="${user.displayName}">
        <input id="set-pic" class="w-full p-2 rounded input-npurple" placeholder="Profile Pic URL" value="${user.profilePic}">
        <input id="set-banner" class="w-full p-2 rounded input-npurple" placeholder="Banner URL" value="${user.bannerURL}">
        <textarea id="set-statusMessage" class="w-full p-2 rounded input-npurple" placeholder="What's on your mind?">${user.statusMessage}</textarea>
      `;
      modalSave.onclick = () => {
        user.displayName = document.getElementById('set-display').value.trim() || user.displayName;
        user.profilePic = document.getElementById('set-pic').value.trim() || user.profilePic;
        user.bannerURL = document.getElementById('set-banner').value.trim();
        user.statusMessage = document.getElementById('set-statusMessage').value.trim();
        closeModal(); renderFriendList();
      };
      showModal();
    }

    function showModal() {
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    }
    function closeModal() {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }

    function openChat(username) {
      currentChat = username;
      const friend = user.friends.find(f => f.username === username);
      renderChatWindow([friend], false);
    }

    function openGroupChat() {
      currentChat = 'group';
      renderChatWindow(user.friends, true);
    }

    function renderChatWindow(friends, isGroup) {
      const chatWindow = document.getElementById('chatWindow');
      const key = isGroup ? 'chat-group' : `chat-${friends[0].username}`;
      const messages = JSON.parse(localStorage.getItem(key) || '[]');
      chatWindow.innerHTML = `
        <div class="chat-window relative">
          <button onclick="closeChat()" class="absolute top-2 right-2 text-ntext hover:text-white">✖</button>
          <div class="flex items-center gap-3 mb-2">
            <img src="${friends[0].profilePic}" class="rounded-full w-16 h-16" />
            <div class="text-lg font-bold">${friends[0].displayName}</div>
          </div>
          <div id="chatContent" class="flex-1 overflow-y-auto p-2">
            ${messages.map(m => `
              <div class="message ${m.from==='me'?'me':''} mb-2">
                <div class="text p-3 rounded-lg inline-block">${m.text}<span class="block mt-1 text-xs text-gray-400">${m.time}</span></div>
              </div>
            `).join('')}
          </div>
          <div class="input-container mt-2 flex items-center gap-2">
            <input id="msgInput" class="flex-1 p-2 rounded input-npurple" placeholder="Type a message..." />
            <button onclick="sendMessage(${isGroup})" class="px-4 py-2 rounded button-npurple">Send</button>
          </div>
        </div>`;
      document.getElementById('chatContent').scrollTop = 9999;
    }

    function closeChat() {
      document.getElementById('chatWindow').innerHTML = "";
    }

    function sendMessage(isGroup) {
      const input = document.getElementById('msgInput');
      const text = input.value.trim();
      if (!text) return;
      const key = isGroup ? 'chat-group' : `chat-${currentChat}`;
      const msgs = JSON.parse(localStorage.getItem(key) || '[]');
      msgs.push({ from:'me', text, time:new Date().toLocaleTimeString() });
      localStorage.setItem(key, JSON.stringify(msgs));
      if (isGroup) openGroupChat(); else openChat(currentChat);
      input.value = "";
    }

    renderLogin();

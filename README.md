# 💬 Nostr Messenger

A retro MSN Messenger-style chat app powered by the decentralized [Nostr](https://nostr.com) protocol. Designed to revive the nostalgic chat experience from 2005–2009, with modern decentralized technology.

![screenshot](https://via.placeholder.com/600x300) <!-- Replace this with a screenshot of your app -->

---

## 🚀 Features (Working)

- 🧑‍🤝‍🧑 **Friend List with Presence Display**  
  View online/offline status, profile picture, and custom status message.

- 🖼️ **Image Auto-Preview**  
  Pasting a link to an image (`.jpg`, `.png`, etc.) will automatically render the image in the chat.

- ⚡ **Zap Button (MSN Nudge clone)**  
  A Bitcoin-orange “Zap ⚡” button shakes the chat window to get attention.

- 💬 **1-on-1 and Group Chats**  
  Seamless switching between private messages and multi-user chats.

- 🎨 **Dark Nostr Theme**  
  Uses Windows Live Messenger aesthetics with a sleek, Nostr purple UI built using TailwindCSS.

- 👤 **Profile Customization**  
  Edit your:
  - Display name
  - Profile picture
  - Banner background
  - Status message

- ➕ **Add Friend by NPUB**  
  Add friends directly using their Nostr public key.

- 📦 **Local Message Persistence (dev mode only)**  
  Messages are stored in `localStorage` for testing purposes.

---

## 🛠️ Built With

- **HTML/CSS + TailwindCSS** — Responsive retro UI
- **Vanilla JavaScript** — UI logic and event handling
- **Nostr Protocol** — Decentralized messaging standard
- **LocalStorage** — Temporary local chat storage

---

## 📈 Project Goals

### ✅ MVP Goals (Current Progress)
- [x] Functional friend list and test login
- [x] Chat UI for private and group messaging
- [x] Temporary profile editing
- [x] Visual Zap animation
- [x] Image link rendering

### 🚧 Upcoming Features
- [ ] ✅ Extension-based login via Nostr Connect (e.g. Alby, Nos2x)
- [ ] ✅ Relay selection UI (add/remove relays)
- [ ] ✅ Send and receive encrypted DMs via `NIP-04`
- [ ] ✅ Relay discovery via `NIP-65`
- [ ] ✅ Profile metadata sync via `NIP-05` and `NIP-39`
- [ ] ✅ Online status based on relay pinging
- [ ] ✅ Typing indicators
- [ ] ✅ Message reactions (e.g., likes, zaps)
- [ ] ✅ Emoji picker + custom emoticons
- [ ] ✅ Drag-and-drop or paste-to-upload media
- [ ] ✅ Desktop notifications
- [ ] ✅ Mobile-friendly layout
- [ ] ✅ Multi-language support

### 📦 Stretch Goals
- [ ] Group creation with real `NIP-28` metadata
- [ ] Hosting on decentralized storage (IPFS, Arweave)
- [ ] PWA (Progressive Web App) support
- [ ] Full theming support (2005 vs. 2009 skins)
- [ ] Nostr event explorer (view raw events)
- [ ] Integration with Bitcoin Lightning for real zap payments

---

## 🧑‍💻 Local Setup

```bash
git clone https://github.com/CraigTheSpaceBum/NostrMessenger.git
cd nostr-messenger

import React, { useState, useRef, useEffect } from 'react';
import { Search, Send, User } from 'lucide-react';

const initialChats = [
  { id: 1, type: "Match", name: "Rohan Shrestha", time: "10:30 AM", unread: 2, messages: [{ id: 101, text: "Hey! Saw your profile. Are you still looking for a room?", sender: "them", time: "10:28 AM" }] },
  { id: 2, type: "Owner", name: "Landlord - Kanchanbari", time: "Yesterday", unread: 1, messages: [{ id: 201, text: "The 2BHK is available for viewing tomorrow.", sender: "them", time: "Yesterday, 4:15 PM" }] },
  { id: 3, type: "Seller", name: "Priya (Books)", time: "Tuesday", unread: 0, messages: [{ id: 301, text: "I can do Rs. 3000.", sender: "them", time: "10:00 AM" }] },
  { id: 4, type: "Seller", name: "Sita (Haat Bazar Seller)", time: "11:00 AM", unread: 1, messages: [{ id: 401, text: "Yes, the Induction Stove is available. Come to Itahari Haat tomorrow to pick it up!", sender: "them", time: "11:00 AM" }] }
];

const Messages = () => {
  const [chats, setChats] = useState(initialChats);
  const [activeChatId, setActiveChatId] = useState(initialChats[0].id);
  const [filterType, setFilterType] = useState('All'); // TAB FILTER
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef(null);

  const activeChat = chats.find(c => c.id === activeChatId);

  // FIX: Drop unread to 0 when opening a chat
  const handleChatClick = (id) => {
    setActiveChatId(id);
    setChats(chats.map(chat => chat.id === id ? { ...chat, unread: 0 } : chat));
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChat?.messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    const newMessage = { id: Date.now(), text: inputText, sender: "me", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setChats(chats.map(chat => chat.id === activeChatId ? { ...chat, messages: [...chat.messages, newMessage] } : chat));
    setInputText("");
  };

  const filteredChats = chats.filter(c => filterType === 'All' || c.type === filterType);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex h-[600px] overflow-hidden">
      
      {/* Sidebar */}
      <div className="w-1/3 border-r border-gray-100 dark:border-gray-700 flex flex-col">
        <div className="p-4 border-b border-gray-100 dark:border-gray-700">
          <div className="relative mb-3">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input type="text" placeholder="Search messages..." className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-white focus:outline-none" />
          </div>
          {/* NEW: MESSAGE TABS */}
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {['All', 'Owner', 'Seller', 'Match'].map(type => (
              <button 
                key={type} onClick={() => setFilterType(type)}
                className={`px-3 py-1 text-xs font-bold rounded-full whitespace-nowrap ${filterType === type ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}
              >
                {type}s
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredChats.map(chat => (
            <button key={chat.id} onClick={() => handleChatClick(chat.id)} className={`w-full p-4 flex items-start gap-3 text-left border-b border-gray-50 dark:border-gray-700/50 ${activeChatId === chat.id ? 'bg-blue-50 dark:bg-gray-700' : ''}`}>
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
                <User size={20} className="text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1 overflow-hidden">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-semibold text-gray-900 dark:text-white truncate">{chat.name}</h4>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{chat.messages[chat.messages.length - 1].text}</p>
              </div>
              {/* THE BUG IS FIXED HERE */}
              {chat.unread > 0 && (
                <div className="w-5 h-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">{chat.unread}</div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat */}
      <div className="flex-1 flex flex-col bg-gray-50 dark:bg-gray-900">
        <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex items-center gap-3 bg-white dark:bg-gray-800">
          <h3 className="font-bold text-gray-900 dark:text-white">{activeChat?.name}</h3>
          <span className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-gray-600 dark:text-gray-300">{activeChat?.type}</span>
        </div>
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {activeChat?.messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[70%] p-3 shadow-sm ${msg.sender === 'me' ? 'bg-blue-600 text-white rounded-2xl rounded-tr-none' : 'bg-white dark:bg-gray-800 border text-gray-800 dark:text-gray-200 rounded-2xl rounded-tl-none'}`}>
                <p className="text-sm">{msg.text}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSendMessage} className="p-4 bg-white dark:bg-gray-800 border-t">
          <div className="flex gap-2">
            <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder="Type your message..." className="flex-1 px-4 py-2 rounded-lg border bg-gray-50 dark:bg-gray-700 text-white outline-none" />
            <button type="submit" disabled={!inputText.trim()} className="p-2 bg-blue-600 text-white rounded-lg"><Send size={20} /></button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Messages;